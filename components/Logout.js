import React from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/Logout.module.css";
import Router from 'next/router';

export default function Logout(){
  const onLogout = async () => {
    const req = await fetch('http://localhost:3000/api/logout');
    const data = await req.json();

    if (!data.loggedIn) {
      Router.push("/login");
    }
  };

  return (
    <div className={styles.logout}>
      <Button type="primary" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}
