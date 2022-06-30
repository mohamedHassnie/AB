import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Swal from "sweetalert2/src/sweetalert2.js";
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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Sign In</h3>
            <div className="d-flex justify-content-end social_icon">
              <span>
                <i className="fab fa-google-plus-square"></i>
              </span>
            </div>
          </div>
          <div className="card-body">
            <Form
              style={{ width: "90%" }}
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
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
