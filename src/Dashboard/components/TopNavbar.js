import React from "react";
import {Button ,Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import AvatarDefault from "../../assets/images/avatardefault_92824.png";
import {getAuth} from "firebase/auth";

const TopNavbar = ({storeLogoUrl}) => {

    const auth = getAuth()
    const navigate = useNavigate()

    const logOut = () => {
        auth.signOut().then(
            navigate('/login')
        )
    }
    const darkMode = () => {
        console.log("Dark Mode Loading...")
    }

    const handleSidebar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector('#offcanvas_aside').classList.toggle('show')
        document.body.classList.toggle('offcanvas-active');
        document.querySelector('.screen-overlay').classList.toggle('show')

    }

    return(
        <>
            <header className="main-header navbar">
                <div className="col-search">
                    <Form className="searchForm">
                        <div className="input-group">
                            <input list="search_terms" type="text" className="form-control" placeholder="Search term"/>
                            <Button className="btn btn-md btn-outline" type="button"><i className="fas fa-search"/> </Button>
                        </div>
                        <datalist id="search_terms">
                            <option value="Products"/>
                            <option value="New Orders"/>
                            <option value="Apple iPhone"/>
                            <option value="Ahmed Hassan"/>
                        </datalist>
                    </Form>
                </div>
                <div className="col-nav">
                    <Button className="btn btn-icon btn-mobile me-auto" onClick={handleSidebar} data-trigger="#offcanvas_aside">  <i className="fas fa-bars"></i></Button>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to="#" className="nav-link btn-icon" onClick={darkMode} title="Dark mode" > <i
                                className="fas fa-moon"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link btn-icon"  title="notifications" > <i
                                className="fas fa-bell"></i></Link>
                        </li>
                        <li className="dropdown nav-item">
                            <Link to="#" className="nav-link btn-icon" data-bs-toggle="dropdown" >
                                <img src={`${storeLogoUrl ? storeLogoUrl : AvatarDefault}`} className="img-xs rounded-circle" alt="User"/></Link>
                            <div className="dropdown-menu dropdown-menu-end">
                                <Link to="/dashboard/settings/profile" className="dropdown-item">My Profile</Link>
                                <Link to="/dashboard/settings/store" className="dropdown-item">Settings</Link>
                                <Button  onClick={logOut} className="dropdown-item text-danger"> Log out</Button>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default TopNavbar
