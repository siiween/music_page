import DefaultLayout from "../components/Layouts/DefaultLayout";
import "../styles/globals.css";
import "../styles/icomoon/style.css";
import { Provider } from "react-redux";
import store from "../store/index";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Provider>
  );
}

export default MyApp;
