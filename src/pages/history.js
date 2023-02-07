import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { HistoryResults } from 'src/components/history/history-results';
import { HistoryToolbar } from '../components/history/history-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'src/store/reducer/history.reducer';

const History = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.historyReducer.employees);
  const totalRecord = useSelector((state) => state.historyReducer.totalRecord);
  const deletedEmployee = useSelector((state) => state.historyReducer.deletedEmployee)

  useEffect(() => {
    dispatch(getEmployees({}))
  }, [, deletedEmployee])

  return (
    <>
      <Head>
        <title>
          History | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <HistoryToolbar />
          <Box sx={{ mt: 3 }}>
            <HistoryResults employees={employees} totalRecord={totalRecord} />
          </Box>
        </Container>
      </Box>
    </>
  )
};
History.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default History;
