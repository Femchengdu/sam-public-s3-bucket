# Adding Cors Headers to AWS Lambda

The following cors headers were added to enable calling the The API from different origins.

```yaml
DynamoDBTable:
  Type: AWS::DynamoDB::Table
  Properties:
    TableName: resume-challenge
    BillingMode: PAY_PER_REQUEST
    AttributeDefinitions:
      - AttributeName: "ID"
        AttributeType: "S"
    KeySchema:
      - AttributeName: "ID"
        KeyType: "HASH"
```
