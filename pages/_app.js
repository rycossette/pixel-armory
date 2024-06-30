import 'flowbite';
import '../styles/globals.css';
import '../styles/tailwind.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-slate-950">
      <Head>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
