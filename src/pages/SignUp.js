import React, { useState } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  notification,
} from "antd";

import Swal from "sweetalert2";
import "./add_patient.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
const { Title } = Typography;
const { Content } = Layout;

const SignUp = () => {
  const [UserName, setUserName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [Nationality, setNationality] = useState("");
  const [Date_of_birth, setDate_of_birth] = useState("");
  const [location, setLocation] = useState("");

  const [Gender, setGender] = useState("");

  const [selected, setSelected] = useState("");

  const onFinish = async (values) => {
    console.log("Success:", values);
    const data = {
      UserName: UserName,
      LastName: LastName,
      email: email,
      phone: phone,
      Nationality: Nationality,
      Date_of_birth: Date_of_birth,
      Gender: Gender,
      location: location,
      Type_Analyse: selected,
    };
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .post("http://localhost:3011/api/signUpPatient", data, config)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "message",
          text: response.data.successMessage,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "message",
          text: "check your data",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({ message: "check your data " });
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
  const onChangeGender = (event) => {
    setGender(event.target.value);
  };
  return (
    <>
      <div>
        (
        <div className="container register">
          <div className="row">
            <div className="col-md-3 register-left">
              <img
                src="https://abiomix.com/front/images/Illustration-2.svg"
                alt=""
                style={{ width: "150%" }}
              />

              {/* <p>You are 30 seconds away from earning your own money!</p> */}
              {/* <input type="submit" name defaultValue="Login" /> */}
              <br />
              <br />
              {/* <button type="submit" className="btnSubmit">
                <Link to="./sign-in">Sig_Up Patient</Link>
              </button> */}

              <br />
              <br />
              <br />
              {/* <h3 style={{ fontFamily: "initial" }}>Welcome </h3> */}
            </div>
            <div className="col-md-9 register-right">
              <ul
                className="nav nav-tabs nav-justified"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Patient
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Analyse
                  </a>
                </li>
              </ul>
              <Form onFinish={onFinish}>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <h3 className="register-heading">Registre_Patient</h3>
                    <div className="row register-form">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            placeholder="UserName"
                            type="texte"
                            onChange={(e) => setUserName(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="LastName"
                            type="texte"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Location"
                            type="texte"
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Nationality"
                            type="texte"
                            onChange={(e) => setNationality(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="maxl" onChange={onChangeGender}>
                            <label className="radio inline">
                              <input type="radio" name="gender" value="femme" />
                              <span> female </span>
                            </label>
                            <label className="radio inline">
                              <input
                                handleChangeGender
                                type="radio"
                                name="gender"
                                value="Homme"
                              />
                              <span>Male </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="email"
                            placeholder="Your Email *"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Your Phone *"
                            type="tel"
                            onChange={(e) => setphone(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <select
                            className="form-control"
                            value={selected}
                            onChange={handleChange}
                          >
                            a<option value="Swab">Swab</option>
                            <option value="Spit">Spit</option>
                            <option value="Blood">Blood</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Date_of_birth"
                            type="date"
                            onChange={(e) => setDate_of_birth(e.target.value)}
                          />
                        </div>
                        <input
                          type="submit"
                          className="btnRegister"
                          defaultValue="Register"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade show"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    {/* <h3 className="register-heading">Apply as a Hirer</h3> */}
                    <div className="row register-form">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name *"
                            defaultValue
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name *"
                            defaultValue
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            maxLength={10}
                            minLength={10}
                            className="form-control"
                            placeholder="Phone *"
                            defaultValue
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="submit"
                          className="btnRegister"
                          defaultValue="Register"
                        />
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </Form>
            </div>
          </div>
        </div>
        );
      </div>
    </>
  );
};
export default SignUp;
