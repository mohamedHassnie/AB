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
} from "@ant-design/icons";
const { Title } = Typography;
function Tablepatient() {
  const [data, setdata] = useState([]);
  const [user, setUser] = useState([]);
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
      dataIndex: "Contact_number",
      key: "Contact_number",
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
      .get("http://localhost:3010/api/getPatient", config)
      .then((res) => {
        setdata(res.data);
      })
      .catch(() => {
        notification.error({ message: " No user is found " });
      });
  }, [hist]);

  const handleUpdate = async (id) => {
    await axios
      .delete(`http://localhost:3010/api/updatepatient/:_id/${id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3010/api/deletePatient/:_id /${id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      let resultat = await fetch(`http://localhost:3010/api/search/${key}`);
      resultat = await resultat.json();
      if (resultat) {
        setUser(resultat);
      }
    } else {
      Notification({ message: "user undifined" });
    }
  };
  return (
    <div className="tabled">
      <Card>
        <Row gutter={[24, 0]}>
          <Table
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="search here"
                onChange={handleSearch}
              />
            }
            columns={columns}
            dataSource={data}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="400px"
            rowSelection={{ type: "checkbox" }}
          />
        </Row>
      </Card>
    </div>
  );
}

export default Tablepatient;
