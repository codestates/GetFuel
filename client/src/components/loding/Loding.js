import React from "react";
import styles from "./Loding.module.css";

export default function Loading() {
    return (
      <div className={styles.spinner}>
        <div className={styles.loading}></div>
      </div>
    );
  }