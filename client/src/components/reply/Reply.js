import React, { useState } from "react";
import styles from './Reply.module.css'

function Reply () {
    const [ replys, setReplys ] = useState([]);
    const [ comment, setComment ] = useState('');

    const handleButtonClick = (e) => {
        const reply = {
            post: comment,
        }
        const newReply = [reply, ...replys];
        setReplys(newReply);
    }

    const handleReplyMsg = (e) => {
        setComment(e.target.value)
    }


    return(
        <div className={styles.reply}>
            <textarea className={styles.replyContent} placeholder="답글 달기.."  />
            <button className={styles.replyBtn}>등록</button>
        </div>
    )
}

export default Reply;