import Sidebar from "../../Components/Sidebar";
import SinglePost from "../../Components/SinglePost";
import "./single.css";

export default function Single() {
  return (
    <div className="single">
      {/*post*/}
      <Sidebar />
      <SinglePost />
    </div>
  );
}
