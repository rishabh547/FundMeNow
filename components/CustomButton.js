import React from "react";
import Head from "next/head";
import Link from "next/link";

export default (props) => {
  return (
    <Link href={props.link}>
      <a>
        <button >{props.children}</button>
      </a>
    </Link>
  );
};
