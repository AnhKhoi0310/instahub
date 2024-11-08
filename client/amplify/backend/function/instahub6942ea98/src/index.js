/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const queryRDS = require('./query');
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    console.log("event log", event.body);
    console.log("event log type ", typeof(JSON.parse(event.body)));
    const response = JSON.parse(event.body)
    // const deviceList = response.deviceList;
    const roomName = response.roomName;
    // const roomType = response.roomType;
    // const location = response.location;
    // const building = response.building;
    const temp = response.temp;
    const humid = response.humid;
    const light = response.light;
    const top = parseInt(response.top);
    const deviceList = [];
    const building = [];
    const roomType = [];
    const location = [];
    for(var i of response.deviceList){
        deviceList.push(i.title);
    }
    for(var i of response.building){
        building.push(i.title);
    }
    for(var i of response.roomType){
        roomType.push(i.title);
    }
    for(var i of response.location){
        location.push(i.title);
    }


    try {
        const rdsResult = await queryRDS(deviceList,roomName,roomType,location,building,temp, humid, light, top);
        if(rdsResult.length == 0 || rdsResult == null){
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
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
