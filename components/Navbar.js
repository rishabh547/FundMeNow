import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default (props) => {
  const [displayText, setDisplayText] = useState("Connect Wallet");

  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const connectWallet = async (e) => {
    e.preventDefault();
    if (isMetaMaskInstalled()) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts[0]) {
        alert("Connected to MetaMask");
        setDisplayText("Connected");
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <div className={styles.nav}>
      <Link href="/">
        <a>
          <div className={styles.navLink}>
            <h3>FundMeNow</h3>
          </div>
        </a>
      </Link>

      <Link href="/campaigns">
        <a>
          <div className={styles.navLink}>
            <h3>Campaigns</h3>
          </div>
        </a>
      </Link>
      <Link href="campaigns/new">
        <a>
          <div className={styles.navLink}>
            <h3>Create</h3>
          </div>
        </a>
      </Link>
      <div style={{ marginTop: "20px" }} className={styles.buttonContainer}>
        <button className={styles.connectWB} onClick={connectWallet}>{displayText}</button>
      </div>
    </div >
  );
};
