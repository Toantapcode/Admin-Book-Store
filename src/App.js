import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Table/product";
import Home from "./components/Home";
import { Users } from './Views/Users'
import { Order } from "./Views/Order";
import { Product } from "./Views/Products";
import { Review } from "./Views/Review";
import { Category } from "./Views/Category";
import { Banner } from "./Views/Banner";
import Login from './Views/Login';
import { ProtectAuth } from "./components/ProtecdRouter";

function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Routes>
          <Route element={<ProtectAuth />}>
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/" element={<Home />}>
            <Route path="user" element={<Users />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
            <Route path="order" element={<Order />} />
            <Route path="review" element={<Review />} />
            <Route path="banner" element={<Banner />} />
          </Route>
        </Routes>
        {/* <Route index element={<div style={{ flex: 1 }}> */}
        {/* <Table /> */}
        {/* </div>} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
