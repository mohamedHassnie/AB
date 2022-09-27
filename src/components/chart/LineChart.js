import ReactApexChart from "react-apexcharts";
import { notification, Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function LineChart() {
  const { Title, Paragraph } = Typography;

  const [dataAl, setdatAl] = useState([]);
  const [dataMar, setdataMar] = useState([]);

  const getData = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios
      .get("http://10.10.50.24:3019/api/Patient", config)
      .then((response) => {
        setdatAl(Object.values(response.data.months[0]));
      })
      .catch((err) => {
        // notification.error({ message: "No Data " });
      });

    await axios
      .get("http://10.10.50.24:3019/api/Patient", config)
      .then((response) => {
        setdataMar(Object.values(response.data.months[0]));
      })
      .catch((err) => {
        //notification.error({ message: "No Data " });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const series = [
    {
      name: "Patient",
      data: dataAl,
      offsetY: 0,
    },
    {
      name: "Patient",
      data: dataMar,
      offsetY: 0,
    },
  ];

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Patient_Variation</Title>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Patient</li>
            {/* <li>{<MinusOutlined />} Markiting</li> */}
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
