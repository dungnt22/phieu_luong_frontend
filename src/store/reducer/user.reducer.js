import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosAuth, axiosInstance } from 'src/utils/axios'

const initialState = {
  authenticated: false,
  error: null,
  firstName: '',
  lastName: '',
  username: '',
  phone: '',
  email: '',
  role: '',
  changeInfor: false
}


export const login = createAsyncThunk('user/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/login', {
      username, password
    });
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response)
  }
})

export const updateAccount = createAsyncThunk('user/update', async ({ oldPass, newPass, newPassVal, lastName, firstName, phone }, {rejectWithValue}) => {
  try {
    const response = await axiosAuth.post('/settings/account', {
      oldPass, newPass, newPassVal, lastName, firstName, phone
    });
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    return rejectWithValue(error.response);
  }
})

export const forgotPassword = createAsyncThunk('user/forgotPassword', async({ email }, {rejectWithValue}) => {
  try {
    const response = await axiosAuth.post('/forgotPassword', {
      email
    });
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    return rejectWithValue(error.response);
  }
})

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    isAuthenticate: (state, action) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        state.authenticated = true;
      } else {
        state.authenticated = false;
      }
      state.error = null;
    },
    getInfor: (state, action) => {
      const user = JSON.parse(window.localStorage.getItem('user'));
      if (user) {
        state.firstName = user.firstName;
        state.lastName = user.lastName;
        state.phone = user.phone;
        state.email = user.email;
        state.username = user.lastName + " " + user.firstName;
        state.role = user.role;
      }
    },
    logout: (state, action) => {
      state = initialState;
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.error = null
    },
    [login.fulfilled]: (state, action) => {
      let data = action.payload
      state.authenticated = true
      state.error = null
      window.localStorage.setItem('token', data.token)
      window.localStorage.setItem('user', JSON.stringify(data.data));
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload.data.message + '.\n' 
                  + action.payload.data.error;
      state.authenticated = false;
    },
    [updateAccount.pending]: (state, action) => {
      state.error = null,
      state.changeInfor = false;
    },
    [updateAccount.fulfilled]: (state, action) => {
      window.localStorage.setItem('user', JSON.stringify(action.payload.data))
      state.error = null,
      state.changeInfor = true;
    },
    [updateAccount.rejected]: (state, action) => {
      console.log(action);
      state.error = action.payload.data.errors[0].msg;
      state.changeInfor = false;
    },
    [forgotPassword.pending]: (state, action) => {
      state.error = null;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.error = null;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.error = action.payload.data.message
    }
  }
})

export const { logout, isAuthenticate, getInfor } = userSlice.actions;

export default userSlice.reducer