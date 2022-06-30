import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Input, Upload } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import "./file.css";
let chromfiles = [];

function add_file() {
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
        //alert(res.data.message);
        Swal.fire({
          icon: "success",
          title: "message",
          text: res.data.message,
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div>
        <div className="ee">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Upload Your File User </label>
              <input
                type="file"
                onChange={onChange}
                // accept="application/csv,application/vcf,.csv,.vcf"
                className="form-control"
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default add_file;
