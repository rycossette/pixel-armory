import 'flowbite';
import '../styles/globals.css';
import '../styles/tailwind.css'; // Update the path if needed
// import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
// config.autoAddCss = false
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-slate-950">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
