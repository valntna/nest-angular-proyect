//import { Injectable } from '@nestjs/common';

import * as sqlite3 from 'sqlite3';

export class SessionService {
    private db: sqlite3.Database;
    constructor() {
    }
    init(): void {
        const path = 'D:/Descargas/practica_cotalker/nest-angular-proyect/backend/src/datos-sesiones/database/llamadas.db';
        this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Conectado a la base de datos <<llamadas>>.');
        });
    
    }


	getData(): [string, string][] {
		const date : string[] = [];
		const session : string[] = [];
		const FechaInicial: string = '2017-02-09';
		const FechaFinal: string = '2018-06-09';
		const User: string = '3';
		const Company: string = '3';
		const Interval: number = 15;
		let calendario = `CREATE TABLE calendar AS
	                WITH cte AS
	                (
	                    SELECT DATE('${FechaInicial}') AS fecha UNION ALL
	                    SELECT DATE(fecha, '+1 day')
	                    FROM cte
	                    WHERE fecha < '${FechaFinal}'
	                )
	                SELECT  *
	                FROM cte`;

		let botar_aux = `DROP TABLE IF EXISTS aux_table`;

		let botar_calendario = `DROP TABLE IF EXISTS calendar`;

		let crear_auxtable = `CREATE TABLE aux_table (user_id INTEGER NOT NULL,
												   occurred_at TEXT NOT NULL)`;

		let insertar_auxtable_usuario = `INSERT INTO aux_table (user_id, occurred_at)
									SELECT UserID, Fecha
									FROM calls
									WHERE(
										(CompanyID = ${Company})
									AND (UserID = ${User})
									AND (substr(Fecha, 1, 10) BETWEEN ${FechaInicial} AND ${FechaFinal}
									))`;

		let insertar_auxtable_todos = `INSERT INTO aux_table (user_id, occurred_at)
								  SELECT UserID, Fecha
								  FROM calls
								  WHERE(
									  (CompanyID = ${Company})
								  AND
								  (substr(Fecha, 1, 10) BETWEEN ${FechaInicial} AND ${FechaFinal} ))`;

		let obtener_sesiones = `SELECT  fecha,
               				CASE WHEN new_session_count
							IS NULL THEN 0 ELSE new_session_count
							END  AS sesiones_activas
							FROM
							(
								SELECT fecha, new_session_count
								FROM(SELECT fecha FROM calendar) a
								LEFT JOIN(SELECT substr(occurred_at, 1, 10) AS dia,
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
											   CASE WHEN CAST(strftime('%s', substr(occurred_at, 1, 23)) as integer) - CAST(strftime('%s', substr(last_event, 1, 23)) as integer) >= (60 * ${Interval})
											   OR last_event IS NULL
											   THEN 1 ELSE 0
											   END   AS is_new_session
											   FROM
											   (
												   SELECT *,
												   LAG(occurred_at, 1) OVER
												   (PARTITION BY user_id ORDER BY occurred_at)
												   AS last_event
												   FROM aux_table
											   )
										  )
									 )
		               			GROUP BY dia) b
								ON a.fecha = b.dia
							)`;
		this.db.serialize(function () {
			this.db.run(botar_aux, function (err) {
				if (err) {
					throw err;
				}
				console.log('Table aux_table deleted!');
			});

			this.db.run(botar_calendario, function (err) {
				if (err) {
					throw err;
				}
				console.log('Table calendario deleted!');
			});

			this.db.run(calendario, function (err) {
				if (err) {
					throw err;
				}
				console.log('Calendar created!');
			});

			this.db.run(crear_auxtable, function (err) {
				if (err) {
					throw err;
				}
				console.log(`Table aux_table created!`);
			});

			this.db.run(insertar_auxtable_usuario, function (err) {
				if (err) {
					throw err;
				}
				console.log(`Data inserted!`);
			});

			this.db.each(obtener_sesiones, function (err, rows) {
				if (err) {
					throw err;
				}

				//console.log(`Fecha: ${rows.fecha} - Sesiones ${rows.sesiones_activas}`);
				date.push(rows.fecha);
				session.push(rows.sesiones_activas);

				//console.log(date);
				//console.log(session);
			});

			this.db.run(botar_aux, function (err) {
				if (err) {
					throw err;
				}
				console.log('Table aux_table deleted!');
			});

			this.db.run(botar_calendario, function (err) {
				if (err) {
					throw err;
				}
				console.log('Table calendario deleted!');
			});

		});

		return [[date[0], session[0]]] ;

		};

    close(): void {
        this.db.close((err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Fin a la conexion con la base de datos.');
	});


    }
}

