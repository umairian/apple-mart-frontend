import React, { useState } from "react";
import { loginUser } from "../../services/UserManagement";
import { showToast } from "../../utils/showToast";
import { loginSuccess } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const result = await loginUser({ email, password });
    if (!email || !password) {
      showToast("Please fill in all fields", "error", true);
      return;
    }

    setFormData({
      email: "",
      password: "",
      rememberMe: false,
    });
    if (result.success) {
      const { token } = result.data;
      localStorage.setItem("token", token);
      dispatch(loginSuccess(token, result.data.user.id));
      showToast(result.data.message, "success", true);
      navigate("/");
      setShowModal(false);
    } else {
      showToast("invalid credentails", "error", true);
    }

    // Optionally, you can show a success message or redirect the user
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary ms-auto"
        onClick={() => setShowModal(true)}
      >
        <span className="fa fa-sign-in me-1"></span> Login
      </button>

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Login
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-primary w-100 mt-5"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
