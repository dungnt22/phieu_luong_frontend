import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import { useDispatch, useSelector } from 'react-redux';
import { setScheduleEmployees, uploadPreview } from 'src/store/reducer/upload.reducer';
import NumberFormat from 'react-number-format';

export const UploadResults = ({ employees, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    let newItems;

    if (event.target.checked) {
      newSelectedCustomerIds = employees.map((employee) => employee.employeeCode);
      newItems = employees;
    } else {
      newSelectedCustomerIds = [];
      newItems = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    setItems(newItems);
    dispatch(setScheduleEmployees({newItems}))
  };

  const handleSelectOne = (event, employee) => {
    const selectedIndex = selectedCustomerIds.indexOf(employee.employeeCode);
    let newSelectedCustomerIds = [];
    let newItems = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, employee.employeeCode);
      newItems = newItems.concat(items, employee)
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
      newItems = newItems.concat(items.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
      newItems = newItems.concat(items.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
      newItems = newItems.concat(
        items.slice(0, selectedIndex),
        items.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    setItems(newItems)
    dispatch(setScheduleEmployees({newItems}))
  };

  const handleClick = (employee) => {
    dispatch(uploadPreview({employee}));
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === employees.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < employees.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  MSNV
                </TableCell>
                <TableCell>
                  H??? V?? T??N
                </TableCell>
                <TableCell>
                  CH???C V???
                </TableCell>
                <TableCell>
                  EMAIL
                </TableCell>
                <TableCell>
                  TH??NG
                </TableCell>
                <TableCell>
                  NG??Y C??NG
                </TableCell>
                <TableCell>
                  L????NG ????NG BHXH
                </TableCell>
                <TableCell>
                  TH?????NG THEO DOANH THU H??NG TH??NG
                </TableCell>
                <TableCell>
                  H??? TR??? TI???N C??M TR??A
                </TableCell>
                <TableCell>
                  H??? TR??? ??I???N THO???I
                </TableCell>
                <TableCell>
                  H??? TR??? TRANG PH???C
                </TableCell>
                <TableCell>
                  THU NH???P TH?????NG
                </TableCell>
                <TableCell>
                  KH??C
                </TableCell>
                <TableCell>
                  C???NG THU NH???P L????NG
                </TableCell>
                <TableCell>
                  THU NH???P CH???U THU???
                </TableCell>
                <TableCell>
                  NG?????I PH??? THU???C
                </TableCell>
                <TableCell>
                  S??? TI???N GI???M TR??? B???N TH??N
                </TableCell>
                <TableCell>
                  S??? TI???N GI???M TR??? GIA C???NH
                </TableCell>
                <TableCell>
                  TI???N ????NG B???O HI???M
                </TableCell>
                <TableCell>
                  THU NH???P T??NH THU???
                </TableCell>
                <TableCell>
                  THU??? THU NH???P C?? NH??N
                </TableCell>
                <TableCell>
                  T???NG C??C KHO???N GI???M TR???
                </TableCell>
                <TableCell>
                  L????NG NET
                </TableCell>
                <TableCell>
                  L????NG GROSS
                </TableCell>
                <TableCell>
                  XEM TR?????C
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  hover
                  key={employee.employeeCode}
                  selected={selectedCustomerIds.indexOf(employee.employeeCode) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(employee.employeeCode) !== -1}
                      onChange={(event) => handleSelectOne(event, employee)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {employee.employeeCode}
                  </TableCell>
                  <TableCell>
                    {employee.name}
                  </TableCell>
                  <TableCell>
                    {employee.currentLevel}
                  </TableCell>
                  <TableCell>
                    {employee.email}
                  </TableCell>
                  <TableCell>
                    {employee.month}
                  </TableCell>
                  <TableCell>
                    {employee.ngay_cong}
                  </TableCell>
                  <TableCell>
                    {employee.luong_dong_bhxh}
                    {/* <NumberFormat value={employee.luong_dong_bhxh} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.thuong_theo_doanh_thu_hang_thang}
                    {/* <NumberFormat value={employee.thuong_theo_doanh_thu_hang_thang} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.ho_tro_tien_com_trua}
                    {/* <NumberFormat value={employee.ho_tro_tien_com_trua} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.ho_tro_dien_thoai}
                    {/* <NumberFormat value={employee.ho_tro_dien_thoai} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.ho_tro_trang_phuc}
                    {/* <NumberFormat value={employee.ho_tro_trang_phuc} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.thuong_le_tet}
                    {/* <NumberFormat value={employee.thuong_le_tet} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.thuong_khac}
                    {/* <NumberFormat value={employee.thuong_khac} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.cong_thu_nhap_luong}
                    {/* <NumberFormat value={employee.cong_thu_nhap_luong} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.thu_nhap_chiu_thue}
                    {/* <NumberFormat value={employee.thu_nhap_chiu_thue} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.nguoi_phu_thuoc}
                    {/* <NumberFormat value={employee.nguoi_phu_thuoc} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.so_tien_giam_tru_ban_than}
                    {/* <NumberFormat value={employee.so_tien_giam_tru_ban_than} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.so_tien_giam_tru_gia_canh}
                    {/* <NumberFormat value={employee.so_tien_giam_tru_gia_canh} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.tien_dong_bao_hiem}
                    {/* <NumberFormat value={employee.tien_dong_bao_hiem} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.thu_nhap_tinh_thue}
                    {/* <NumberFormat value={employee.thu_nhap_tinh_thue} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.thue_thu_nhap_ca_nhan}
                    {/* <NumberFormat value={employee.thue_thu_nhap_ca_nhan} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.tong_cac_khoan_giam_tru}
                    {/* <NumberFormat value={employee.tong_cac_khoan_giam_tru} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.luong_net}
                    {/* <NumberFormat value={employee.luong_net} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                  {employee.luong_gross}
                    {/* <NumberFormat value={employee.luong_gross} displayType={'text'} thousandSeparator={true} /> */}
                  </TableCell>
                  <TableCell>
                    <PdfIcon sx={{cursor: 'pointer'}} onClick={(e) => handleClick(employee)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
      </PerfectScrollbar>
    </Card>
  );
};

UploadResults.propTypes = {
  employees: PropTypes.array.isRequired
};
