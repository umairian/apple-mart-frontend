import React, { useState } from "react";
import { signUpUser } from "../../services/UserManagement";
import { showToast } from "../../utils/showToast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    checked: false,
  });

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;
    if (!username || !email || !password) {
      showToast("Please fill in all fields", "error", true);
      return;
    }
    const result = await signUpUser({ username, email, password });

    setFormData({
      username: "",
      email: "",
      password: "",
      checked: false,
    });
    if (result.success) {
      const { token } = result.data;
      localStorage.setItem("token", token);
      dispatch(loginSuccess(token, result.data.user.id));
      showToast(result.data.message, "success", true);
      setShowModal(false);
      navigate("/products");
    } else {
      showToast("User already exists", "error", true);
    }
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
        className="btn btn-outline-primary ms-2"
        onClick={() => setShowModal(true)}
      >
        <span className="fa fa-user-plus me-1"></span> Register
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
                  Register
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
                    <label htmlFor="exampleInput" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInput"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
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
                      name="checked"
                      checked={formData.checked}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-primary w-100 mt-5"
                  >
                    Register
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

export default Signup;
