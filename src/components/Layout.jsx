import { Link, Outlet } from "react-router-dom";
import Nav from "./Nav";
import ListeSeries from "../pages/ListeSeries";
import './Layout.css';



const Layout = () => {
    return (
        <div>
            <div className="layout">
                <div className="title">
                    <Link to='' className="nav-link">TvTracker</Link>
                </div>
                <div className="nav">
                    <Nav
                        links={[
                            {name: "Trending", url: "trending"},
                            {name: "Favoris", url: "favoris"},
                            {name: "Profil", url: "profil"},
                            {name: "Recherche", url: "recherche"},
                        ]}
                    />
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
};

export default Layout;