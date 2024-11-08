import React, { useState } from "react";
import './styles/Old.css'
// import  './App.css';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import CheckboxesTags from "./components/common/CheckboxesTags";
import Fab from '@mui/material/Fab';
import Select from './components/common/Select'
import { post } from 'aws-amplify/api';
import ControlledRadioButtonsGroup from "./components/common/RadioGroup"

// We need to have react-hook-form to validate and integrate with Material UI, except for AutoComplete because we 
// need to manage its value differently because it doesn't work in the same way as a simple input. it doesn't automatically connect to react-hook-form via register.
const deviceList = [
    { title: 'device_1' },
    { title: 'device_2' },
    { title: 'device_3' },
    { title: 'device_4' },
    { title: 'device_5' },
    { title: 'device_6' },
    { title: 'device_7' },
    { title: 'device_8' },
    { title: 'device_9' },
    { title: 'device_10' },
    { title: 'device_11' },
    { title: 'device_12' },
    { title: 'device_14' },
    { title: 'device_16' },
    { title: 'device_17' },
    { title: 'device_18' },
    { title: 'device_19' },
    { title: 'device_20' }
];
const location = [ { title: 'North Wing' }, { title: 'South Wing' }, { title: 'East Wing' }, { title: 'West Wing' },]
const buildingList = [ { title: 'Building A' }, { title: 'Building B' }, { title: 'Building C' }, { title: 'Building D' }]
const roomList = [{ title: 'Office' }, { title: 'Storage' }, { title: 'Ball room' }, { title: 'Study room' }, { title: 'Lab' }, { title: 'Class room' },]
export default function DataField() {
    const { register, handleSubmit, setValue, watch } = useForm();

    const [tableData, setTableData] = useState(null);

    const handleFormSummit = async (formData )=>{
        console.log('form data is:', formData);
        const deviceList = formData.Device ?? [];
        const roomName = formData.room_name ?? "";
        const roomType = formData.RoomType ?? [];
        const location = formData.Location ?? [];
        const building = formData.Building ?? [];
        const temp = formData.Temperature;
        const humid = formData.Humidity;
        const light = formData.Light;
        const top = formData.top ?? 50;
          // console.log(deviceList,roomName, roomType, location, building,top);
        try {
            const restOperation = post({
              apiName: 'apic1eeecf5',
              path: '/data/1',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              options:{
                body: {
                 deviceList : deviceList,
                 roomName : roomName,
                 roomType : roomType,
                 location  : location,
                 building : building,
                 temp : temp,
                 humid : humid,
                 light : light,
                 top : top,
              }
            }
            });
            const { body } = await restOperation.response;
            const response = await body.json();
            console.log("Return from API type:", typeof(JSON.parse(response.body)));
            // console.log("Return from API :", JSON.parse(response.body));
            // console.log("Return from API:", response.body);
            setTableData(JSON.parse(response.body));
          } catch (e) {
            console.log('POST call failed: ', e);
          }
    }

    return (
      <div className="containter  ">
        <form  onSubmit = {handleSubmit(handleFormSummit)}  className="form">
            <CheckboxesTags options={deviceList} fieldName="Device"  setValue={setValue}  />
            <TextField  label="Room name" variant="outlined" {...register('room_name')}/>
            <CheckboxesTags options={buildingList} fieldName="Building"  setValue={setValue}/>
            <CheckboxesTags options={location} fieldName="Location"  setValue={setValue}/>
            <CheckboxesTags options={roomList} fieldName="RoomType"  setValue={setValue} />
            <Select register={register} setValue={setValue}/>
            <ControlledRadioButtonsGroup setValue={setValue} fieldName="Temperature"/>
            <ControlledRadioButtonsGroup setValue={setValue} fieldName="Humidity"/>
            <ControlledRadioButtonsGroup setValue={setValue} fieldName="Light"/>
            <Fab type="submit"  variant="extended">
                Navigate
            </Fab>
        </form >
        {tableData != null  && (
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

