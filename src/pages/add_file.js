import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./file.css";

function CountFile() {
  let [state, setState] = useState({
    countfileCSV: 1,
    countFileVCF: 1,
  });
  let [reponsErr, SetreponsErr] = useState("");

  let chromfiles = [];
  function onChange(event) {
    event.preventDefault();
    for (const file of event.target.files) {
      chromfiles.push(file);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (const file of chromfiles) {
      formData.append("file", file);
    }
    // console.log("chromfiles", formData.get("files" + 0));
    console.log("chromfiles", formData.getAll("file"));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:3011/api/analyse", formData, config)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => alert(err));
  };
  const ref = useRef();
  const reset = () => {
    ref.current.value = null;
  };

  useEffect(() => {
    axios.get("http://localhost:3011/api/getCount").then((reponse) => {
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
  });

  return (
    <>
      <div className="card" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="ee">
          <div>
            {" "}
            <form onSubmit={handleSubmit}>
              <div>
                <label>Upload Your File User </label>
                <br />
                <input
                  ref={ref}
                  style={{
                    width: " 100%",
                    border: "3px",
                    fontSize: "25px",
                    outline: "none",
                  }}
                  type="file"
                  onChange={onChange}
                  accept=".vcf, .csv"
                  multiple
                  required
                />
              </div>

              <div>
                <input
                  id="envoyer"
                  type="submit"
                  className="btn btn-primary btn-style mt-4"
                />
                <button onClick={reset}>reset</button>
              </div>
            </form>
          </div>
          <br />
          <div>
            <div>
              <img
                src="https://png.pngtree.com/png-vector/20190412/ourlarge/pngtree-vcf-file-document-icon-png-image_927937.jpg"
                alt=""
                style={{ width: "65px", right: "90px", marginLeft: "120px" }}
              ></img>
              &nbsp;&nbsp;
              <img
                src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-csv-file-document-icon-png-image_4187767.jpg"
                alt=""
                style={{ width: "65px", right: "90px", marginLeft: "10px" }}
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div>
        <br />
        <p
          className="p-3 mb-2 bg-success text-white"
          style={{ fontFamily: "Times New Roman", fontSize: "17px" }}
        >
          nombre de fichier stockée dans le serveur
          <br />
          Csv &nbsp;: &nbsp;{state.countfileCSV} &nbsp; &nbsp; Vcf &nbsp;:
          &nbsp;
          {state.countFileVCF}
        </p>
        <br />

        <p style={{ color: "red" }}>{reponsErr}</p>
      </div>
    </>
  );
}
export default CountFile;
