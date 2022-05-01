import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import CustomButton from "./CustomButton";
import styles from "../styles/Hero.module.css";
import bannerImage from "../assets/undraw_ethereum_re_0m68.svg";

export default (props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>FundMe</h1>
          <h1>Now</h1>
          <div className={styles.content}>
            <h5>Fund your dreams on the blockchain...</h5>
          </div>
        </div>
        <div className={styles.banner}>
          <div className={styles.imageContainer}>
            <img className={styles.bannerImage} src={bannerImage.src} alt="" />
          </div>
        </div>
      </div>
      {/* <div className={styles.buttonContainer}>
        <CustomButton link="/campaigns/new">Create Campaign</CustomButton>
        <CustomButton link="/campaigns">View Campaigns</CustomButton>
      </div> */}
    </>
  );
};
