const mysql = require('mysql');

const queryRDS  =  async (deviceList,roomName,roomType,location,building,temp, humid, light, top) => {
    const connection = mysql.createConnection({
        host: 'instahub1.c7soa0622o17.us-east-1.rds.amazonaws.com', 
        user: process.env.DATABASE_USER,
        port: "3306",
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.log('Error connecting to the database:', err);
                connection.end();
                return reject(err);
            }

            connection.query(" SELECT * from devices ORDER BY device_id ASC", (error, results) => {
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