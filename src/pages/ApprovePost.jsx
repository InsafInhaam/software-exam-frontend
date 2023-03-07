import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import PostCard from "../components/PostCard";

const ApprovePost = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch(process.env.REACT_APP_API_URL + "/api/getNotApprovedPost", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    }, [data]);
    
  return (
    <>
      <Navbar />
      <div className="container-fluid gedf-wrapper">
        <div className="row justify_center">
          <div className="col-md-6 gedf-main">
            {/* Post /////*/}
            {data?.map((item) => {
              return <PostCard item={item} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ApprovePost