import "./index.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { authActions } from "../../store/redux/authSlice";
import { profileNameActions } from "../../store/redux/userName";
import { dispatch } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import Registration from "../Register";
import { useState } from "react";
function Login(props) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(true);

  const navigate = useNavigate();
  console.log("isLogged", isLoggedIn);
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email address.")
      .required("Please enter email address."),
    password: Yup.string()
      .min(8, "Password should be minimum length of 8 characters.")
      .max(15, "Password should be maximum length of 15 characters.")
      .required("Please enter password.")
      .matches(/[0-9]/, "Password requires  at least one number")
      .matches(/[^\w]/, "Password requires  at least one special character"),
  });
  const handleSubmitClick = async (e) => {
    let result = await getResponse();
    async function getResponse() {
      const response = await axios
        .get("http://localhost:3000/users")
        .then((res) => {
          let data = res.data.filter(
            (user) => user.email === e.email && user.password === e.password
          );

          console.log(data[0]);
          dispatch(profileNameActions.profileName(data[0].firstname))

          if (data.length) {
            localStorage.setItem("user", JSON.stringify(data[0]));

            alert("succesful");
            dispatch(authActions.login());
            navigate("/payment");
          } else {
            alert("Invalid USername or passsword");
          }
          return data;
        })
        .catch((e) => {
          console.log(e);
        });
      return response;
    }
  };

  return (
    <div className={` ${modal ? "login-container" : " main-container"}`}>
      <div className="card">
        {modal ? (
          <div>
            <div>
              <h2 className="login-text">Hey, Welcome Buddy!</h2>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                handleSubmitClick(values);
              }}
            >
              {(FormikProps) => {
                // console.log("data", FormikProps);
                return (
                  <Form onSubmit={FormikProps.handleSubmit} className="form">
                    <div className="container-input">
                      <div
                        className={`input-group  ${
                          FormikProps.errors.email &&
                          FormikProps.touched.email &&
                          "input-error"
                        }`}
                      >
                        <label htmlFor="email">email</label>
                        <input
                          id="11"
                          type="text"
                          value={FormikProps.values.email}
                          name="email"
                          onChange={FormikProps.handleChange}
                          onBlur={FormikProps.handleBlur}
                        />
                        <p>
                          {FormikProps.touched.email &&
                          FormikProps.errors.email ? (
                            <p className="error-msg">
                              {FormikProps.errors.email}
                            </p>
                          ) : null}
                        </p>
                      </div>
                      <div
                        className={`input-group  ${
                          FormikProps.errors.password &&
                          FormikProps.touched.password &&
                          "input-error"
                        }`}
                      >
                        <label htmlFor="password">password</label>
                        <input
                          id="21"
                          type="password"
                          value={FormikProps.values.password}
                          name="password"
                          onChange={FormikProps.handleChange}
                          onBlur={FormikProps.handleBlur}
                        />
                        <p>
                          {" "}
                          {FormikProps.touched.password &&
                          FormikProps.errors.password ? (
                            <p className="error-msg">
                              {FormikProps.errors.password}
                            </p>
                          ) : null}
                        </p>
                      </div>

                      <div className="login-btn">
                        <button type="submit" className="primary">
                          Log In
                        </button>
                      </div>
                      <div>
                        <div>
                          <p
                            className="register-link"
                            onClick={() => {
                              setModal(false);
                            }}
                          >
                            Don't have an account yet ?{" "}
                            <span className="signup-text"> Sign up </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        ) : (
          <div>
            <Registration
              onClick={() => {
                setModal(true);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
