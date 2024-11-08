/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    DATABASE_PASSWORD
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const updateRDS = require('./update');
const queryRDS = require('./queryDevice');
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    console.log("event log", event.body);
    // console.log("event log type ", typeof(JSON.parse(event.body)));
    const response = JSON.parse(event.body)

    if (event.httpMethod == "GET") {
        try {
            const rdsResult = await queryRDS();
            if (rdsResult.length == 0 || rdsResult == null) {
                rdsResult = "No result";
            }
            console.log('RDS Result:', rdsResult);
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                body: JSON.stringify(rdsResult),
            };
        } catch (err) {
            console.error('Error in RDS query:', err);
        }
    }
    const deviceId = response.deviceId;
    const roomName = response.roomName;
    const roomType = response.roomType;
    const location = response.location;
    const building = response.building;

    try {
        if (deviceId == "" || (roomName == "" && roomType == "" && location == "" && building == "")) {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                body: JSON.stringify({ "status": "Nothing to update!" }),
            };
        }
        const rdsResult = await updateRDS(deviceId, roomName, roomType, location, building);

        console.log('RDS update response:', rdsResult);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ "status": "complete!" }),
        };
    } catch (err) {
        console.error('Error in RDS update:', err);
    }
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({ "status": "Function was not excecuted!" }),
    };
};
