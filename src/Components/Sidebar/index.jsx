import { useEffect, useState } from "react";
import { axiosQuery } from "../../api";
import { Link } from "react-router-dom";
import "./sidebar.css";
export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axiosQuery.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className="topImgg" src="./book.jpg" alt="" />

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
          veritatis rem nemo nam?{" "}
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link"key={c.name}>
              <li className="sidebarListItem" >
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebaricon fa-brands fa-twitter"></i>
          <i className="sidebaricon fa-brands fa-facebook-f"> </i>
          <i className="sidebaricon fa-brands fa-pinterest"></i>
          <i className="sidebaricon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}
