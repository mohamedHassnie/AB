import {
  ContactsFilled,
  FileAddFilled,
  MailFilled,
  PieChartFilled,
  ProfileFilled,
  ScheduleFilled,
  SettingFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import { Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/ooo.png";
import { isAuthenticated } from "../../helpers/auth";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" style={{ width: "290px", height: "110px" }} />
      </div>
      <hr /> <br /> <br />
      <Menu theme="dark" mode="inline" style={{ zIndex: 1 }}>
        <br />
        {JSON.parse(localStorage.getItem("user")).role === "admin" && (
          <Menu.Item key="1">
            <NavLink to="/dashboard">
              <span
                className="icon"
                style={{
                  background: page === "dashboard" ? color : "",
                }}
              >
                <PieChartFilled />
              </span>
              <span className="label">Dashboard</span>
            </NavLink>
          </Menu.Item>
        )}
        {JSON.parse(localStorage.getItem("user")).role === "analyste" && (
          <Menu.Item key="1">
            <NavLink to="/analyse">
              <span
                className="icon"
                style={{
                  background: page === "dashboard" ? color : "RoyalBlue",
                }}
              >
                <PieChartFilled />
              </span>
              <span className="label">Data Summary</span>
            </NavLink>
          </Menu.Item>
        )}
        {JSON.parse(localStorage.getItem("user")).role === "admin" && (
          <Fragment style={{ zIndex: 1 }}>
            <Menu.Item key="4">
              <NavLink to="/add_file">
                <span
                  className="icon"
                  style={{
                    background: page === "add_file" ? color : "",
                  }}
                >
                  <FileAddFilled />{" "}
                </span>
                <span className="label"> add file</span>
              </NavLink>
            </Menu.Item>
          </Fragment>
        )}
        {JSON.parse(localStorage.getItem("user")).role === "analyste" && (
          <Fragment style={{ zIndex: 1 }}>
            <Menu.Item key="4">
              <NavLink to="/add_file">
                <span
                  className="icon"
                  style={{
                    background: page === "add_file" ? color : "00D084",
                  }}
                >
                  <FileAddFilled />{" "}
                </span>
                <span className="label"> add file</span>
              </NavLink>
            </Menu.Item>
          </Fragment>
        )}

        {JSON.parse(localStorage.getItem("user")).role === "admin" && (
          <Fragment style={{ zIndex: 1 }}>
            <Menu.Item key="6">
              <NavLink to="/listVacation">
                <span
                  className="icon"
                  style={{
                    background: page === "listVacation" ? color : "RoyalBlue",
                  }}
                >
                  <ProfileFilled />
                </span>
                <span className="label"> list_Vacation</span>
              </NavLink>
            </Menu.Item>
          </Fragment>
        )}
        {JSON.parse(localStorage.getItem("user")).role === "admin" && (
          <Fragment style={{ zIndex: 1 }}>
            <Menu.Item key="8">
              <NavLink to="/Interview">
                <span
                  className="icon"
                  style={{
                    background: page === "Interview" ? color : "",
                  }}
                >
                  <ProfileFilled />
                </span>
                <span className="label"> Interview</span>
              </NavLink>
            </Menu.Item>
          </Fragment>
        )}
        {JSON.parse(localStorage.getItem("user")).role === "admin" && (
          <Fragment style={{ zIndex: 1 }}>
            <Menu.Item key="3">
              <NavLink to="/Tablepatient">
                <span
                  className="icon"
                  style={{
                    background: page === "Tablepatient" ? color : "RoyalBlue",
                  }}
                >
                  <ContactsFilled />{" "}
                </span>
                <span className="label"> Setting_Patient</span>
              </NavLink>
            </Menu.Item>
          </Fragment>
        )}
        {JSON.parse(localStorage.getItem("user")).role === "admin" && (
          <Menu.Item key="2">
            <NavLink to="/tables">
              <span
                className="icon"
                style={{
                  background: page === "tables" ? color : "",
                }}
              >
                <SettingFilled />
              </span>
              <span className="label">Setting_User</span>
            </NavLink>
          </Menu.Item>
        )}
        {JSON.parse(localStorage.getItem("user")).role === "markiting" && (
          <Fragment style={{ zIndex: 1 }}>
            <Menu.Item key="8">
              <NavLink to="/mail">
                <span
                  className="icon"
                  style={{
                    background: page === "mail" ? color : "RoyalBlue",
                  }}
                >
                  <MailFilled />
                </span>
                <span className="label"> mass mailing</span>
              </NavLink>
            </Menu.Item>
          </Fragment>
        )}

        {JSON.parse(localStorage.getItem("user")).role === "markiting" && (
          <Fragment style={{ zIndex: 1 }}>
            <Menu.Item key="3">
              <NavLink to="/Tablepatient">
                <span
                  className="icon"
                  style={{
                    background: page === "Tablepatient" ? color : "",
                  }}
                >
                  <ContactsFilled />
                </span>
                <span className="label"> Setting_Patient</span>
              </NavLink>
            </Menu.Item>
          </Fragment>
        )}
        {JSON.parse(localStorage.getItem("user")).role === "markiting" && (
          <Fragment style={{ zIndex: 1 }}>
            <Menu.Item key="5">
              <NavLink to="/vacation">
                <span
                  className="icon"
                  style={{
                    background: page === "vacation" ? color : "RoyalBlue",
                  }}
                >
                  <ScheduleFilled />
                </span>
                <span className="label"> vacation_request</span>
              </NavLink>
            </Menu.Item>
          </Fragment>
        )}
        {JSON.parse(localStorage.getItem("user")).role === "analyste" && (
          <Fragment style={{ zIndex: 1 }}>
            <Menu.Item key="5">
              <NavLink to="/vacation">
                <span
                  className="icon"
                  style={{
                    background: page === "vacation" ? color : "RoyalBlue",
                  }}
                >
                  <ScheduleFilled />
                </span>
                <span className="label"> vacation_request</span>
              </NavLink>
            </Menu.Item>
          </Fragment>
        )}
      </Menu>
    </>
  );
}

export default Sidenav;
