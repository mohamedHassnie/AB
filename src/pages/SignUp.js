import React, { Component } from "react";
import { Layout, Button, Typography, Card, Form, Input, Checkbox } from "antd";

import { Link } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

export default class SignUp extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
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
                  <Input placeholder="UserName" />
                </Form.Item>
                <Form.Item
                  name="UserName"
                  rules={[
                    { required: true, message: "Please input your UserName!" },
                  ]}
                >
                  <Input placeholder="LastName" />
                </Form.Item>
                <Form.Item
                  name="LastName"
                  rules={[
                    { required: true, message: "Please input your LastName!" },
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>

                <Form.Item
                  name="Contact_number"
                  type="number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Contact_number!",
                    },
                  ]}
                >
                  <Input placeholder="Contact_number" />
                </Form.Item>
                <Form.Item
                  name="Nationality"
                  type="texte"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Nationality!",
                    },
                  ]}
                >
                  <Input placeholder="Nationality" />
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
                  <Input placeholder="Date_of_birth" />
                </Form.Item>
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
  }
}
