import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [verify, setverify] = useState(false);
  const [role, setrole] = useState("User");
  const [, setError] = useState("");
  let navigate = useNavigate();
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setverify(true);
    setError("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
        role: role,
      });

      setUser({ name: "", email: "", password: "" });
      alert("user Successfully Registered");
      navigate("/login");
      setError(res.data.msg);
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
                    <h1 class="mb-0 h3">Register here </h1>
                  </div>
                  <form onSubmit={registerSubmit} class="mt-4">
                    <div class="form-group mb-4">
                      <label for="username">Your Username</label>
                      <div class="input-group mt-2">
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={onChangeInput}
                          class="form-control"
                          placeholder="Enter username"
                          id="register-name"
                          autofocus
                          required
                        />
                      </div>
                    </div>
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

                    <div class="mb-4">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="remember"
                        />
                        <label
                          class="form-check-label fw-normal mb-0"
                          for="remember"
                        >
                          I agree to the terms and conditions
                        </label>
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
                        Sign up
                      </Button>
                    </div>
                  </form>
                  <Form>
                    <div className="mb-3 mt-2">
                      <Form.Check
                        type="radio"
                        label="User"
                        checked={role === "User"}
                        onChange={(e) => {
                          setrole("User");
                        }}
                      />
                      <Form.Check
                        type="radio"
                        label="Main Admin"
                        checked={role === "mainAdmin"}
                        onChange={(e) => {
                          setrole("mainAdmin");
                        }}
                      />
                      <Form.Check
                        type="radio"
                        label="Sub Admin"
                        checked={role === "subAdmin"}
                        onChange={(e) => {
                          setrole("subAdmin");
                        }}
                      />
                    </div>
                  </Form>
                  <div class="d-flex justify-content-center my-4"></div>
                  <div class="d-flex justify-content-center align-items-center mt-4">
                    <span class="fw-normal">
                      Already have an account?
                      <a href="./login" class="fw-bold">
                        Login here
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

export default Signup;
