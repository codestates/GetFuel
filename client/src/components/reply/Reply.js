import React from "react";
import styles from './Reply.module.css'

const Reply = () => {


    return(
        <div className={styles.reply}>
            <textarea className={styles.replyContent} placeholder="답글 달기.." />
            <button className={styles.replyBtn}>등록</button>
        </div>
    )
}

export default Reply;