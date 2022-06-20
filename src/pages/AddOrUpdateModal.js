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
          title="Add "
          centered
          visible={visible}
          onOk={() => handleAddOrUpdate()}
          onCancel={onCancel}
        >
          <Card>
            <Form.Item name="nameoffield" label="UserName">
              <Input />
            </Form.Item>
            <Form.Item name="nameoffield" label="LastName">
              <Input />
            </Form.Item>
            <Form.Item name="nameoffield" label="email">
              <Input />
            </Form.Item>
            <Form.Item name="nameoffield" label="phone">
              <Input />
            </Form.Item>
            <Form.Item name="nameoffield" label="password">
              <Input />
            </Form.Item>
            <Radio.Group defaultValue="a">
              <Radio.Button value="Markiting">Markiting</Radio.Button>
              <Radio.Button value="Analyste">Analyste </Radio.Button>
            </Radio.Group>
          </Card>
        </Modal>
      </div>
    </Form>
  );
};

export default AddOrUpdateModal;
