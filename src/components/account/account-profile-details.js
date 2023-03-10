import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getInfor, updateAccount } from 'src/store/reducer/user.reducer';


export const AccountProfileDetails = (props) => {
  const errorUpdate = useSelector((state) => state.userReducer.error);
  // const user = JSON.parse(localStorage.getItem('user'));
  // const user = useSelector((state) => state.userReducer.user);
  const firstName = useSelector((state) => state.userReducer.firstName);
  const lastName = useSelector((state) => state.userReducer.lastName);
  const role = useSelector((state) => state.userReducer.role);
  const email = useSelector((state) => state.userReducer.email);
  const phone = useSelector((state) => state.userReducer.phone);
  const changeInfor = useSelector((state) => state.userReducer.changeInfor);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    oldPass: '',
    newPass: '',
    newPassVal: ''
  });
  const [open, setOpen] = useState(false)

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdateInfo = () => {
    console.log(values);
    dispatch(updateAccount({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone
    }))
  }

  const handleUpdatePassword = () => {
    dispatch(updateAccount({
      oldPass: values.oldPass,
      newPass: values.newPass,
      newPassVal: values.newPassVal
    }))
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getInfor())
    if (errorUpdate) {
      setOpen(true)
    }
  }, [,errorUpdate, changeInfor])

  return (
    <>
      <form
        autoComplete="off"
        noValidate
        {...props}
      >
        <Card>
          <CardHeader
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="T??n"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="H???"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  required
                  value={email}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="S??? ??i???n tho???i"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>+84</InputAdornment>
                  }}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Ch???c v???"
                  name="role"
                  onChange={handleChange}
                  value={role}
                  variant="outlined"
                  disabled
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleUpdateInfo}
            >
              L??u
            </Button>
          </Box>
        </Card>
        <Card sx={{mt: 3}}>
          <CardHeader
            subheader="?????i m???t kh???u"
            title="M???t kh???u"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="M???t kh???u c??"
              margin="normal"
              name="oldPass"
              onChange={handleChange}
              type="password"
              value={values.oldPass}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="M???t kh???u m???i"
              margin="normal"
              name="newPass"
              onChange={handleChange}
              type="password"
              value={values.newPass}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="X??c nh???n m???t kh???u m???i"
              margin="normal"
              name="newPassVal"
              onChange={handleChange}
              type="password"
              value={values.newPassVal}
              variant="outlined"
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleUpdatePassword}
            >
              C???p nh???p
            </Button>
          </Box>
        </Card>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"L???i"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorUpdate}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};
