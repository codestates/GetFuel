import React, { useState } from "react";
import styles from './Comment.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import Reply from "../reply/Reply";

function Comment ({ review, handleDeleteReview, idx }) {
    const parseDate = new Date().toLocaleDateString('ko-kr')

    // const = axios.get(`http://localhost:8080/posts`)

    return(

    <li className={styles.review}>
        <div className={styles.content}>
            <div className={styles.userInfo}>
                <div>
                    <div className={styles.username}>김정훈</div>
                    <div className={styles.createdAt}>{parseDate}</div>
                </div>
                <div>
                    <button className={styles.modify}>
                    <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className={styles.delete}
                            onClick={() => handleDeleteReview(idx)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>                    
            </div>
            <div className={styles.comment}>{review.post}</div>
            <Reply />
        </div>
    </li>
    )
}

export default Comment;

