import { Fragment, useEffect, useState } from "react";
import { axiosQuery } from "../../api";
import Header from "../../Components/Header";
import Posts from "../../Components/Posts";
import Sidebar from "../../Components/Sidebar";
import { useLocation } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosQuery.get("/posts"+search);
        setPosts(res.data);
      } catch (error) {
      //  console.log(error.response);
      }
    };
    fetchPosts();
  },[search] );
  return (
    <Fragment>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default Home;
