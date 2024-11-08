const mysql = require('mysql');

const queryRDS  =  async (deviceList,roomName,roomType,location,building,temp, humid, light, top) => {
    const connection = mysql.createConnection({
        host: 'instahub1.c7soa0622o17.us-east-1.rds.amazonaws.com', 
        user: process.env.DATABASE_USER,
        port: "3306",
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    let query = `SELECT * FROM sensor_data WHERE 1=1`;

    // Append filters based on input
    if (deviceList && deviceList.length > 0) {
        const deviceListString = deviceList.map(id => `'${id}'`).join(", ");
        query += ` AND device_id IN (${deviceListString})`;
    }
    
    if( roomType.length > 0 || location.length > 0 || building.length > 0 ){
        query += ` AND device_id in ( SELECT device_id from devices WHERE 1=1 `
        if ( roomType.length > 0) {
            const roomTypeString = roomType.map(type => `'${type}'`).join(", ");
            query += ` AND room_type IN (${roomTypeString})`;
        }
    
        if ( location.length > 0) {
            const locationString = location.map(loc => `'${loc}'`).join(", ");
            query += ` AND location IN (${locationString})`;
        }
    
        if (building.length > 0) {
            const buildingString = building.map(bldg => `'${bldg}'`).join(", ");
            query += ` AND building_name IN (${buildingString})`;
        }
        query += `)`
    }
    

    // Append sorting order
    query += ` ORDER BY temperature ${temp === 'Ascending' ? 'ASC' : 'DESC'}, 
                        humidity ${humid === 'Ascending' ? 'ASC' : 'DESC'}, 
                        light ${light === 'Ascending' ? 'ASC' : 'DESC'}`;

    // Add limit to query
    query += ` LIMIT ${parseInt(top, 10)}`;


    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.log('Error connecting to the database:', err);
                connection.end();
                return reject(err);
            }

            connection.query(query, (error, results) => {
                connection.end(); 
                if (error) {
                    console.error('Error executing query:', error);
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ error: 'Query execution failed', details: error.message })
                    });
                }
                if( results.length ==0){
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify([{"data_id": 0,"device_id":0,"timestamp":"NOT FOUND","temperature":0,"humidity":0,"light":0,"motion":0}])
                    });
                }
                resolve({
                    statusCode: 200,
                    body: JSON.stringify(results)
                });
            });
        });
    });
};
module.exports = queryRDS;