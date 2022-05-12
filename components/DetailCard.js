import React from "react";
import Head from "next/head";
import Link from "next/link";

export default (props) => {
  return (
    <div >
      <p>{props.heading}</p>
      <p>{props.value}</p>
    </div>
  );
};
