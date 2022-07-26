import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "antd";
import add_file from "./add_file";
const CountFile = () => {
  const [countFileCSV, setCountFileCSV] = useState(1);
  const [countFileVCF, setCountFileVCF] = useState(1);
  const [reponsErr, SetreponsErr] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3011/api/getCount").then((reponse) => {
      // console.log("hhh", reponse);
      // console.log("ttt", reponse.data);
      if (reponse) {
        setCountFileCSV(reponse.data.UserfileCSV);
        setCountFileVCF(reponse.data.UserfileVCF);
      } else {
        SetreponsErr(reponse.err.error);
        alert("Error: ", { reponsErr });
      }
    });
  });

  return (
    <p
      className="p-3 mb-2 bg-success text-white"
      style={{ fontFamily: "Times New Roman", fontSize: "17px" }}
    >
      nombre de fichier stockée dans le serveur &nbsp; CSV: {countFileCSV}
      &nbsp; &nbsp; &nbsp; VCF: {countFileVCF}
    </p>
  );
};
export default CountFile;
