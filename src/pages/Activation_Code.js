import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
export default function Activation_Code() {
  const { emailToken } = useParams;
  axios.post(`http://localhost:3010/api/verify-email/${emailToken}`);
  return <div>Activation_Code</div>;
}
