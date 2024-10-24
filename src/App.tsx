import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AddProductForm from "./components/Invoice/AddProductForm";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProductForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};
export default App;
