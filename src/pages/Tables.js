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
} from "antd";

// Images
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import {
  EditOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import AddOrUpdateModal from "./AddOrUpdateModal";

const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const data = [
  {
    key: "1",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face2}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Michael John</Title>
            <p>michael@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Manager</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/04/18</span>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face3}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Alexa Liras</Title>
            <p>alexa@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Programator</Title>
          <p>Developer</p>
        </div>
      </>
    ),

    status: (
      <Tag icon={<CheckCircleOutlined />} color="success">
        Active
      </Tag>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/12/20</span>
        </div>
      </>
    ),
  },

  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Laure Perrier</Title>
            <p>laure@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Executive</Title>
          <p>Projects</p>
        </div>
      </>
    ),

    status: (
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>03/04/21</span>
        </div>
      </>
    ),
  },
  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face4}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Miriam Eric</Title>
            <p>miriam@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Marketing</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <Tag icon={<CheckCircleOutlined />} color="success">
        Active
      </Tag>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>03/04/21</span>
        </div>
      </>
    ),
  },
  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face5}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Richard Gran</Title>
            <p>richard@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Manager</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <Tag icon={<CloseCircleOutlined />} color="error">
        Blocked
      </Tag>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/03/20</span>
        </div>
      </>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face6}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>John Levi</Title>
            <p>john@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Tester</Title>
          <p>Developer</p>
        </div>
      </>
    ),

    status: (
      <Tag icon={<CloseCircleOutlined />} color="error">
        Blocked
      </Tag>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>14/04/17</span>
        </div>
      </>
    ),
  },
];

function Tables() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [visible, setVisible] = useState(false);
  const [visibleE, setVisibleE] = useState(false);
  const { form } = useForm();
  const columns = [
    {
      title: "UseName",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "FUNCTION",
      dataIndex: "function",
      key: "function",
    },

    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "EMPLOYED",
      key: "employed",
      dataIndex: "employed",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: () => {
        return (
          <Space size="middle" direction="horizontal">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.preventDefault();
                setVisibleE(true);
              }}
            >
              Edit
            </Button>
            <Button danger onClick={(e) => e.preventDefault()}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const handleUpdate = () => {
    //todo
  };
  const handleAdd = () => {
    //todo
  };
  return (
    <Form form={form}>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="List Of Users"
              extra={
                <Space size="middle" direction="horizontal">
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="All">All</Radio.Button>
                    <Radio.Button value="Markiting">Markiting</Radio.Button>
                    <Radio.Button value="Analyste">Analyste </Radio.Button>
                  </Radio.Group>
                  <Tooltip title="Add">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={
                        <PlusOutlined
                          style={{
                            position: "relative",
                            margin: "5px 0px 5px 5px",
                          }}
                        />
                      }
                      size="large"
                      onClick={() => {
                        setVisible(true);
                      }}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={true}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <AddOrUpdateModal
        visible={visible}
        handleAddOrUpdate={handleAdd}
        onCancel={() => setVisible(false)}
        type="ADD"
      />
      <AddOrUpdateModal
        visible={visibleE}
        handleAddOrUpdate={handleUpdate}
        onCancel={() => setVisibleE(false)}
        type="EDIT"
      />
    </Form>
  );
}

export default Tables;
