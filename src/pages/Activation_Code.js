import axios from "axios";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";
export default function Activation_Code() {
  const hist = useHistory();

  const { emailToken } = useParams;
  axios.post(`http://10.10.50.24:3017/api/verify-email/${emailToken}`);
  return <div>Activation_Code</div>;
}
