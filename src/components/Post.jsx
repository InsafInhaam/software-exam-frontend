import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Post = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name || !description) {
      return toast.error("Please fill all required fields");
    }

    fetch(process.env.REACT_APP_API_URL + "/api/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          setName('');
          setDescription('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="card-body">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="posts"
            role="tabpanel"
            aria-labelledby="posts-tab"
          >
            <div className="form-group">
              <label className="sr-only" htmlFor="message">
                post
              </label>
              <input
                type="text"
                name="name"
                placeholder="Ask your question?"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <textarea
                className="form-control"
                id="message"
                rows={3}
                placeholder="What are you thinking?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="btn-toolbar justify-content-between">
          <div className="btn-group">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => handleSubmit()}
            >
              share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
