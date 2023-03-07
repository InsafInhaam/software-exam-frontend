import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import moment from "moment";
import { useSelector } from "react-redux";

const PostCard = ({ item }) => {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/comment/" + item.id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setcomments(result);
      });
  }, [comments]);

  const deletpost = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/api/deletePost/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
      });
  };

  const approvePost = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/api/approvePost/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
      });
  };

  const rejectPost = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/api/rejectPost/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
      });
  };

  const createComment = (comment, postId) => {
    fetch(process.env.REACT_APP_API_URL + "/api/createComment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        comment,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
      });
    setComment("");
  };

  return (
    <>
      <div className="card gedf-card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="ml-2">
                <div className="h5 m-0">{item.user.name}</div>
              </div>
            </div>
            <div>
              {item.postedBy == user.id ? (
                <i
                  className="bi bi-trash3-fill mr-2"
                  onClick={() => deletpost(item.id)}
                  style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
                ></i>
              ): (<></>)}

              {user.userType == 1 && item.approved == 0 ? (
                <button
                  className="btn btn-warning  mr-2"
                  type="submit"
                  onClick={() => approvePost(item.id)}
                >
                  Approve
                </button>
              ) : (
                <></>
              )}

              {user.userType == 1 && item.approved == 1 ? (
                <button
                  className="btn btn-danger "
                  type="submit"
                  onClick={() => rejectPost(item.id)}
                >
                  Reject
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="text-muted h7 mb-2">
            <i className="fa fa-clock-o" />
            {moment(item.createdAt).startOf("second").fromNow()}
          </div>
          <a className="card-link" href="#">
            <h5 className="card-title">{item.name}</h5>
          </a>
          <p className="card-text">{item.description}</p>
        </div>
        <div className="card-footer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createComment(e.target[0].value, item.id);
            }}
            className="d-flex align-items-center justify-content-center"
          >
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-100 border-0 p-2 mr-3 rounded input-post"
              placeholder="Add a comment..."
            />
            <button className="btn btn-primary btn-ig" type="submit">
              Post
            </button>
          </form>
          {comments.length > 0 ? (
            <div className="pt-3">
              <span className="text-muted">
                View all {comments.length} comments
              </span>

              <div>
                {comments.map((comment) => {
                  return (
                    <div
                      className="d-flex align-items-center justify-content-between"
                      key={comment.id}
                    >
                      <div>
                        <strong className="d-block">{comment.user.name}</strong>
                        <span>{comment.comment}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default PostCard;
