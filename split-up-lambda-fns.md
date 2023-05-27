# Splitting up lambda according to function

Use two lambda functions to perform the writing and reading from the database

```yaml
 GetCounttFn:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: get-count-fn/
      Handler: app.lambdaHandler
      Runtime: nodejs16.x
      Architectures:
        - x86_64
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /get
            Method: get

   PutCountFn:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: put-count-fn/
      Handler: app.lambdaHandler
      Runtime: nodejs16.x
      Architectures:
        - x86_64
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /put
            Method: get
```
