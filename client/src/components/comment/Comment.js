import React, { useState } from "react";
import styles from './Comment.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import Reply from "../reply/Reply";
import axios from "axios";

function Comment ({station}) {
    const parseDate = new Date().toLocaleDateString('ko-kr')
    const [code, setCode] = useState([]);
    const [post, setPost] = useState();
    const [comment, setComment] = useState();
    // console.log('잘나오나', station)

    

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
                    <button className={styles.delete}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>                    
            </div>
            <div className={styles.comment}></div>
            <Reply/>
            <div> 댓글 보여주는곳 </div>
        </div>
    </li>
    )
}

export default Comment;

