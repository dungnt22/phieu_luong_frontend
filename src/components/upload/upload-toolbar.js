import { Box, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Stack, DialogContentText } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { useEffect, useState } from 'react';
import { Upload as UploadIcon } from '../../icons/upload';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { upload, setFileReducer, uploadSchedule } from 'src/store/reducer/upload.reducer';
import FormData from 'form-data';

  
export const UploadToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [ values, setValues ] = useState(new Date());
  const [file, setFile] = useState();
  const [ fileName, setFileName] = useState();
  const [method, setMethod] = useState('sendNow')
  const [openError, setOpenError] = useState(false);

  const dispatch = useDispatch();

  let name = useSelector((state) => state.uploadReducer.fileName)
  let uploaded = useSelector((state) => state.uploadReducer.uploaded);
  const scheduleEmployees = useSelector((state) => state.uploadReducer.scheduleEmployees);
  const error = useSelector((state) => state.uploadReducer.error);

  const handleCloseError = () => {
    setOpenError(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (newValue) => {
    setValues(newValue);
  }

  const handleChangeFile = (event) => {
    if (event.target && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      dispatch(setFileReducer(event.target.files[0].name));
    }
  }

  const handleUpload = () => {
    try {
      console.log(file);
      dispatch(upload({file}))
    } catch (error) {
      console.log(error);
      console.log("bfhjdbvj");
    }
  }

  const handleChangeMethod = (event) => {
    setMethod(event.target.value)
  }

  const handleSend = () => {
    setOpen(false);
    // console.log(scheduleEmployees);
    // console.log(values);
    let scheduleDate;
    if (method === 'sendNow') {
      scheduleDate = '';
    } else if (method === 'sendSchedule') {
      scheduleDate = new Date(values).getTime();
    }
    console.log(scheduleDate);
    dispatch(uploadSchedule({
      scheduleDate: scheduleDate,
      employees: scheduleEmployees
    }))
  }

  useEffect(() => {
    if (error) {
      setOpenError(true)
    }
  }, [error])

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Box>
          <Typography
            sx={{ m: 1 }}
            variant="h4"
          >
            Đặt lịch
          </Typography>
          <Typography variant='subtitle1' sx={{ml: 1, mt: 3, }}>
            File được chọn: 
            {' '}
            <span><em>{uploaded ? name : fileName}</em></span>
          </Typography>
        </Box>

        <Box sx={{ m: 1 }}>
          <Button
            variant="outlined" component="label" 
            sx={{ mr: 1 }}
          >
            <span>Chọn file</span>
            <input style={{ display: 'none'}} accept=".xlsx" type="file" id='upload-button' onChange={handleChangeFile}/>
          </Button>
          <Button
            variant="outlined"
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
            onClick={handleUpload}            
          >
            Upload
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClickOpen}
          >
            Gửi
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tùy chọn gửi</DialogTitle>
        <Divider />
        <DialogContent>
          <FormControl>
            <FormLabel id="schedule-methods-group">Phương thức đặt lịch</FormLabel>
            <RadioGroup
              aria-labelledby="schedule-methods-group-label"
              value={method}
              name='methods-group'
              onChange={handleChangeMethod}
            >
              <Box>
                <FormControlLabel value="sendNow" control={<Radio />} label="Gửi luôn" />
              </Box>
              <Box>
                <FormControlLabel sx={{mb: 2}} value="sendSchedule" control={<Radio />} label="Đặt lịch gửi" />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label='Ngày'
                      inputFormat="dd/MM/yyyy"
                      value={values}
                      onChange={handleChange}
                      disabled={method === 'sendNow'}
                      renderInput={(params) => <TextField sx={{width: '400px'}} {...params} />} 
                    />
                    <TimePicker
                      label='Giờ'
                      value={values}
                      onChange={handleChange}
                      disabled={method === 'sendNow'}
                      renderInput={(params) => <TextField sx={{width: '400px'}} {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Box>
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSend}>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openError}
        onClose={handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Lỗi"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  )
};
  