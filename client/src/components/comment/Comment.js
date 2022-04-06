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

    // 게시물 가져오기, 쿼리로 
    async function getPosts() {
        try{
            const data = await axios.get('http://localhost:8080/posts');
        } catch(err) {
            console.log(err)
        }
    }
    // 게시물 삭제
    async function deletePost() {
        try{
            const data = await axios.delete('http://localhost:8080/posts/:postid')
        } catch(err) {
            console.log(err)
        }
    }
    // 게시물 등록

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
            <div> 댓글 보여주는곳 </div>
            <Reply/>
        </div>
    </li>
    )
}

export default Comment;

