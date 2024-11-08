import React, { useState } from "react";
import './styles/Old.css'
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import CheckboxesTags from "./components/common/CheckboxesTags";
import Fab from '@mui/material/Fab';
import Select from './components/common/Select'
import { post } from 'aws-amplify/api';
import ControlledRadioButtonsGroup from "./components/common/RadioGroup"