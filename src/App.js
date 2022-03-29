
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
import {useEffect ,useState} from "react";
import ShopAuth from "./Shop/account/Auth";
import {doc ,getDoc} from "firebase/firestore";
import {db} from "./firebase.config";
import Spinner from "./components/Spinner";

const App = () => {
    const currentURL = window.location.href;
    const [loading ,setLoading] = useState(true)
    const currentEdited = (currentURL).toString().replace(/[^a-zA-Z0-9]/g ,'')
    const [domainActivated, setDomainActivated] = useState(false)
    const [storeUrl, setStoreUrl] = useState(false)


    useEffect(() => {


        const fetchUrl = async () => {
            try {
                const urlRef = doc(db ,"domains" ,currentEdited)
                const docSnap = await getDoc(urlRef);

                if (docSnap.exists()) {
                    //console.log("Document data:", docSnap.data());
                   setStoreUrl(false)
                    console.log(currentEdited)

                } else {
                    console.log("No such URL Found !");
                setStoreUrl(true)
                }
            } catch (error) {
                console.log({error})
            }
            setLoading(false)

        }

        fetchUrl()
        if (currentURL === "https://storetract.com/") {
            //console.log(true)
            setDomainActivated(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domainActivated])



    return (

      <>
          { loading ?
              (<Spinner/>)
              :
              (
                  <>
          <Router>
              <Routes>
                  { domainActivated && <Route exact path="/" element={<Home />} /> }
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

                  {storeUrl ? (<>
                      <Route path="/:shopName" element={<Shop />} />
                      <Route path="/:shopName/cart" element={<Cart />} />
                      <Route path="/:shopName/account" element={<ShopAuth />} />
                      <Route path="/:shopName/:categoryUrl/quick-view" element={<QuickView />} />
                      <Route path="/:shopName/:categoryUrl" element={<ShopCategories />} />
                      <Route path="/:shopName/:categoryUrl/:productUrl" element={<ProductDetails />} />
                      <Route exact path="/:shopName/track-order" element={<TrackOrder />} />
                  </>) : (
                      <>

                          <Route exact path="/" element={<Shop />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/account" element={<ShopAuth />} />
                          <Route path="/:categoryUrl/quick-view" element={<QuickView />} />
                          <Route path="/:categoryUrl" element={<ShopCategories />} />
                          <Route path="/:categoryUrl/:productUrl" element={<ProductDetails />} />
                      </>
                  )}


              </Routes>
          </Router>
          <ToastContainer />
              </>
              ) }

      </>

  );
}

export default App;
