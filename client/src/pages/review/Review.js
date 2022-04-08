import React, { useEffect, useState } from "react";
import styles from './Review.module.css'
import axios from "axios";
import {useLocation} from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import Comment from "../../components/comment/Comment";


function Review () {
    const parseDate = new Date().toLocaleDateString('ko-kr')
    const [posts, setPosts] = useState([]);
    const [station, setStation] = useState([]); // Comment에 props로 코드 내려줌 
    const textareaRef = React.useRef()
    const location = useLocation();
    const clickedInfo = location.state.clickedInfo;
    const userInfo = location.state.userInfo 
    
    
    // 게시물 가져오기
    useEffect(() => {
        axios.get('http://localhost:8080/posts', {params: { code : clickedInfo.UNI_ID}})
            .then((res) => { setPosts(res) })
            .catch((err) => console.log('겟에러', err))
    },[])
    console.log(posts)
    // const Board = () => {
    //     axios
    //     .get('http://localhost:8080/posts', { code: clickedInfo.UNI_ID})
    //     .then((res) => {
    //         setPosts(res)
    //     })
    //     .catch((err) => console.log('board에러', err))
    // }
    
    // 게시물 등록
    const onSubmit = (e) => {
        e.preventDefault();
        const value = textareaRef.current.value
        if(!value) {
            alert('리뷰를 작성해 주세요.') // 모달로 바꾸기
            return;
        }
        axios.post(`http://localhost:8080/posts/${clickedInfo.UNI_ID}`, { text: value },)
            .then((res) => {
            console.log('여기입니다', res)
            setPosts(res)
        })
        .catch((err) => console.log('submit에러', err)) 
    }
 
    // useEffect(()=>{
    //     setStation(clickedInfo)
    // },[clickedInfo])

    const commentRender = (text, id) => {
        if(posts){
        return (
            <Comment
            text={text}
            id={id}
            posts={posts}
            />
        )
        }
    }

    return (
        <div>
            <div className={styles.board}>
                <textarea className={styles.post}
                            placeholder="게시글 추가.."
                            ref={textareaRef}
                            >
                </textarea>
                <button className={styles.submit} onClick={onSubmit}>submit</button>
            </div>
            <div className={styles.line}></div>
            <Comment posts={posts}/>
        </div>
    )
}

export default Review;