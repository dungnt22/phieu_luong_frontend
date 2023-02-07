import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UploadResults } from '../components/upload/upload-results';
import { UploadToolbar } from '../components/upload/upload-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Upload = () => {
  const isUploading = useSelector((state) => state.uploadReducer.isUploading)
  let employees = useSelector((state) => state.uploadReducer.employees);

  useEffect(() => {
    console.log(employees);
  }, [isUploading])

  return (
    <>
      <Head>
        <title>
          Upload | Material Kit
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
          <UploadToolbar />
          <Box sx={{ mt: 2 }}>
            <UploadResults employees={employees} />
          </Box>
        </Container>
      </Box>
    </>
  )
};
Upload.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Upload;
