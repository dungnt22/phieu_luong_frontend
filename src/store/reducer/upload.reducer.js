import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FormData from "form-data";
import { axiosAuth } from "src/utils/axios";

const initialState = {
    employees: [],
    fileName: "",
    isUploading: false,
    uploaded: false,
    scheduleEmployees: [],
    error: null
}

export const upload = createAsyncThunk('/upload', async({ file }, { rejectWithValue }) => {
    let formData = new FormData();

    formData.append('fileInput', file);
    try {
        const response = await axiosAuth.post('/upload', formData);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

export const uploadPreview = createAsyncThunk('/upload/preview', async({ employee }, { rejectWithValue }) => {
    
    try {
        const response = await axiosAuth.post('/upload/preview', {
            employee,
        }, {responseType: "blob"});
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', employee.name + '.pdf');
        // link.setAttribute('target', '_blank');
        // document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);

        return url;
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

export const uploadSchedule = createAsyncThunk('/upload/send/mail', async({ scheduleDate, employees }, {rejectWithValue}) => {
    try {
        const response = await axiosAuth.post('/schedule', {
            scheduleDate, employees
        });
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

export const uploadSlice = createSlice({
    name: 'Upload',
    initialState,
    reducers: {
        setFileReducer: (state, action) => {
            console.log(action);
            state.fileName = action.payload;
        },
        setScheduleEmployees: (state, action) => {
            state.scheduleEmployees = action.payload.newItems;
        }
    },
    extraReducers: {
        [upload.pending]: (state, action) => {
            state.isUploading = true;
            state.uploaded = false;
            state.error = null;
            state.employees = [];
            console.log('Uploading...');
        },
        [upload.fulfilled]: (state, action) => {
            console.log(typeof action.payload.data);
            state.isUploading = false;
            state.employees = action.payload.data;
            state.uploaded = true;
            state.error = null
        },
        [upload.rejected]: (state, action) => {
            console.log(action);
            state.isUploading = false;
            state.employees = [];
            state.uploaded = false;
            state.error = action.payload.data.message;
            console.log(state.error);
        },
        [uploadPreview.pending]: (state, action) => {

        },
        [uploadPreview.fulfilled]: (state, action) => {
            
        },
        [uploadPreview.rejected]: (state, action) => {
            console.log(action.payload);
        },
        [uploadSchedule.pending]: (state, action) => {
            state.error = null;
        },
        [uploadSchedule.fulfilled]: (state, action) => {
            state.error = null;
        },
        [uploadSchedule.rejected]: (state, action) => {
            state.error = action.payload.data.message;
        }
    }
})

export const { setFileReducer, setScheduleEmployees } = uploadSlice.actions;

export default uploadSlice.reducer;