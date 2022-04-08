import React, { useState } from "react";
import styles from './Comment.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import Reply from "../reply/Reply";
import axios from "axios";

function Comment (props) {
    const [code, setCode] = useState([]);
    const [post, setPost] = useState();
    const [comment, setComment] = useState();
    const parseDate = new Date(props.createdAt).toLocaleDateString('ko-kr')
    
    
    
    return(
    
    <li className={styles.review}>
        <div className={styles.content}>
            <div className={styles.userInfo}>
                <div>
                    <div className={styles.username}>{props.nicname}</div>
                    <div className={styles.createdAt}>{parseDate}</div>
                </div>
                <div>
                    <button className={styles.modify}>
                    <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className={styles.delete} onClick={props.handleDeleteComment}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>                    
            </div>
            <div className={styles.comment}>{props.text}</div>
            <div className={styles.line}></div>
            <Reply/>
        </div>
    </li>
    )
}

export default Comment;

