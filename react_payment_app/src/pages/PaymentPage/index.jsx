import "./index.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [FiledMessage, setFiledMessage] = useState(false);
  const [filedResult, setfiledResult] = useState('')

  const validate = Yup.object({
    firstname: Yup.string()
      .required("firstname is required")
      .max(50, "firstname should be maximum length of 50 characters."),
    dropdown: Yup.string().required("select at least one option"),
    email: Yup.string().email("Please enter valid email address"),
    dob: Yup.string().required("date is required"),
    cardnumber: Yup.string()
      .when("dropdown", {
        is: (dropdown) => dropdown === "Amex",
        then: Yup.string()
          .min(16, "minimum 16 digit required")
          .max(16, "miximum 16 digit required"),
      })
      .min(15, "minimum 15 digit required.")
      .max(15, "maximum 15 digit required.")
      .required("card number is required"),
  });

  useEffect(() => {
    getDropdowndetails();
  }, []);

  // const getResponse = (value) => {
  //   Object.entries(value).map(item => {
  //     return console.log(item)
  //   })
  //   for (const key in value) {
  //     console.log(key);
  //   }

  //   return value;
  // };

  const getDropdowndetails = async () => {
    const response = await axios
      .get("http://www.mocky.io/v2/5d145fa22f0000ff3ec4f030")
      .then((res) => {
        setUsers(res.data.cardTypes);
      })
      .catch(async (e) => {
        console.log(e);
      });
    return response;
  };

  const handleSubmitClick = (e) => {
    // navigate("/profile");
    console.log(e);
    const response = axios
      .post("http://www.mocky.io/v2/5d8de422310000b19d2b517a", e)
      .then((res) => {
        setShowMessage(true);
        // getResponse(res.data);
        console.log(res.data);
        return setResult(res.data);
      })
      .catch(async (e) => {
        callApiagain();
      });
    return response;
  };

  const callApiagain = async () => {
    const fail = await axios
      .get("http://www.mocky.io/v2/5d8de441310000a2612b517c")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        setShowMessage(true);
        setFiledMessage(true)
        setfiledResult(e.response.data.responseMessage);
      });
    return fail;
  };

  return (
    <div>
      {/* <SideNavigation> */}
      <div className="payment-card">
        {/* <div>
          <h2>Payment</h2>
        </div> */}
        {!showMessage && (
          <div className="payment-header">
            <div className="product-details">
              <p>Product: ABCD</p>
              <p>Date : 14/12/2022 </p>
              <p>Amount : 455 USD</p>
            </div>
            <div>
              <Formik
                initialValues={{
                  firstname: "",
                  email: "",
                  dob: "",
                  cardnumber: "",
                  dropdown: "",
                }}
                validationSchema={validate}
                onSubmit={(values) => {
                  handleSubmitClick(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <div className="payment-form">
                    <Form onSubmit={handleSubmit}>
                      <div className="input-group ">
                        <label htmlFor="firstname">Name</label>
                        <input
                          type="text"
                          value={values.firstname}
                          name="firstname"
                          onChange={handleChange}
                          id="firstname"
                          onBlur={handleBlur}
                        />
                        <p className="errormessage">
                          {errors.firstname && touched.firstname ? (
                            <div>{errors.firstname}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="input-group ">
                        <label htmlFor="dropdown">Card Types</label>
                        <div className="select">
                          <select
                            className="dropdown"
                            name="dropdown"
                            onChange={handleChange}
                            defaultValue="select one"
                            onBlur={handleBlur}
                          >
                            <option className="placeholder" value="select 1">
                              Select Card Types
                            </option>
                            {users?.map((item) => (
                              <option
                                key={item.id}
                                value={values.value}
                                id={item.id}
                              >
                                {item.value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className="errormessage">
                          {errors.dropdown && touched.dropdown ? (
                            <div>{errors.dropdown}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="input-group ">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          value={values.email}
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="email"
                        />
                        <p className="errormessage">
                          {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="input-group ">
                        <label htmlFor="dob">Expiry</label>
                        <input
                          type="month"
                          placeholder="MM/YY"
                          value={values.dob}
                          name="dob"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="dob"
                        />
                        <p className="errormessage">
                          {errors.dob && touched.dob ? (
                            <div>{errors.dob}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="input-group ">
                        <label htmlFor="cardnumber">Card Number</label>
                        <input
                          type="text"
                          value={values.cardnumber}
                          name="cardnumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="cardnumber"
                        />
                        <p className="errormessage">
                          {errors.cardnumber && touched.cardnumber ? (
                            <div>{errors.cardnumber}</div>
                          ) : null}
                        </p>
                      </div>

                      <button className="primary confirm-pay-btn" type="submit">
                        Confirm Payment
                      </button>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        )}
        {showMessage && (
          <div className="display-message">
            <div className="product-info">
              <p>Product: ABCD</p>
              <p>Date : 14/12/2022 </p>
              <p>Amount : 455 USD</p>
            </div>
            {/* <p className="success-message">
              invoiceNo : <span>{result.invoiceNo}</span>
            </p> */}
            <p className="success-message">{result.responseMessage}</p>
          </div>
        )} 
         {FiledMessage && showMessage && (
          <div className="display-message">
            <p className="failed-message">{filedResult}</p>
          </div>
        )} 
      </div>
      {/* </SideNavigation> */}
    </div>
  );
}
