import { Box, Button, TextField, InputAdornment, SvgIcon, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'src/store/reducer/history.reducer';
import { Search as SearchIcon } from '../../icons/search';

export const HistoryToolbar = (props) => {
  const dispatch = useDispatch();
  const errorSearch = useSelector((state) => state.historyReducer.error);

  const [employeeID, setEmployeeID] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setEmployeeID(event.target.value)
  }

  const handleSearch = () => {
    dispatch(getEmployees({employeeID}))
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (errorSearch) {
      setOpen(true);
    }
  }, [errorSearch])

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
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Lịch sử gửi mail
        </Typography>
        <Box sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
          <TextField
            type="text"
            name="search"
            value={employeeID}
            sx={{ mr: 2}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                    color="action"
                    fontSize="small"
                  >
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            placeholder="Mã số nhân viên"
            variant="outlined"
            onChange={handleChange}
          />
          <Button 
            startIcon={(<SearchIcon fontSize="small" />)} 
            sx={{ mr: 1 }} 
            color='primary' 
            variant='contained'
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Lỗi"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorSearch}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  )
};
