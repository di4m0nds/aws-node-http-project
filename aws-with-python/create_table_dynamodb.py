"""Create table function"""
def create_movies_table(dynamodb):
    """init"""
    table_name = 'Movies'
    existing_tables = dynamodb.list_tables()['TableNames']

    if table_name not in existing_tables:
        table = dynamodb.create_table(
            TableName="Movies",
            KeySchema=[
                {
                    'AttributeName': 'year',
                    'KeyType': 'HASH'
                },
                {
                    'AttributeName': 'title',
                    'KeyType': 'RANGE'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'year',
                    'AttributeType': 'N'
                },
                {
                    'AttributeName': 'title',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 10,
                'WriteCapacityUnits': 10
            }
        )
        print("\nTable status:\n", table.table_status)
    else:
        print("\nThe Table has already been created before\n")
