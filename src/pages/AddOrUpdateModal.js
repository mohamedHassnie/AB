import { Card, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { notification } from "antd";
import Creatable from "react-select/creatable";
import Swal from "sweetalert2";
import axios from "axios";
const { Option } = Select;
const AddOrUpdateModal = (props) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
  };
  const { visible, onCancel } = props;

  const [form] = useForm();

  useEffect(() => {
    console.log("teswttt", props.record);

    form.setFieldsValue({ ...props.record, password: "" });
  }, [form, props.record, props.visible]);

  const handleonfinish = async (val) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    if (props.type === "ADD") {
      const values = { ...val, role: form.getFieldValue("role") };

      await axios
        .post("http://localhost:3011/api/addUser", values, config)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "message",
            text: response.data.successMessage,
          });
          onCancel();
        })
        .catch((err) => {
          notification.error({ message: "check your Data " });

          onCancel();
        });
    } else {
      const values = {
        ...val,
        role: form.getFieldValue("role"),
        _id: props.record._id,
      };

      await axios
        .put("http://localhost:3010/api/UpdateUser/" + values._id, values)
        .then(function (response) {
          notification.success({ message: "Update Done  " });
          onCancel();
        })
        .catch(function (err) {
          notification.error({ message: "check your Data " });
          onCancel();
        });
    }
  };

  return (
    <Form form={form} onFinish={handleonfinish}>
      <div className="site-card-border-less-wrapper">
        <Modal
          title="Add_Update"
          centered
          visible={visible}
          onOk={() => {
            form.submit();
          }}
          onCancel={onCancel}
        >
          <Card
            centered
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Form.Item name="UserName">
              <Input placeholder="Name" type="texte" />
            </Form.Item>
            <Form.Item name="LastName">
              <Input placeholder="LastName" type="texte" />
            </Form.Item>
            <Form.Item name="phone">
              <Input placeholder="phone" type="tel" />
            </Form.Item>
            <Form.Item name="location">
              <Input placeholder="location" type="texte" />
            </Form.Item>
            <Form.Item name="email">
              <Input placeholder="email" type="email" />
            </Form.Item>
            <Form.Item name="password">
              <Input placeholder="password" type="password" />
            </Form.Item>

            <Form.Item shouldUpdate>
              {({ getFieldValue }) => (
                <Select
                  value={getFieldValue("role")}
                  onChange={(e) => {
                    form.setFieldsValue({ role: e });
                  }}
                >
                  <Option
                    disabled
                    value=""
                    style={{
                      color: "red",
                    }}
                  >
                    choissez_role
                  </Option>
                  <Option value="makiting">Marketing</Option>
                  <Option value="analysta">Analyste</Option>
                </Select>
              )}
            </Form.Item>
          </Card>
        </Modal>
      </div>
    </Form>
  );
};

export default AddOrUpdateModal;
