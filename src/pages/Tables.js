import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Space,
  Tag,
  Tooltip,
  Modal,
  Form,
  Input,
  notification,
} from "antd";

// Images
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import {
  EditOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import AddOrUpdateModal from "./AddOrUpdateModal";

const { Title } = Typography;
function Tables() {
  const [visible, setVisible] = useState(false);
  const [visibleE, setVisibleE] = useState(false);
  const [data, setdata] = useState([]);
  const [role, setRole] = useState([]);
  const { form } = useForm();
  const hist = useHistory();
  const columns = [
    {
      title: "Name",
      dataIndex: "UserName",
      key: "name",
      render: (val, record) => {
        return (
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={record.img} //image like DB 'img'
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{val}</Title>
              <p>{record.email}</p>
            </div>
          </Avatar.Group>
        );
      },
      width: "20%",
    },
    {
      title: "LastName",
      dataIndex: "LastName",
      key: "LastName",
      render: (val, record) => {
        return (
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={record.img} //image like DB 'img'
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{val}</Title>
              <p>{record.email}</p>
            </div>
          </Avatar.Group>
        );
      },
      width: "20%",
    },
    {
      title: "Mobile",
      dataIndex: "Contact_number",
      key: "Contact_number",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
            <p>{record.org}</p>
          </div>
        );
      },
      width: "20%",
    },
    {
      title: "role",
      dataIndex: "role",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
            <p>{record.org}</p>
            {/* check whatever we want to add there */}
          </div>
        );
      },
      width: "20%",
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (val, record) => {
        return val === "BLOCKED" ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {val}
            {/* check API status when comparing the status VALID,BLOCKED....!!! */}
          </Tag>
        ) : (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {val}
          </Tag>
        );
      },
      width: "20%",
    },

    {
      title: "Action",
      dataIndex: "Action",
      render: () => {
        return (
          <Space size="middle" direction="horizontal">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.preventDefault();
                setVisibleE(true);
              }}
            >
              Edit
            </Button>
            <Button danger onClick={(e) => e.preventDefault()}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    console.log(role);

    fetch("http://localhost:3010/api/getUserByRole", {
      Method: "GET",
      Headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      Body: { role: role },
      Cache: "default",
    })
      .then((res) => {
        setdata(res.data);
        console.log(res.data, "analysta w makiting w all");
      })
      .catch(() => {
        notification.error({ message: " No user is found " });
      });
  }, [role]);

  const handleUpdate = async (id) => {
    await axios
      .delete("http://localhost:3010/api/UpdateUser/:id" + id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const handleAdd = async (id) => {
    await axios
      .delete("http://localhost:3010/api/deleteUser/:_id" + id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <Form form={form}>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="List Of Users"
              extra={
                <Space size="middle" direction="horizontal">
                  <Radio.Group
                    onChange={(e) => {
                      setRole(e.target.value);
                      console.log("aaaa", e);
                    }}
                  >
                    <Radio.Button value="All" name="role">
                      All
                    </Radio.Button>
                    <Radio.Button value="Markiting" name="role">
                      Markiting
                    </Radio.Button>
                    <Radio.Button value="Analyste" name="role">
                      Analyste
                    </Radio.Button>
                  </Radio.Group>
                  <Tooltip title="Add">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={
                        <PlusOutlined
                          style={{
                            position: "relative",
                            margin: "5px 0px 5px 5px",
                          }}
                        />
                      }
                      size="large"
                      onClick={() => {
                        setVisible(true);
                      }}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={true}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <AddOrUpdateModal
        visible={visible}
        handleAddOrUpdate={handleAdd}
        onCancel={() => setVisible(false)}
        type="ADD"
      />
      <AddOrUpdateModal
        visible={visibleE}
        handleAddOrUpdate={handleUpdate}
        onCancel={() => setVisibleE(false)}
        type="EDIT"
      />
    </Form>
  );
}

export default Tables;
