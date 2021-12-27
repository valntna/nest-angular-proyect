import { Injectable } from '@nestjs/common';

import * as sqlite3 from 'sqlite3';
var result: string[] = [];
var sessions: string[] = [];
//const user = '3';
//const company = '3';
//const firstDay: string = '2017-03-09';
//const lastDay: string = '2017-03-20';
//const interval: number = 15;

@Injectable()
export class SessionService {
	private db: sqlite3.Database;
	
	constructor() { }

	

    init(): void {
        const path = 'D:/Descargas/practica_cotalker/nest-angular-proyect/backend/src/datos-sesiones/database/llamadas.db';
        this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Conectado a la base de datos <<llamadas>>.');
        });
    
    }
	
	deleteTable(table:string): void {
		this.db.run(`DROP TABLE IF EXISTS `+ table, function (err) {
			if (err) {
				throw err;
			}
			console.log(`Table ${table} deleted!`);
		});
	};


	getCalendar(firstDay:string, lastDay:string) {
		
		let calendar = `CREATE TABLE Calendar AS
	                WITH cte AS
	                (
	                    SELECT DATE('${firstDay}') AS Day UNION ALL
	                    SELECT DATE(Day, '+1 day')
	                    FROM cte
	                    WHERE Day < '${lastDay}'
	                )
	                SELECT  *
	                FROM cte`;

			return new Promise<number>((resolve, reject) => {
				try {
					this.db.serialize(() => {
						this.deleteTable('Calendar');
						this.db.run(calendar);
						this.db.each('SELECT Day as day FROM Calendar', function (err, rows) {
							if (err) {
								console.log('there큦 a problem with calendar table');
								throw err;
							}
							result.push(rows.day);
						},
							(err, rowCount) => {
								if (err) reject(err);
								resolve(rowCount);
							}
						);
						
					});
				} catch (error) {
					console.log(`Error`);
					reject();
				}
			});

	};

	async getDays(fD:string,lD:string): Promise<string[]>{
		await this.getCalendar(fD,lD);
		return result;
	};
	
	
	makeAuxTableAll(company: string, firstDay: string, lastDay: string) {
	
		let createAuxTable = `CREATE TABLE AuxTable (user_id INTEGER NOT NULL,
												   occurred_at TEXT NOT NULL)`;

		let getAllUsersOneComp = `INSERT INTO AuxTable (user_id, occurred_at)
								  SELECT UserID, Fecha
								  FROM calls
								  WHERE(
									  (CompanyID = ${company})
								  AND
								  ( substr(Fecha, 1, 10) BETWEEN ${firstDay} AND '${lastDay}' )
								)`;
		
		return new Promise<number>((resolve, reject) => {
			try {
				this.db.serialize(() => {
					this.deleteTable('AuxTable');
					this.db.run(createAuxTable);
					this.db.run(getAllUsersOneComp,  function (err) {
						if (err) {
							throw err;
						}
						console.log(`Data inserted!`);
				    });
					this.db.each('SELECT user_id AS user FROM AuxTable', function (err, rows) {
						if (err) {
							console.log('there큦 a problem with calendar table');
							throw err;
						}
						//users.push(rows.user);
					},
						(err, rowCount) => {
							if (err) reject(err);
							console.log(rowCount);
							resolve(rowCount);
						}
					);

				});
			} catch (error) {
				console.log(`Error`);
				reject();
			}
		});
	};

	
	makeAuxTableOne(company: string, user: string, firstDay: string, lastDay: string) {

		let createAuxTable = `CREATE TABLE AuxTable (user_id INTEGER NOT NULL,
												   occurred_at TEXT NOT NULL)`;

		let getOneUsersOneComp = `INSERT INTO AuxTable (user_id, occurred_at)
								  SELECT UserID, Fecha
								  FROM calls
								  WHERE(
									  (CompanyID = ${company})
								  AND (UserID = ${user})
								  AND
								  ( substr(Fecha, 1, 10) BETWEEN ${firstDay} AND '${lastDay}' )
								)`;

		return new Promise<number>((resolve, reject) => {
			try {
				this.db.serialize(() => {
					this.deleteTable('AuxTable');
					this.db.run(createAuxTable);
					this.db.run(getOneUsersOneComp, function (err) {
						if (err) {
							throw err;
						}
						console.log(`Data inserted!`);
					});
					this.db.each('SELECT user_id AS user FROM AuxTable', function (err, rows) {
						if (err) {
							console.log('there큦 a problem with AuxTable');
							throw err;
						}
						//users.push(rows.user);
					},
						(err, rowCount) => {
							if (err) reject(err);
							resolve(rowCount);
						}
					);

				});
			} catch (error) {
				console.log(`Error`);
				reject();
			}
		});
	};

	

	async oneOrAll(company:string, user:string, firstDay:string, lastDay:string) : Promise<void> {
		if (user.toLowerCase() == "todos") {
			await this.makeAuxTableAll(company, firstDay, lastDay);
		}
		else {
			await this.makeAuxTableOne(company, user, firstDay, lastDay);
		}
    }


	querySessions(interval:number) {

	let countSessions = `SELECT  Day,
               		CASE WHEN new_session_count
					IS NULL THEN 0 ELSE new_session_count
					END  AS ActiveSessions
		            FROM
		            (
		                SELECT Day, new_session_count
		                FROM(SELECT Day FROM Calendar) a
		                LEFT JOIN(SELECT substr(occurred_at, 1, 10) AS Date,
		                COUNT(DISTINCT global_session_id) new_session_count
						FROM
		                    (
		                            SELECT user_id,
		                            occurred_at,
		                            SUM(is_new_session)
									OVER (ORDER BY user_id, occurred_at)
									AS global_session_id
		                            FROM
		                            (
		                                SELECT user_id, occurred_at,
		                                CASE WHEN CAST(strftime('%s', substr(occurred_at, 1, 23)) as integer) - CAST(strftime('%s', substr(last_event, 1, 23)) as integer) >= (60 * ${interval})
		                                OR last_event IS NULL
		                                THEN 1 ELSE 0
	                                    END   AS is_new_session
	                                    FROM
	                                    (
	                                        SELECT *,
	                                        LAG(occurred_at, 1) OVER
	                                        (PARTITION BY user_id ORDER BY occurred_at)
											AS last_event
	                                        FROM AuxTable
	                                    )
		                            )
		                        )
		               	GROUP BY Date) b
                        ON a.Day = b.Date
		                )`;


		return new Promise<number>((resolve, reject) => {
			try {
				this.db.serialize(() => {
					this.db.each(countSessions, function (err, rows) {
						if (err) {
							console.log('there큦 a problem counting active sessions');
							throw err;
						}
						sessions.push(rows.ActiveSessions);
					},
						(err, rowCount) => {
							if (err) reject(err);
							resolve(rowCount);
						}
					);
					this.deleteTable('AuxTable');
					this.deleteTable('Calendar');
				});
			} catch (error) {
				console.log(`Error`);
				reject();
			}
		});
		
	};

	async getSessions(interval:number): Promise<string[]> {
		await this.querySessions(interval);
		return sessions;
	};

	clean() {
		result = [];
		sessions = [];
    }

	printArray(array: string[]):void {
		for (var i = 0; i < array.length; i++) {
			console.log(array[i]);
		}
    }
	

    close(): void {
        this.db.close((err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Fin a la conexion con la base de datos.');
	});


	};
}

