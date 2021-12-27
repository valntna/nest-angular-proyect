import sqlite3
import pandas as pd

# Connect to SQLite database
path='D:\Descargas\practica_cotalker\nest-angular-proyect\backend\src\datos-sesiones\database\llamadas.db';
conn = sqlite3.connect(r path)

chunksize = 100000
colnames=['CompanyID','UserID','Method','Time','Fecha','Source']
filename='log.practica.2.csv'
for chunk in pd.read_csv(filename, chunksize=chunksize, names=colnames, header=None):
    chunk.to_sql('calls', conn, if_exists='append', index=False)

# Close connection to SQLite database
conn.close()
