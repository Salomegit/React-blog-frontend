import { useEffect, useState, useContext } from "react";
import { axiosQuery, reactConfig } from "../../api";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./singlePost.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export default function SinglePost() {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosQuery.get("/posts/" + path, {
        username: user.username,
      });
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path, user]);
  const handleDelete = async () => {
    try {
      const res = await axiosQuery.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      res && navigate("/", { replace: true });
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      const res = await axiosQuery.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      // window.location.reload();
      res && setUpdateMode(false);
    } catch (err) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={`${reactConfig.BASED_URL}/${post.photo}`} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
