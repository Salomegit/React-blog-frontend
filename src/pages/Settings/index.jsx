import { useContext, useState } from "react";
import { axiosQuery } from "../../api";
import Sidebar from "../../Components/Sidebar";
import { Context } from "../../context/Context";
import "./settings.css";

export default function Settings() {
  const { user } = useContext(Context);
  const [formData, setFormData] = useState({ ...user });
  const [success, setSuccess] = useState(false);
  // const [image, setImage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosQuery.put(
        `/users/${user._id}`,
        { userId: user._id, ...formData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      res.data &&
        setSuccess(true) &&
        localStorage.setItem("user", JSON.stringify(res.data));
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      // console.log(err.response.data);
    }
  };
  const handleInputChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setFormData((initial) => ({ ...initial, photo: file }));
      // setImage(URL.createObjectURL(file));
      return;
    }
    setFormData((initial) => ({
      ...initial,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          {/* <span className="settingsDeleteTitle">Delete Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={user.profilePic?user.profilePic:"/woman.jpg"} alt="" />
          </div>
          <label htmlFor="photo">
            <i className="settingsPPIcon far fa-user-circle"></i>
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            style={{ display: "none" }}
            onChange={(e) => handleInputChange(e)}
          />

          <label>UserName</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder={user.username}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder={user.email}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {success && (
            <span
              style={{
                color: "green",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              Profile has been updated
            </span>
          )}

          <button className="settingsSubmit" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
