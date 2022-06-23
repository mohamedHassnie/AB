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

import { Link } from "react-router-dom";
import axios from "axios";
const { Title } = Typography;
const { Content } = Layout;

const SignUp = () => {
  const [UserName, setUserName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Contact_number, setContact_number] = useState("");
  const [Nationality, setNationality] = useState("");
  const [Date_of_birth, setDate_of_birth] = useState("");
  const [Message, setMessage] = useState("");

  const onFinish = async (values) => {
    console.log("Success:", values);
    const data = {
      UserName: UserName,
      LastName: LastName,
      email: email,
      Contact_number: Contact_number,
      Nationality: Nationality,
      Date_of_birth: Date_of_birth,
      Message: Message,
    };
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    await axios
      .post("http://localhost:3010/api/signUpPatient", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        notification.error({ message: "check " });
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Sign Up</Title>
              <p className="text-lg">Welcom</p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            bordered="false"
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Form.Item
                name="UserName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  placeholder="UserName"
                  type="texte"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="LastName"
                rules={[
                  { required: true, message: "Please input your LastName!" },
                ]}
              >
                <Input
                  placeholder="LastName"
                  type="texte"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your LastName!" },
                ]}
              >
                <Input
                  placeholder="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="Contact_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your Contact_number!",
                  },
                ]}
              >
                <Input
                  placeholder="Contact_number"
                  type="tel"
                  onChange={(e) => setContact_number(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="Nationality"
                rules={[
                  {
                    required: true,
                    message: "Please input your Nationality!",
                  },
                ]}
              >
                <Input
                  placeholder="Nationality"
                  type="texte"
                  onChange={(e) => setNationality(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="Date_of_birth"
                type="date"
                rules={[
                  {
                    required: true,
                    message: "Please input your Date_of_birth!",
                  },
                ]}
              >
                <Input
                  placeholder="Date_of_birth"
                  type="date"
                  onChange={(e) => setDate_of_birth(e.target.value)}
                />
              </Form.Item>
              {/* <Form.Item name="Message">
                <textarea
                  placeholder="Message"
                  type="texte"
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: "100%" }}
                ></textarea>
              </Form.Item> */}
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  I agree the{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Terms and Conditions
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </div>
    </>
  );
};
export default SignUp;