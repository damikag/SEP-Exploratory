import mysql.connector
from mysql.connector import Error

def insertVariblesIntoTable(id, title, description, category_id, researcher_id):
    try:
        connection = mysql.connector.connect(host='localhost',
                                             database='exp',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_insert_query = """INSERT INTO forum_question (id, title, description, category_id, researcher_id ) 
                                VALUES (%s, %s, %s, %s, %s) """

        recordTuple = (id, title, description, category_id, researcher_id)
        cursor.execute(mySql_insert_query, recordTuple)
        connection.commit()
        print("Record inserted successfully into forum_question table")

    except mysql.connector.Error as error:
        print("Failed to insert into forum_question {}".format(error))

    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

insertVariblesIntoTable(10011, 'title1', 'description1', 2, 10001) #all correct data
insertVariblesIntoTable( '' ,'title1', 'description1', 1, 10001) #check auto increment
insertVariblesIntoTable( '','title1', 'description1', 10, 10001) #invalid category_id
insertVariblesIntoTable( '' ,'title1', 'description1', 10, "test") #incorrect researcher_id