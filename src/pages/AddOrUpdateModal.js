import { Card, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { Radio } from "antd";
const AddOrUpdateModal = (props) => {
  const { visible, handleAddOrUpdate, onCancel, type, data } = props;
  const { form } = useForm();
  const handleonfinish = (values) => {
    //todo
  };
  return (
    <Form form={form} onFinish={handleonfinish}>
      <div className="site-card-border-less-wrapper">
        <Modal
          title="Add_Update "
          centered
          visible={visible}
          onOk={() => handleAddOrUpdate()}
          onCancel={onCancel}
        >
          <Card
            style={{
              width: "90%",
              height: "80%",
              backgroundColor: "ButtonHighlight",
            }}
          >
            <Form.Item name="texte" label="UserName">
              <Input />
            </Form.Item>
            <Form.Item name="texte" label="LastName">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Num_phone">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="User_Email">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input />
            </Form.Item>
            <Radio.Group defaultValue="a">
              <Radio.Button
                value="Markiting"
                style={{
                  backgroundColor: "Bisque",
                  color: "black",
                  fontSize: "20px",
                  TextAlign: "center",
                  border: "ridge ",
                }}
              >
                Markiting
              </Radio.Button>
              <Radio.Button
                value="Analyste"
                style={{
                  backgroundColor: "Bisque",
                  color: "black",
                  fontSize: "20px",
                  border: "ridge ",
                }}
              >
                Analyste{" "}
              </Radio.Button>
            </Radio.Group>
          </Card>
        </Modal>
      </div>
    </Form>
  );
};

export default AddOrUpdateModal;
