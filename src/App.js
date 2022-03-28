
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./Home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ForgotPassword from "./Authentication/ForgotPassword";
import AdminDashboard from "./Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import InsertCategory from "./Dashboard/Category/insertCategory";
import ViewCategories from "./Dashboard/Category/viewCategories";
import ViewProducts from "./Dashboard/Product/viewProducts";
import AdminProfile from "./Dashboard/profile";
import ActivateShop from "./Dashboard/activateShop";
import InsertProduct from "./Dashboard/Product/insertProduct";
import Shop from "./Shop";
import QuickView from "./Shop/modal/QuickView";
import ShopCategories from "./Shop/Categories";
import ProductDetails from "./Shop/ProductDetails";
import Cart from "./Shop/Cart";
import TrackOrder from "./Shop/TrackOrder";

const App = () => {
    const currentURL = window.location.href
    let domainActivated;

    if (currentURL === "https://storetract.com/") {
        console.log(true)
        domainActivated = false
    }
    else if (currentURL === "http://localhost:3000/" ){
        console.log('true true')
        domainActivated = false
    }
    else {
        console.log('false true')
        domainActivated = true
    }

  return (
      <>
          <Router>
              <Routes>
                  {
                      domainActivated ?
                          ( <Route path="/track-order" element={<TrackOrder />} />)
                          :
                          (   <Route exact path="/" element={<Home />} />)
                  }
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/admin-dash" element={<PrivateRoute/>}>
                      <Route path="/admin-dash" element={<AdminDashboard />} />
                  </Route>
                  <Route path="/admin-profile" element={<PrivateRoute/>}>
                      <Route path="/admin-profile" element={<AdminProfile />} />
                  </Route>
                  <Route path="/insert-category" element={<PrivateRoute/>}>
                      <Route path="/insert-category" element={<InsertCategory />} />
                  </Route>
                  <Route path="/view-categories" element={<PrivateRoute/>}>
                      <Route path="/view-categories" element={<ViewCategories />} />
                  </Route>
                  <Route path="/insert-product" element={<PrivateRoute/>}>
                      <Route path="/insert-product" element={<InsertProduct />} />
                  </Route>
                  <Route path="/view-products" element={<PrivateRoute/>}>
                      <Route path="/view-products" element={<ViewProducts />} />
                  </Route>
                  <Route path="/activate-shop" element={<PrivateRoute/>}>
                      <Route path="/activate-shop" element={<ActivateShop />} />
                  </Route>

                  <Route path="/:shopName" element={<Shop />} />
                  <Route path="/:shopName/cart" element={<Cart />} />
                  <Route path="/:shopName/:categoryUrl/quick-view" element={<QuickView />} />
                  <Route path="/:shopName/:categoryUrl" element={<ShopCategories />} />
                  <Route path="/:shopName/:categoryUrl/:productUrl" element={<ProductDetails />} />



              </Routes>
          </Router>
          <ToastContainer />

      </>

  );
}

export default App;
