import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Box, IconButton, Link, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getInfor } from 'src/store/reducer/user.reducer';
import { useEffect } from 'react';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const dispatch = useDispatch();
  const username = useSelector((state) => state.userReducer.username);
  const role = useSelector((state) => state.userReducer.role);
  const changeInfor = useSelector((state) => state.userReducer.changeInfor);

  const handleLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    dispatch(getInfor());
  }, [,changeInfor])

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
          <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{mr: 3}}>
            <Typography sx={{fontWeight: 'bold'}} color="textSecondary" variant="h6">
              <em>{username}</em>
            </Typography>
            <Typography color="textSecondary" variant="body2">
              <em>{role}</em>
            </Typography>
          </Box>
          <Link href='/login'>
            <Tooltip title="Đăng xuất">
              <IconButton onClick={handleLogout} sx={{ ml: 1 }}>
                <LogoutIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Link>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
