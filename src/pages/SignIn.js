import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      .post("http://localhost:3010/api/login", data, config)
      .then((response) => {
        console.log("hetha houwa", response);
        setAuthentication(response.data.token, response.data.user);
        hist.push("/dashboard");
        notification.success({ message: response.data.message });
      })
      .catch(() => {
        notification.error({ message: "check your Email or Password" });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout className="layout-default">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 7, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
                <p className="text-muteded">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default SignIn;
