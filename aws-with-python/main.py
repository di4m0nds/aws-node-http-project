"""System module."""
from dotenv import dotenv_values
import boto3

import create_table_dynamodb


if __name__ == '__main__':
    environ_vars = dotenv_values('.env')
    region = "us-west-2"
    endpoint = environ_vars.get('AWS_ENDPOINT')

    dynamodb = boto3.client( 'dynamodb', region_name=region, endpoint_url=endpoint )

    create_table_dynamodb.create_movies_table(dynamodb)
