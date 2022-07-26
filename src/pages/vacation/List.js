import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import {
  Typography,
  Avatar,
  Row,
  Col,
  Table,
  Space,
  Button,
  Radio,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Title } = Typography;
const List = () => {
  const [Data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "UserName",
      key: "name",
      render: (val, record) => {
        return (
          <Avatar.Group onChange={onChange} value={value}>
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
      width: "13%",
    },

    {
      title: "date debut",
      dataIndex: "startingDate",
      key: "startingDate",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "12%",
    },
    {
      title: "endingDate",
      dataIndex: "date fin",
      key: "endingDate",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "12%",
    },
    {
      title: "type_vacation",
      dataIndex: "type_vacation",
      key: "type_vacation",
      render: (val) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "12%",
    },
    {
      title: "days",
      dataIndex: "days",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "12%",
    },

    {
      title: "status",
      dataIndex: "status",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },

      width: "12%",
    },
    {
      title: "Reponse ",
      render: (row) => {
        return (
          <Radio.Group>
            <Radio value={1}>acceptez</Radio>
            <Radio value={2}>refuser</Radio>
          </Radio.Group>
        );
      },
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
                // handleUpdate(row._id);
              }}
            >
              reponse
            </Button>
          </Space>
        );
      },
    },
  ];
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const handleUpdate = async () => {
    const data = {
      newStatus: selected,
    };
    await axios.put(`http://localhost:3011/api/UpdateEtatAdmin`, config, data);
  };
  let year = new Date().getFullYear();

  const handleSearch = async () => {
    let resultat = await axios.get(
      `http://localhost:3011/api/listVacation`,
      config
    );
    resultat = resultat.json();
    if (resultat) {
      setData(resultat.vacations);
      console.log("lll", resultat);
    }
  };
  console.log("fff", Data);
  useEffect(() => {
    handleSearch();
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  return (
    <div>
      <Row style={{ width: "100%", border: "10px " }}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={Data}
            pagination={{ responsive: true }}
          />
        </Col>
      </Row>
      <div
        className="form-group"
        style={{
          height: "50px",
          color: "black",
          backgroundColor: "#F0FFFF",
          width: "350px",
        }}
      >
        {/* {Data.maxDays},{Data.maxDaysMalade} */}
        <br /> <br />
        <h4 className="form-control">max congé de l'anneé :{year}</h4>
        <br />
        <input className="form-control" type="number" /> <br />
        <select className="form-control">
          <option value="" disabled>
            type congé
          </option>
          <option value="normal">normal</option>
          <option value="maladie">maladie</option>
        </select>
        <br />
        <select
          className="form-control"
          value={selected}
          onChange={handleChange}
        >
          <option value="" disabled>
            role
          </option>
          <option value="analysta">analyse</option>
          <option value="makiting">markiting</option>
        </select>
        <br /> <br />
        <button class="btn btn-primary" style={{ width: "100%" }}>
          envoyer
        </button>
      </div>
    </div>
  );
};
export default List;
