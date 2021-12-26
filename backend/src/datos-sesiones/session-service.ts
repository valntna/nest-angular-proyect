import { Injectable } from '@nestjs/common';

import * as sqlite3 from 'sqlite3';
var result: string[] = [];
var users = [];
const user = '2';
const company = '3';
const firstDay: string = '2017-03-09';
const lastDay: string = '2017-03-20';

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
	
	
		//const date : string[] = [];
		//const session : string[] = [];
		//const FechaInicial: string = '2017-02-09';
		//const FechaFinal: string = '2018-06-09';
		//const User: string = '3';
		//const Company: string = '3';
		//const Interval: number = 15;
	deleteTable(table:string): void {
		this.db.run(`DROP TABLE IF EXISTS `+ table, function (err) {
			if (err) {
				throw err;
			}
			console.log(`Table ${table} deleted!`);
		});
	};

	getCalendar() {
		
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
								console.log('there´s a problem with calendar table');
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

	async getDays(): Promise<string[]>{
		await this.getCalendar();
		return result;
	};
	
	
	makeAuxTable() {
	
		let crearAuxTable = `CREATE TABLE AuxTable (user_id INTEGER NOT NULL,
												   occurred_at TEXT NOT NULL)`;

		let insertarAuxTableUsuario = `INSERT INTO AuxTable (user_id, occurred_at)
								  SELECT UserID, Fecha
								  FROM calls
								  WHERE(
									  (CompanyID = ?)
								  AND
								  ( substr(Fecha, 1, 10) BETWEEN ? AND ? )
								)`;
		
		return new Promise<number>((resolve, reject) => {
			try {
				this.db.serialize(() => {
					this.deleteTable('AuxTable');
					this.db.run(crearAuxTable);
					this.db.run(insertarAuxTableUsuario, company, firstDay, lastDay, function (err) {
						if (err) {
							throw err;
						}
						console.log(`Data inserted!`);
				    });
					this.db.each('SELECT user_id AS time FROM AuxTable', function (err, rows) {
						if (err) {
							console.log('there´s a problem with calendar table');
							throw err;
						}
						users.push(rows.time);
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

	async getUsers(): Promise<string[]> {
		await this.makeAuxTable();
		return users;
	};


	printArray(array: string[]) {
		console.log('hey, print calendar!');
		for (var i = 0; i < array.length; i++) {
			console.log(array[i]);
		}
		console.log('hey, print calendar!');
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

