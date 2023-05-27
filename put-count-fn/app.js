const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
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
      case "PUT":
        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              ID: "Count",
              Val: requestJSON.count,
            },
          })
        );
        body = `Put item into ${tableName} and vist count: ${requestJSON.count}`;
        break;
      case "OPTIONS":
        console.log("Browser options request :", event);
        break;
      default:
        console.log("The cors options ???", event.httpMethod);
        throw new Error(`Unsupported method: "${event.httpMethod}"`);
    }
  } catch (err) {
    statusCode = 400;
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
