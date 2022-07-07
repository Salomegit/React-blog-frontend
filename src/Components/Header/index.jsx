import "./header.css";

export default function Header() {
  return <div className="header">
    <div className="headerTitles">
      <span className="headerTitlesm">React & Node</span>
      <span className="headerTitlelg">Blog</span>
    </div>
    <img className="headerImg" src="/woman.jpg" alt="" />
  </div>;
}
