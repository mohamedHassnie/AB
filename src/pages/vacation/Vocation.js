import React, { useEffect } from "react";
import { axios } from "axios";

import { useState } from "react";

import { Row, Col, Table, Typography } from "antd";

const { Title } = Typography;
export default function Vocation() {
  const [DataDebut, setDateDebut] = useState("");
  const [DateFin, setDateFin] = useState("");
  const [hist, sethist] = useState([]);

  let year = new Date().getFullYear();
  const columns = [
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
  ];

  function handlePost() {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const data = {
      startingDate: DataDebut,
      endingDate: DateFin,
    };
    axios
      .post("https://localhost:3011/api/vacation", data, config)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   };

  //   axios
  //     .get("http://localhost:3011/api/historiqueVaccation", config)
  //     .then((res) => {
  //       sethist(res.data);
  //     })
  //     .catch(() => {
  //       notification.error({ message: " No user is found " });
  //     });
  // }, []);

  return (
    <div>
      <div className="form-group" style={{ width: "550px" }}>
        <div>
          <div>
            <h3
              className="form-control"
              style={{
                height: "50px",
                color: "black",
                backgroundColor: "#F0FFFF",
              }}
            >
              Demande congé
              {JSON.parse(localStorage.getItem("user"))?.UserName}
            </h3>
          </div>
          <br></br>

          <label style={{ color: "black" }}>date debut *</label>
          <input
            className="form-control"
            type="date"
            onChange={(e) => setDateDebut(e.target.value)}
          />
          <br></br>
          <label style={{ color: "black" }}>date Fin *</label>
          <input
            className="form-control"
            type="date"
            onChange={(e) => setDateFin(e.target.value)}
          />

          <br />

          <select className="form-control">
            <option
              style={{
                color: "red",
              }}
              value=""
              disabled
            >
              type
            </option>
            <option value="">maladie</option>
            <option value="">Normal</option>
          </select>

          <br />
          <label style={{ color: "black" }}>Facultative</label>
          <textarea
            type="textarea"
            placeholder="reason"
            className="form-control"
          />

          <br />

          <button
            style={{ width: "100%" }}
            className="btn btn-success"
            onClick={(e) => {
              e.preventDefault();
              handlePost();
            }}
          >
            envoyer
          </button>
        </div>
        <br />
        <br />
        <div>
          <h3
            className="form-control"
            style={{
              height: "50px",
              color: "black",
              backgroundColor: "#F0FFFF",
            }}
          >
            Historigue Congé Pour{" "}
            {JSON.parse(localStorage.getItem("user"))?.UserName} de l'anneé :
            {year}
          </h3>
        </div>
      </div>
      <Row style={{ width: "90%", border: "4px " }}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={hist}
            pagination={{ responsive: true }}
          />
        </Col>
      </Row>
    </div>
  );
}
