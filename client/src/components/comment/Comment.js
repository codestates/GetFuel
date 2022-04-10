import React from "react";
import styles from './Comment.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"


function Comment (props) {
    const parseDate = new Date(props.createdAt).toLocaleDateString('ko-kr')
    

    
    return(
    <div className={styles.review}>
        <div className={styles.content}>
            <div className={styles.userInfo}>
                <div>
                    <div className={styles.idx}>{props.idx}</div>
                    <div className={styles.username}>{props.author.nickname}</div>
                    <div className={styles.createdAt}>{parseDate}</div>
                </div>
                <div>
                    <button className={styles.delete} onClick={() => props.handleDeleteComment(props.idx)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>  
                </div>                 
            </div>
            <div className={styles.comment}>{props.text}</div>
            <div className={styles.line}></div>
        </div>
    </div>
    )
}

export default Comment;

