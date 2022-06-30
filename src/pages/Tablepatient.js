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
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import {
  EditOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
function Tablepatient() {
  const [data, setdata] = useState([]);
  const [user, setUser] = useState([]);
  const [key, setKey] = useState("");

  const { form } = useForm();
  const hist = useHistory();
  const columns = [
    {
      title: "Name",
      dataIndex: "UserName",
      key: "name",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },

    {
      title: "Prénom",
      dataIndex: "LastName",
      key: "LastName",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },

    {
      title: "location",
      dataIndex: "location",
      key: "location",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },
    {
      title: "Mobile",
      dataIndex: "phone",
      key: "phone",
      render: (val) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },
    {
      title: "Nationality",
      dataIndex: "Nationality",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },

    {
      title: "Date_of_birth",
      dataIndex: "Date_of_birth",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },

      width: "20%",
    },
    {
      title: "Action ",

      render: (row) => {
        return (
          <Space size="middle" direction="horizontal">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={(e) => {
                handleUpdate(row._id);
              }}
            >
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(row._id)}>
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

    axios
      .get("http://localhost:3011/api/getPatient", config)
      .then((res) => {
        setdata(res.data);
      })
      .catch(() => {
        notification.error({ message: " No user is found " });
      });
  }, []);

  const handleUpdate = async (id) => {
    await axios
      .delete(`http://localhost:3011/api/updatepatient/${id}`)
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "message",
          text: "response.data.message,",
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3010/api/deletePatient/${id}`)
      .then(function (response) {
        axios
          .get("http://localhost:3010/api/getPatient")
          .then((res) => {
            setdata(res.data);
          })
          .catch(() => {
            notification.error({ message: " No user is found " });
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleSearch = async () => {
    let resultat = await fetch(
      `http://localhost:3010/api/searchPatient/${key}`
    );
    resultat = await resultat.json();
    if (resultat) {
      setdata(resultat);
    }
  };
  return (
    <div className="tabled">
      <Card>
        <Row justify="end" gutter={14} style={{ margin: "10px" }}>
          <Col span={4}>
            <Input
              style={{ width: "90%" }}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
          </Col>
          <Col span={2}>
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "90%", border: "1px " }}>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ responsive: true }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Tablepatient;
