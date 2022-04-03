import { NavLink } from "react-router-dom";
import "./Menu.scss";
import logo from "../../assets/img/logo.png";

const Menu = () => {
  return (
    <>
      <header className="menu">
        <i className="iconhome fas fa-home"></i>
        <img className="logo" src={logo} alt="" />
        <div className="navhome">
          <NavLink to="/ProductList">Products</NavLink>
        </div>
        <div className="statistics">
          <NavLink to="/statistics">Statistics</NavLink>
        </div>

        <div className="actions">Logout</div>
      </header>
    </>
  );
};

export default Menu;
