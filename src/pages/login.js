import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'src/store/reducer/user.reducer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const dispatch = useDispatch()
  const errorLogin = useSelector((state) => state.userReducer.error);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .email(
          'Địa chỉ Email không hợp lệ')
        .max(255)
        .required(
          'Nhập địa chỉ Email'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Nhập mật khẩu')
    }),
    onSubmit: async () => {
      handleSubmit();
    }
  });

  const handleSubmit = () => {
    try {
      const username = formik.values.username;
      const password = formik.values.password;

      dispatch(login({username, password}))
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (errorLogin) {
      setOpen(true)
    }
  }, [errorLogin])

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Đăng nhập
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Email Address"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Đăng nhập
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              <NextLink
                href="/forgotPassword"
              >
                <Link
                  to="/forgotPassword"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Quên mật khẩu ?
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
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
            {errorLogin}
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

export default Login;
