import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topBar.css";
export default function TopBar() {
  const navigate=useNavigate();

  const {user,dispatch}= useContext(Context)
  const handleLogout =()=>{
    dispatch({type:"LOGOUT"})
    navigate("/login",{replace:true});
  }
  return (
    
    <div className="top">
      <div className="topleft">
        <a href="https://twitter.com/seilomegithinji"><i className="topicon fa-brands fa-twitter"></i></a>
        <a href="https://pinterest.com/githinjisal"><i className="topicon fa-brands fa-pinterest"></i></a>
       <a href="https://instagram.com/sallygithinji"><i className="topicon fa-brands fa-instagram"></i></a>
      </div>
      <div className="topcenter">
        <ul className="toplist">
          <li className="toplistitem"><Link className="link" to="/" style={{textDecoration:"none",color:"inherit"}}>HOME</Link></li>
          {/* <li className="toplistitem"><Link to={'/about'}>ABOUT</Link></li> */}
          {/* <li className="toplistitem"><Link to={'/contact'}>CONTACT</Link></li> */}
          <li className="toplistitem"><Link to={'/write'}>WRITE</Link></li>
          <li className="toplistitem" onClick={handleLogout}>{user && "LOGOUT"}</li>
        </ul>
      </div>
      <div className="topright">
        { 
        user ? (
          <Link to="/settings">
          <img
          className="topimage"
          src={user.profilepic?user.profilepic:"/woman.jpg"}
          alt=""
          />
          </Link>
        ):(
          <ul className="toplist">
            <li className="toplistitem"><Link className="link" to="/login">LOGIN</Link></li>
            <li className="toplistitem"><Link className="link" to="/register">REGISTER</Link></li>
        
        </ul>
        )
}
        <i className="searchicon fa-brands fa-searchengin"></i>
      </div>
    </div>
  );
}
