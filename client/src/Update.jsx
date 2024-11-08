import React, { useState } from "react";
import './styles/Old.css'
// import  './App.css';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SelectUpdate from './components/common/SelectUpdate'
import { post } from 'aws-amplify/api';
import { get } from 'aws-amplify/api';

const deviceId = ["device_1", "device_2", "device_3", "device_4", "device_5", "device_6", "device_7", "device_8", "device_9", "device_10", "device_11", "device_12", "device_13", "device_14", "device_15", "device_16", "device_17", "device_18", "device_19", "device_20"]
const location = ['North Wing', 'South Wing', 'East Wing', 'West Wing']
const buildingList = ['Building A', 'Building B', 'Building C', 'Building D']
const roomList = ['Office', 'Storage', 'Ball room', 'Study room', 'Lab', 'Class room']
export default function DataField() {
    const { register, handleSubmit, setValue } = useForm();
    const [tableData, setTableData] = useState(null);
    const handleFormSummit = async (formData) => {
        console.log('form data is:', formData);
        const deviceId = formData.Device ?? "";
        const roomName = formData.room_name ?? "";
        const roomType = formData.RoomType ?? "";
        const location = formData.Location ?? "";
        const building = formData.Building ?? "";
        // console.log(deviceId,roomName, roomType, location, building,top);
        if (deviceId == "") {
            console.log("Nothing to update!")
            return;
        }
        try {
            const restOperation = post({
                apiName: 'apic1eeecf5',
                path: '/update',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                options: {
                    body: {
                        deviceId: deviceId,
                        roomName: roomName,
                        roomType: roomType,
                        location: location,
                        building: building,
                    }
                }
            });
            const { body } = await restOperation.response;
            const response = await body.json();
            console.log("Return from API type:", response)
            alert(response.status)
        } catch (e) {
            console.log('POST call failed: ', e);
        }
    };

    const handleFormSummitDevice = async (formData) => {
        try {
            const restOperation = get({
                apiName: 'apic1eeecf5',
                path: '/update',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },

            });
            const { body } = await restOperation.response;
            const response = await body.json();
            console.log("Return from API type:", response)
            setTableData(JSON.parse(response.body));
        } catch (e) {
            console.log('GET call failed: ', e);
        }
    }
    return (
        <div className="containter">
            <form onSubmit={handleSubmit(handleFormSummit)} className="form">
                <SelectUpdate options={deviceId} fieldName="Device" label="Choose Device" register={register} setValue={setValue} />
                <TextField label="Room name" variant="outlined" {...register('room_name')} />
                <SelectUpdate options={location} fieldName="Location" label="Change location" register={register} setValue={setValue} />
                <SelectUpdate options={buildingList} fieldName="Building" label="Change building" register={register} setValue={setValue} />
                <SelectUpdate options={roomList} fieldName="RoomType" label="Change room" register={register} setValue={setValue} />
                <Fab type="submit" variant="extended">
                    Update!
                </Fab>
            </form >
            <form onSubmit={handleSubmit(handleFormSummitDevice)} className="form">

                <Fab type="submit" variant="extended">
                    Show Devices!
                </Fab>
            </form >
            {tableData != null && (
                <table className="response-table">
                    <thead>
                        <tr>
                            {Object.keys(tableData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, idx) => (
                                    <td key={idx}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

