import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./file.css";
import { isAuthenticated } from "../helpers/auth";
import { useHistory } from "react-router-dom";
import { Alert, Button, Card, Row, Space, Typography, Upload } from "antd";
import Title from "antd/lib/skeleton/Title";
import { UploadOutlined } from "@ant-design/icons";

function CountFile() {
  let [state, setState] = useState({
    countfileCSV: 1,
    countFileVCF: 1,
  });
  let [reponsErr, SetreponsErr] = useState("");
  const hist = useHistory();
  let chromfiles = [];
  let [chromfilesstate, Setchromfilesstate] = useState([]);

  function onChange(event) {
    event.preventDefault();
    for (const file of event.target.files) {
      chromfiles.push(file);
    }
    Setchromfilesstate(chromfiles);
  }
  const ref = useRef();
  const reset = () => {
    Setchromfilesstate([]);
    ref.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (const file of chromfilesstate) {
      formData.append("file", file);
    }
    // console.log("chromfiles", formData.get("files" + 0));
    console.log("chromfiles", formData.getAll("file"));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .post("http://localhost:3019/api/analyse", formData, config)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    axios.get("http://localhost:3019/api/getCount").then((reponse) => {
      console.log("hhh", reponse);
      console.log("ttt", reponse.data);
      if (reponse) {
        setState({
          ...state, //parcours state feha 2 objet w l9it feha 2 variable w 5thithom w override
          countfileCSV: reponse.data.UserfileCSV,
          countFileVCF: reponse.data.UserfileVCF,
        });
      } else {
        SetreponsErr(reponse.err.error);
        alert("Error: ", { reponsErr });
      }
    });
  }, []);

  return (
    <Card
      style={{ textAlign: "center" }}
      title={<Typography.Title level={2}>Upload a files</Typography.Title>}
      type="inner"
    >
      <Card className="wrapper">
        <Row justify="center">
          <div class="file-upload">
            <input
              type="file"
              multiple
              required
              accept=".vcf, .csv"
              ref={ref}
              onChange={onChange}
            />
            <i class="fa fa-arrow-up"></i>
          </div>
        </Row>
        <br />
        {chromfilesstate.map((val) => (
          <Row justify="center">
            <Typography.Text strong>{val.name}</Typography.Text>
          </Row>
        ))}
        <br />

        <Row justify="center">
          <Space size="middle">
            <Button
              onClick={reset}
              style={{
                backgroundColor: "red",
                width: "140px",
                Color: "white",
                height: "55px",
              }}
            >
              Reset
            </Button>
            <br />
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                backroundColor: "yellow",
                width: "140px",
                color: "white",
                height: "55px",
              }}
            >
              Submit
            </Button>
          </Space>
        </Row>
      </Card>
      <br />
      <Card>
        <Alert
          message=" VCF "
          description={
            "number of files stored in the server : " + state.countFileVCF
          }
          type="success"
        />
        <Alert
          message="CSV"
          description={
            "number of files stored in the server : " + state.countfileCSV
          }
          type="info"
        />
      </Card>
    </Card>
  );
}
export default CountFile;
