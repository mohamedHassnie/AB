import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Form,
  Input,
  Space,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import { formatCountdown } from "antd/lib/statistic/utils";
import { useForm } from "antd/lib/form/Form";

function Profile() {
  const [imageURL, setImageURL] = useState(false);
  const [Editable, setEditable] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { form } = useForm();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload New Project</div>
    </div>
  );

  const handleonfinish = (values) => {};

  const [user, setuser] = useState({});

  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <Form form={form} onFinish={handleonfinish}>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{user?.UserName}</h4>
                  <p>{user?.role}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={
              !Editable ? (
                <Button type="link" onClick={(val) => setEditable(!Editable)}>
                  {pencil}
                </Button>
              ) : (
                <Button
                  type="link"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  onClick={(val) => {
                    setEditable(!Editable);
                  }}
                  size="large"
                ></Button>
              )
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions title="">
              <Descriptions.Item label="Full Name" span={3}>
                {!Editable ? (
                  <>
                    {user?.UserName}
                    {user?.LastName}
                  </>
                ) : (
                  <Form.Item name="name">
                    <Input size="small" style={{ height: "2rem" }} />
                  </Form.Item>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {!Editable ? (
                  <> {user?.phone}</>
                ) : (
                  <Form.Item name="name">
                    <Input size="small" style={{ height: "2rem" }} />
                  </Form.Item>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {!Editable ? (
                  <> {user?.email}</>
                ) : (
                  <Form.Item name="name">
                    <Input size="small" style={{ height: "2rem" }} />
                  </Form.Item>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {!Editable ? (
                  <> {user?.location}</>
                ) : (
                  <Form.Item name="name">
                    <Input size="small" style={{ height: "2rem" }} />
                  </Form.Item>
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}

export default Profile;
