import mysql.connector

# Creating the database connection
connection = mysql.connector.connect(
    user='root', password='', host='127.0.0.1', database='exp',)

# Creating the cursor
cursor = connection.cursor()

# Executing the schema
cursor.execute("Select * from forum_question")

result = cursor.column_names

for i in result:
    print(i)

# Closing the connection
connection.close()