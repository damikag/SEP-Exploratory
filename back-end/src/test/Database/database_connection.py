import mysql.connector
from mysql.connector import Error

try:
    connection_config_dict = {
        'user': 'root',
        'password': '',
        'host': '127.0.0.1',
        'database': 'exp',
        'raise_on_warnings': True,
    }
    connection = mysql.connector.connect(**connection_config_dict)

    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("Your connected to database: ", record)

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")