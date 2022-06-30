import { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  notification,
  Descriptions,
  Avatar,
  Radio,
  Image,
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
import profilavatar from "../assets/images/profil.jpg";
import { formatCountdown } from "antd/lib/statistic/utils";
import { useForm } from "antd/lib/form/Form";

function Profile() {
  const [Editable, setEditable] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [UserName, setUserName] = useState();
  const [LastName, setLastName] = useState("");
  const { form } = useForm();
  const [email, setemail] = useState("");
  const [Phone, setPhone] = useState("");
  const [location, setlocation] = useState("");
  const [file, setFile] = useState("");
  const [img, setImageName] = useState("");
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("user")));

    setUserName(user.UserName);
    setLastName(user.LastName);
    setemail(user.email);
    setPhone(user.Phone);
    setlocation(user.location);
  }, []);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };
  const uploadFile = async (e) => {
    const data = new FormData();
    // houni bch uploadi image b files[0]
    data.append("userImage", file);
    axios.post("http://localhost:3011/api/upload", data);
  };
  // houni update
  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("UserName", UserName);
    formData.append("LastName", LastName);
    formData.append("email", email);
    formData.append("Phone", Phone);
    formData.append("location", location);
    formData.append("userImage", img);

    await axios
      .put(`http://localhost:3011/api/UpdateUser` + formData._id, formData)
      .then((data) => {
        console.log(data);
        notification.success({ message: "Update Done with success" });
      })
      .catch(() => {
        notification.error({ message: "Check your data" });
      });
  };

  const [user, setuser] = useState({});
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
  return (
    <Form form={form} onFinish={uploadFile}>
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
