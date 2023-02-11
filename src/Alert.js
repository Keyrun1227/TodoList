import React, { useEffect } from "react";

const Alert = ({ message, type, setAlert }) => {
  useEffect(() => {
    setTimeout(() => {
      setAlert({ status: false, type: "", message: "" });
    }, 3000);
  }, []);

  return <div className={`alert ${type}`}>{message}</div>;
};

export default Alert;
