import './App.css';
import SideMenu from './pages/Dashboard';
import Login from './pages/Login';
import PaymentPage from './pages/PaymentPage';
import Registration from './pages/Register';
import { NavLink, Route, BrowserRouter, Routes } from "react-router-dom";
import About from './components/About';
import { useSelector } from "react-redux";
import Contact from './components/Contact';
import Profile from './components/Profile';
import Home from './components/Home';
// import SideNavigation from './components/SideNavigation';
import Authguard from './components/Authgaurd/Authguard';
import AppWrapper from './components/Authgaurd/AppWrapper';
import SideNavigation from './components/SideNavigation';
import LoginAuth from './components/Authgaurd/LoginAuth';
function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Authguard isAuthenticated={isLoggedIn} />}>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Route>
          <Route element={<LoginAuth isAuthenticated={!isLoggedIn} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
