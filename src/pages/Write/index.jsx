import { useState, useContext } from "react";
import { axiosQuery } from "../../api";
import "./write.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Write() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [formData, setFormData] = useState({});
  const [image, setImage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosQuery.post(
        "/posts",
        { username: user.username, ...formData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //window.location.replace("/post/"+res.data._id)
      res && navigate("/", { replace: true });
    } catch (err) {
      // console.log(err.response.data);
    }
  };
  const handleInputChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setFormData((initial) => ({ ...initial, photo: file }));
      setImage(URL.createObjectURL(file));
      return;
    }
    setFormData((initial) => ({
      ...initial,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="write">
      {image && <img className="writeImg" src={image} alt="" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="photo">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={handleInputChange}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            name="desc"
            placeholder="Tell your story...."
            type="text"
            className="writeInput writeText"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
