import "./index.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Registration({ onClick }) {
  const validate = Yup.object({
    firstname: Yup.string().required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    email: Yup.string()
      .email("Please enter valid email address")
      .required("email is Required"),
    dob: Yup.date()
      .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
      .required("date is Required"),
    password: Yup.string()
      .min(8, "Password should be minimum length of 8 characters.")
      .max(15, "Password should be maximum length of 15 characters.")
      .required("Please enter password.")
      .matches(/[0-9]/, "Password requires at least one number")
      .matches(/[^\w]/, "Password requires at least one special character"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("confirm password is required"),
  });

  const handleSubmitClick = (e) => {
    const response = axios
      .post("http://localhost:3000/users", e)
      .then((res) => {
        console.log(res.data);
        alert("hurry you are Succesfully Registerd !");
      })
      .catch((e) => {
        console.log(e);
      });
    return response;
  };

  return (
    <div className="register-container">
      <div>
        <div>
          <h2 className="header-text">Registration</h2>
        </div>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            dob: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            handleSubmitClick(values);
            resetForm({ values: "" });
          }}
        >
          {(FormikProps) => {
            console.log(FormikProps);
            return (
              <div className="register-details">
                <Form onSubmit={FormikProps.handleSubmit}>
                  <div
                    className={`input-group ${
                      FormikProps.errors.firstname &&
                      FormikProps.touched.firstname &&
                      "error"
                    }`}
                  >
                    <label htmlFor="firstname">firstname</label>
                    <input
                      type="text"
                      value={FormikProps.values.firstname}
                      name="firstname"
                      onChange={FormikProps.handleChange}
                      id="firstname"
                      onBlur={FormikProps.onBlur}
                    />
                    <p>
                      {FormikProps.touched.firstname &&
                      FormikProps.errors.firstname ? (
                        <p className="error-msg">
                          {FormikProps.errors.firstname}
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    className={`input-group  ${
                      FormikProps.touched.lastname &&
                      FormikProps.errors.lastname &&
                      "error"
                    }`}
                  >
                    <label htmlFor="lastname">lastname</label>
                    <input
                      type="text"
                      value={FormikProps.values.lastname}
                      name="lastname"
                      onChange={FormikProps.handleChange}
                      onBlur={FormikProps.onBlur}
                      id="lastname"
                    />
                    <p>
                      {FormikProps.touched.lastname &&
                      FormikProps.errors.lastname ? (
                        <p className="error-msg">
                          {FormikProps.errors.lastname}
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    className={`input-group  ${
                      FormikProps.touched.email &&
                      FormikProps.errors.email &&
                      "error"
                    }`}
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      value={FormikProps.values.email}
                      name="email"
                      onChange={FormikProps.handleChange}
                      onBlur={FormikProps.onBlur}
                      id="email"
                    />
                    <p className="errormessage">
                      {FormikProps.touched.email && FormikProps.errors.email ? (
                        <p className="error-msg">{FormikProps.errors.email}</p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    className={`input-group  ${
                      FormikProps.touched.dob &&
                      FormikProps.errors.dob &&
                      "error"
                    }`}
                  >
                    <label htmlFor="dob">DOB</label>
                    <input
                      type="date"
                      value={FormikProps.values.dob}
                      name="dob"
                      onChange={FormikProps.handleChange}
                      onBlur={FormikProps.onBlur}
                      id="dob"
                    />
                    <p className="error-msg">
                      {FormikProps.touched.dob && FormikProps.errors.dob ? (
                        <p>{FormikProps.errors.dob}</p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    className={`input-group  ${
                      FormikProps.touched.password &&
                      FormikProps.errors.password &&
                      "error"
                    }`}
                  >
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      value={FormikProps.values.password}
                      name="password"
                      onChange={FormikProps.handleChange}
                      onBlur={FormikProps.onBlur}
                      id="password"
                    />
                    <p className="error-msg">
                      {FormikProps.touched.password &&
                      FormikProps.errors.password ? (
                        <div>{FormikProps.errors.password}</div>
                      ) : null}
                    </p>
                  </div>
                  <div
                    className={`input-group  ${
                      FormikProps.touched.passwordConfirmation &&
                      FormikProps.errors.passwordConfirmation &&
                      "error"
                    }`}
                  >
                    <label htmlFor="password">confirm password</label>
                    <input
                      type="password"
                      value={FormikProps.values.passwordConfirmation}
                      name="passwordConfirmation"
                      onChange={FormikProps.handleChange}
                      onBlur={FormikProps.onBlur}
                      id="passwordConfirmation"
                    />
                    <p className="error-msg">
                      {FormikProps.touched.passwordConfirmation &&
                      FormikProps.errors.passwordConfirmation ? (
                        <p>{FormikProps.errors.passwordConfirmation}</p>
                      ) : null}
                    </p>
                  </div>
                  <button className="primary" type="submit">
                    Register
                  </button>

                  <div>
                    <div onClick={onClick}>
                      <p className="register-link">
                        Already register ?
                        <span className="signup-text"> log-in </span>
                      </p>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
