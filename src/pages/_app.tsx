import { store } from '@/redux/store';
import '@/styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';

import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import Header from '@/components/header';
config.autoAddCss = false; /* eslint-disable import/first */


export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Harmonograph</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline enableColorScheme />
      <Container maxWidth="xl" sx={{ p: 1 }}>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </Container>
    </React.Fragment>
  );
}
