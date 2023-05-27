const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
// Setup
let response;
const tableName = "resume-challenge";
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

exports.lambdaHandler = async (event, context) => {
  // setup the response properties
  let body;
  let statusCode = 200;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  };

  try {
    switch (event.httpMethod) {
      case "GET":
        const dbRes = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              ID: "Count",
            },
          })
        );
        const { ID, Val } = dbRes.Item;
        console.log("The ID is :", ID);
        body = { count: Val };
        break;
      default:
        throw new Error(`Unsupported method: "${event.httpMethod}"`);
    }
  } catch (err) {
    statusCode = 400;
    console.log("the error is :", err);
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  response = {
    statusCode,
    body,
    headers,
  };

  return response;
};
