import "./App.css";
import Header from "./components/Header";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loading from "./components/Checkout/Loading";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Loading />
        <Header />
        <Checkout />
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
