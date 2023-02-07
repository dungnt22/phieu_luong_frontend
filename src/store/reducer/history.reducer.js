import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosAuth } from "src/utils/axios";

const initialState = {
    employees: [],
    totalRecord: 0,
    payments: [],
    totalPayments: 0,
    error: null,
    deletedEmployee: false,
    deletedPayment: false
}

export const getEmployees = createAsyncThunk('/employees', async ({ employeeID, page, size }, { rejectWithValue }) => {
    try {
        const response = await axiosAuth.post('/employees', {
            employeeID, page, size
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

export const deleteEmployee = createAsyncThunk('/delete/employee', async({ employeeID }, {rejectWithValue}) => {
    try {
        const response = await axiosAuth.delete('/employees', {
            data: {
                employeeID: employeeID
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

export const getPayments = createAsyncThunk('/payments', async({ employeeID, page, size }, {rejectWithValue}) => {
    try {
        const response = await axiosAuth.post('/payment', {
            employeeID, page, size
        });
        return response.data
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

export const deletePayment = createAsyncThunk('/delete/payment', async({ paymentID }, {rejectWithValue}) => {
    try {
        const response = await axiosAuth.delete('/payment', {
            data: {
                paymentID: paymentID
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

export const deleteAllPayment = createAsyncThunk('/delete/all/payment', async({ employeeID }, {rejectWithValue}) => {
    try {
        const response = await axiosAuth.delete('/payment', {
            data: {
                employeeID:  employeeID
            }
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

export const histotySlice = createSlice({
    name: 'History',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getEmployees.pending]: (state, action) => {
            state.error = null;
            state.employees = [];
            state.totalRecord = 0;
        },
        [getEmployees.fulfilled]: (state, action) => {
            state.totalRecord = action.payload.totalRecord;
            state.employees = [];
            state.employees = state.employees.concat(action.payload.data);
            state.error = null;
        },
        [getEmployees.rejected]: (state, action) => {
            console.log(action);
            state.error = action.payload.data.message
            state.totalRecord = 0;
            state.employees = [];
        },

        [deleteEmployee.pending]: (state, action) => {
            state.error = null;
            state.deletedEmployee = false;
        },
        [deleteEmployee.fulfilled]: (state, action) => {
            state.error = null;
            state.deletedEmployee = true;
        },
        [deleteEmployee.rejected]: (state, action) => {
            state.error = action.payload.data.message;
            state.deletedEmployee = false;
        },

        [getPayments.pending]: (state, action) => {
            state.error = null;
            state.payments = [];
            state.totalPayments = 0;
        },
        [getPayments.fulfilled]: (state, action) => {
            state.totalPayments = action.payload.totalPayments;
            state.payments = [];
            state.payments = state.payments.concat(action.payload.data);
            state.error = null
        },
        [getPayments.rejected]: (state, action) => {
            state.error = action.payload.data.message;
            state.payments = [];
            state.totalPayments = 0;
        },
        [deletePayment.pending]: (state, action) => {
            state.error = null;
            state.deletedPayment = false;
        },
        [deletePayment.fulfilled]: (state, action) => {
            state.error = null;
            state.deletedPayment = true;
        },
        [deletePayment.rejected]: (state, action) => {
            state.error = action.payload.data.message;
            state.deletedPayment = false;
        },
        [deleteAllPayment.pending]: (state, action) => {
            state.error = null
        },
        [deleteAllPayment.fulfilled]: (state, action) => {
            state.totalPayments = 0;
            state.payments = [];
            state.error = null
        },
        [deleteAllPayment.rejected]: (state, action) => {
            state.error = action.payload.data.message;
        }
    }
})

export default histotySlice.reducer;