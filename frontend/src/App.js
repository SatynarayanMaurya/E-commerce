import Navbar from "./Components/Navbar";
import {Routes, Route} from  "react-router-dom"
import Homepage from "./Pages/Homepage/Homepage";
import LoginPage from "./Pages/Auth/LoginPage";
import SignupPage from "./Pages/Auth/SignupPage";
import OtpPage from "./Pages/Auth/OtpPage";
import MensCategory from "./Pages/Homepage/MensCategory";
import AllCategory from "./Pages/Homepage/AllCategory";
import AdminDashboard from "./Pages/Admin Page/AdminDashboard";
import CategoryPage from "./Pages/Admin Page/CategoryPage";
import Products from "./Pages/Admin Page/Products";
import Orders from "./Pages/Admin Page/Orders";
import AddProduct from "./Pages/Admin Page/AddProducts/AddProduct";
import PrivateRoute from "./Routes/PrivateRoute";
import ProductDetails from "./Pages/Product buy/ProductDetails";
import CheckoutPage from "./Pages/Product buy/CheckoutPage";
import Cart from "./Pages/Product buy/Cart";
import Profile from "./Pages/User/Profile";
import UserDashboard from "./Pages/User/UserDashboard";
import MyOrders from "./Pages/User/MyOrders";
import Logout from "./Pages/User/Logout";
import AdminLogout from "./Pages/Admin Page/AdminLogout";
import OpenRoute from "./Routes/OpenRoute";
function App() {
  return (
    <div>

          <Navbar/>

         <div className="mt-[64px]">

            <Routes>



                <Route path="/otp" element={<OtpPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>

                <Route path="/" element={<Homepage/>}>

                    <Route path="/" element={<AllCategory/>}/>
                    <Route path="/:categoryName" element={<MensCategory/>}/>
                
                
                </Route>

                  {/* Admin Page  */}
                <Route path="/dashboard" element={  <PrivateRoute>
                                                      <AdminDashboard/>
                                                    </PrivateRoute>
                                                  }>
                  <Route path="/dashboard/products" element={<Products/>}/>
                  <Route path="/dashboard/products/add-product" element={<AddProduct/>}/>
                  <Route path="/dashboard/category" element={<CategoryPage/>}/>
                  <Route path="/dashboard/orders" element={<Orders/>}/>
                  <Route path="/dashboard/logout" element={<AdminLogout />}/>
                </Route>


                <Route path="/product/:productId" element={<ProductDetails/>}/>
                <Route path="/buy-Product/checkout" element={<CheckoutPage/>}/>
                <Route path="/cart" element={<Cart/>}/>

                <Route path="/profile" element={
                                                    <OpenRoute>
                                                        <Profile/>
                                                    </OpenRoute>
                                                  } >
                        
                        <Route path="/profile" element={
                                                          <OpenRoute>
                                                           <UserDashboard/>
                                                       </OpenRoute>
                                                          }/>
                        <Route path="/profile/my-orders" element={<MyOrders/>}/>
                        <Route path="/profile/logout" element={<Logout/>}/>
                
                </Route>
               

            </Routes>


         </div>
    </div>
  );
}

export default App;
