import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllPayment, deleteEmployee, deletePayment, getEmployees, getPayments } from 'src/store/reducer/history.reducer';
import { Box } from '@mui/system';
import { format } from 'date-fns';

export const HistoryResults = ({ employees, totalRecord, ...rest }) => {
  const payments = useSelector((state) => state.historyReducer.payments);
  const totalPayments = useSelector((state) => state.historyReducer.totalPayments);
  const deletedPayment = useSelector((state) => state.historyReducer.deletedPayment);
  const dispatch = useDispatch();

  const [size, setSize] = useState(5);
  const [page, setPage] = useState(0);
  const [paymentSize, setPaymentSize] = useState(5);
  const [paymentPage, setPaymentPage] = useState(0);
  const [display, setDisplay] = useState('none')
  const [name, setName] = useState('');
  const [empl, setEmpl] = useState();
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState('');

  const handleLimitChange = (event) => {
    let size = event.target.value;
    setSize(event.target.value);
    dispatch(getEmployees({
      page: page + 1,
      size: size
    }))
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(getEmployees({
      page: newPage + 1,
      size: size
    }))
  };

  const handlePaymentPageChange = (event, newPage) => {
    setPaymentPage(newPage);
    dispatch(getPayments({
      employeeID: empl,
      page: newPage + 1,
      size: paymentSize
    }))
  }

  const handlePaymentLimitChange = (event) => {
    let pySize = event.target.value;
    setPaymentSize(event.target.value)
    dispatch(getPayments({
      employeeID: empl,
      page: paymentPage + 1,
      size: pySize
    }))
  }

  const handleDelete = (employee) => {
    setOpen(true);
    setEmployee(employee)
  }

  const handleDeleteEmployee = () => {
    setOpen(false);
    let employeeID = employee._id
    dispatch(deleteEmployee({employeeID}));
  }

  const handlePayment = (employee) => {
    let id = employee._id;
    setName(employee.name);
    setEmpl(employee._id);
    setDisplay('block');
    dispatch(getPayments({
      employeeID: id
    }))
  }

  const handleDeletePayment = (paymentID) => {
    dispatch(deletePayment({paymentID}))
  }

  const handleDeleteAllPayment = () => {
    dispatch(deleteAllPayment({
      employeeID: empl
    }))
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getPayments({
      employeeID: empl
    }))
  }, [deletedPayment])

  return (
    <>
    <Card {...rest}>
      <PerfectScrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  MSNV
                </TableCell>
                <TableCell>
                  HỌ VÀ TÊN
                </TableCell>
                <TableCell>
                  EMAIL
                </TableCell>
                <TableCell>
                  CHỨC VỤ
                </TableCell>
                <TableCell>
                  LỊCH SỬ GỬI LƯƠNG
                </TableCell>
                <TableCell>
                  XÓA
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  hover
                  key={employee._id}
                >
                  <TableCell>
                    {employee.employeeCode}
                  </TableCell>
                  <TableCell>
                    {employee.name}
                  </TableCell>
                  <TableCell>
                    {employee.email}
                  </TableCell>
                  <TableCell>
                    {employee.currentLevel}
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{cursor: 'pointer'}} onClick={(e) => handlePayment(employee)}>
                      <em>Xem chi tiết</em>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Xóa">
                      <IconButton onClick={(e) => handleDelete(employee)}>
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalRecord}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={size}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>

    <Box display={display} sx={{mt: 5}}>
      <Typography variant='subtitle1'>
        Lịch sử gửi phiếu lương nhân viên: {' '} 
        <em>{name}</em>
      </Typography>
      <Card sx={{mt: 1}}>
        <PerfectScrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  THÁNG
                </TableCell>
                <TableCell>
                  NGÀY GỬI
                </TableCell>
                <TableCell>
                  TRẠNG THÁI
                </TableCell>
                <TableCell>
                  XÓA
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow hover key={payment._id}>
                  <TableCell>
                    {payment.month}
                  </TableCell>
                  <TableCell>
                    {format(new Date(payment.sendDate), 'dd/MM/yyyy h:mm a')}
                  </TableCell>
                  <TableCell>
                    {payment.status === 0 ? "Chưa gửi" : "Hoàn thành"}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Xóa">
                      <IconButton onClick={(e) => handleDeletePayment(payment._id)}>
                        <DeleteIcon fontSize='small'/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={totalPayments}
          onPageChange={handlePaymentPageChange}
          onRowsPerPageChange={handlePaymentLimitChange}
          page={paymentPage}
          rowsPerPage={paymentSize}
          rowsPerPageOptions={[5, 10, 25]}
        />

        <Button sx={{mb: 2, ml: 2}} variant='contained' color='error' onClick={handleDeleteAllPayment}>Xóa tất cả</Button>
      </Card>
    </Box>

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Xóa nhân viên"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn muốn xóa nhân viên: {' '} {employee.name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleDeleteEmployee}>OK</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

HistoryResults.propTypes = {
  employees: PropTypes.array.isRequired,
  totalRecord: PropTypes.number.isRequired
};
   