import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function Login({ setIsLogin }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [, setError] = useState("");
  const [verify, setverify] = useState(false);
  let navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setverify(true);
    setError("");
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ email: "", password: "" });
      alert("user Successfully Login");
      localStorage.setItem("tokenStore", res.data.token);
      localStorage.setItem("name", res.data.user);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");

      setIsLogin(true);
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <>
      <main style={{ marginTop: "4rem" }}>
        <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
          <div class="" style={{ margin: "0 auto" }}>
            <div class="row justify-content-center form-bg-image">
              <div class="col-12 d-flex align-items-center justify-content-center">
                <div class="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div class="text-center text-md-center mb-4 mt-md-0">
                    <h1 class="mb-0 h3">Login here </h1>
                  </div>
                  <form onSubmit={loginSubmit} class="mt-4">
                    <div class="form-group mb-4">
                      <label for="email">Your Email</label>
                      <div class="input-group mt-2">
                        <input
                          type="email"
                          name="email"
                          id="register-email"
                          placeholder="Enter Email"
                          value={user.email}
                          onChange={onChangeInput}
                          class="form-control"
                          autofocus
                          required
                        />
                      </div>
                    </div>
                    <div class="form-group mb-4">
                      <label for="password">Your Password</label>
                      <div class="input-group mt-2">
                        <input
                          type="password"
                          name="password"
                          class="form-control"
                          id="register-password"
                          placeholder="Enter Password"
                          value={user.password}
                          autoComplete="true"
                          onChange={onChangeInput}
                          autofocus
                          required
                        />
                      </div>
                    </div>

                    <div class="d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={!verify}
                        style={{
                          color: "white",
                          borderRadius: "5px",
                          border: "none",
                          padding: " .5rem",
                        }}
                      >
                        Login
                      </Button>
                    </div>
                  </form>

                  <div class="d-flex justify-content-center my-4"></div>
                  <div class="d-flex justify-content-center align-items-center mt-4">
                    <span class="fw-normal">
                      Don't have an account?{" "}
                      <a href="/" class="fw-bold">
                        Register here
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
