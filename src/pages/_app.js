import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import  store  from 'src/store';
import { Provider, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { emotionCache = clientSideEmotionCache } = props;

  return (
      <CacheProvider value={emotionCache}>
        <Head>
          <title>
            Material Kit Pro
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <Provider store={store}>
          <AppInternal {...props} />
        </Provider>
      </CacheProvider>
  );
};


const AppInternal = (props) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();
  const authenticated = useSelector((state) => state.userReducer.authenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push("/upload")
    } else {
      router.push("/login")
    }
  }, [authenticated])

  return (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  </LocalizationProvider>
  )
}

export default App;
