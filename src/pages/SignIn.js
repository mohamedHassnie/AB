import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Swal from "sweetalert2/src/sweetalert2.js";
import emailjs from "@emailjs/browser";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import GoogleButton from "react-google-button";

import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  notification,
} from "antd";

import { isAuthenticated, setAuthentication } from "../helpers/auth";

import signinbg from "../assets/images/SGimg.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
var localStorage = require("local-storage");
const SignIn = () => {
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  const { Title } = Typography;
  const { Content } = Layout;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hist = useHistory();

  const onFinish = async (e) => {
    const data = {
      email: email,
      password: password,
    };
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .post("http://localhost:3011/api/login", data, config)
      .then((response) => {
        console.log("hetha houwa", response);
        setAuthentication(response.data.token, response.data.user);
        hist.push("/dashboard");
        notification.success({ message: response.data.message });
      })
      .catch((response) => {
        notification.error({ message: response.data.message });
      });
  };

  const resetpassword = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .post("http://localhost:3011/api/request/password", { email }, config)
      .then((data) => {
        let templateParams = {
          name: "Mr or Mm",
          Email: email,
          message: `http://localhost:3000/profile/ressetpass/${data.data._id}/${data.data.token}`,
        };

        emailjs
          .send(
            "service_pk0af5q",
            "template_lnq0ocu",
            templateParams,
            "user_TjkkGMETOdkygzIZjLVGS"
          )
          .then(
            (result) => {
              notification.success({ message: "Check you Email" });
            },
            (error) => {
              notification.error({ message: error.text });
            }
          );
      })
      .catch((error) => {
        notification.error({ message: "Email Not Found " });
      });
  };

  const handleLogin = async (googleData) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    console.log("token", googleData.tokenId);

    await axios
      .post(
        "http://localhost:3011/api/google-login",
        { token: googleData.tokenId },
        config
      )
      .then(async (result) => {
        const data = result.json();
        await axios
          .post(
            "http://localhost:3011/api/loginGoogle",
            { email: data.email },
            config
          )
          .then((result) => {
            localStorage.setItem("user", JSON.stringify(result.data.user));
            localStorage.setItem("token", JSON.stringify(result.data.token));
          })
          .catch(() => {
            notification.error({ message: "check your Email " });
          });
      })
      .catch(() => {
        notification.error({ message: "Error Service Google" });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Sign In</h3>
          </div>
          <div className="card-body">
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
                className="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                className="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  SIGN IN
                </Button>
                <br /> <br />
                <GoogleLogin
                  clientId={
                    "383609296631-1rqh8hldbf76j1420idr4l0bhhab1lhr.apps.googleusercontent.com"
                  }
                  buttonText="login with Google"
                  onSuccess={handleLogin}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin>
              </Form.Item>
              <a onClick={resetpassword} style={{ color: "#fff" }}>
                {" "}
                Forget password ?
              </a>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
