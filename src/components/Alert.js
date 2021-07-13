import React, { useEffect } from "react";

function Alert({ show, msg, type, removeAlert }) {
  useEffect(() => {
    const timeout = setInterval(() => {
      removeAlert();
      console.log("effect mount");
    }, 3000);
    console.log("jgigiehgi");

    return () => {
      clearInterval(timeout);
    };
  }, []);
  return <p className={`alert alert-${type}`}>{msg}</p>;
}

export default Alert;
