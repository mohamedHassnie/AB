import { Card, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { notification } from "antd";
import Creatable from "react-select/creatable";

import axios from "axios";
const AddOrUpdateModal = (props) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
  };
  const { visible, handleAddOrUpdate, onCancel, type, data } = props;
  const roles = [
    { label: "markiting", value: 1 },
    { label: "analyste", value: 2 },
  ];
  const [Name, setUserName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Contact_number, setContact_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { form } = useForm();
  const [roleValue, setRoleValue] = useState("");

  const handleChange = (field, value) => {
    switch (field) {
      case "roles":
        setRoleValue(value);
        break;
      default:
        break;
    }
  };

  const handleonfinish = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const data = {
      UserName: Name,
      LastName: LastName,
      Contact_number: Contact_number,
      email: email,
      password: password,
      role: roleValue,
    };
    await axios
      .post("http://localhost:3010/api/addUser", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        notification.error({ message: "check " });
        console.log(err);
      });
  };

  return (
    <Form form={form} onFinish={handleonfinish}>
      <div className="site-card-border-less-wrapper">
        <Modal
          title="Add_Update"
          centered
          visible={visible}
          onOk={() => handleAddOrUpdate()}
          onCancel={onCancel}
        >
          <Card
            centered
            style={{
              width: "90%",
              height: "80%",
            }}
          >
            <Form.Item name="Name">
              <Input
                placeholder="Name"
                type="texte"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="LastName">
              <Input
                placeholder="LastName"
                type="texte"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="Contact_number">
              <Input
                placeholder="phone"
                type="tel"
                onChange={(e) => setContact_number(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="email">
              <Input
                placeholder="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="password">
              <Input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Creatable
                isClearable
                onChange={(value) => handleChange("roles", value)}
                options={roles}
                value={roleValue}
                styles={customStyles}
              />
            </Form.Item>
          </Card>
        </Modal>
      </div>
    </Form>
  );
};

export default AddOrUpdateModal;
