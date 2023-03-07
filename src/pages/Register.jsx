import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Register = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!name || !email || !password) {
      return toast.error("Please fill all required fields");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return toast.error("Invalid email address");
    } else if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    } else if (!specialChars.test(password)) {
      return toast.error("Password must have special characters");
    }

    fetch(process.env.REACT_APP_API_URL + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          history("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem", height:"100%" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          />
                          <span className="h1 fw-bold mb-0">Insaf Inhaam</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="name"
                            className="form-control form-control-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label className="form-label" htmlFor="name">
                            Name
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={() => handleSubmit()}
                          >
                            Signup
                          </button>
                        </div>
                        
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Already have an account?&nbsp;
                          <a href="/login" style={{ color: "#393f81" }}>
                            Login here
                          </a>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
