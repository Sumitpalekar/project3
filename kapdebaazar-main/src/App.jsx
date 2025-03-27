import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import Shop from "./routes/Shop";
import Authentication from "./routes/Authentication";
import CheckOut from "./routes/CheckOut";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="signin" element={<Authentication />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
