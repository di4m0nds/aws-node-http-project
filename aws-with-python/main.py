"""System module."""
from dotenv import dotenv_values
import boto3

import create_table_dynamodb

if __name__ == '__main__':
    environ_vars = dotenv_values('.env')

    dynamodb = boto3.client(
        'dynamodb',
        region_name=environ_vars.get('AWS_REGION'),
        endpoint_url=environ_vars.get('AWS_ENDPOINT')
    )

    create_table_dynamodb.create_movies_table(dynamodb)
