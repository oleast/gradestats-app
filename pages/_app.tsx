import * as Sentry from '@sentry/node';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React, { FC } from 'react';

import { pageView } from 'common/analytics';
import { SENTRY_DSN } from 'common/constants';
import { Navbar } from 'components/Navbar';

import '@reach/dialog/styles.css';
import 'react-alice-carousel/lib/scss/alice-carousel.scss';
import 'cssremedy/css/remedy.css';
import 'cssremedy/css/reminders.css';
import 'cssremedy/css/quotes.css';
import './global.scss';

import styles from './_app.module.scss';
import { Alert } from 'components/Alert';
import { Footer } from 'components/Footer';
import { WelcomeMessage } from 'components/Alert/WelcomeMessage';

Sentry.init({
  dsn: SENTRY_DSN ?? undefined,
});

const getPathFromUrl = (url: string) => {
  return url.split(/[?#]/)[0];
};

let previousPath = '';

Router.events.on('routeChangeComplete', (url: string) => {
  const newPath = getPathFromUrl(url);
  if (newPath !== previousPath) {
    pageView(url);
  }
  previousPath = newPath;
});

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const App: FC<AppProps & { err: any }> = ({ Component, pageProps, err }) => {
  // Workaround for https://github.com/zeit/next.js/issues/8592
  const modifiedPageProps = { ...pageProps, err };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.app}>
        <Navbar className={styles.header} />
        <main className={styles.main}>
          <noscript>
            <Alert type="info">
              Denne nettsiden bruker JavaScript for all interaktivitet, for å dra full nytte av nettsiden må du derfor
              aktivere JavaScript.
            </Alert>
          </noscript>
          <WelcomeMessage />
          <Component {...modifiedPageProps} />
        </main>
        <Footer className={styles.footer} />
      </div>
    </>
  );
};

export default App;
