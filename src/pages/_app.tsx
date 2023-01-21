import '@/styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Harmonograph</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline enableColorScheme />
      <Container maxWidth="lg" sx={{ p: 1 }}>
        <Component {...pageProps} />
      </Container>
    </React.Fragment>
  );
}
