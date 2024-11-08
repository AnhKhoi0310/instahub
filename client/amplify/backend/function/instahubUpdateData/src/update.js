const mysql = require('mysql');

const updateRDS  =  async (deviceId,roomName,roomType,location,building) => {
    const connection = mysql.createConnection({
        host: 'instahub1.c7soa0622o17.us-east-1.rds.amazonaws.com', 
        user: process.env.DATABASE_USER,
        port: "3306",
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    let query = `UPDATE devices SET `;
    let updates = [];

    // Build update string directly
    if (roomName) updates.push(`room_name = '${roomName}'`);
    if (roomType) updates.push(`room_type = '${roomType}'`);
    if (location) updates.push(`location = '${location}'`);
    if (building) updates.push(`building_name = '${building}'`);

    // Join updates with commas
    query += updates.join(", ");
    query += ` WHERE device_id = '${deviceId}'`;

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
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({"status" : "complete!"})
                });
            });
        });
    });
};
module.exports = updateRDS;