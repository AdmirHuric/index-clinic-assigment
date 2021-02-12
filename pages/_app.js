import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Index Clinic Assignment</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ToastContainer/>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp;
