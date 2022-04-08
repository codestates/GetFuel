import React, { useEffect, useState } from 'react';
import styles from './Review.module.css';
import Comment from '../../components/comment/Comment';
import axios from 'axios';
import { useLocation } from 'react-router';

function Review({ accessToken, userInfo, loginFunctions, axiosInstance }) {
  const [posts, setPosts] = useState([]);
  const [station, setStation] = useState([]); // Comment에 props로 코드 내려줌
  const textareaRef = React.useRef();
  const location = useLocation();
  const clickedInfo = location.state.clickedInfo;
  const postsData = location.state.postsData;
  const [id, setId] = useState(0) //postId찾기위함
  

  useEffect(() => {
    axiosInstance.get('/posts', {
        params: { code: `${clickedInfo.UNI_ID}`}
    })
    .then((res) => setPosts(res.data))
  }, [])

  
    // 게시물 등록
    const onSubmit = (e) => {
        e.preventDefault();
        const value = textareaRef.current.value
        if(!value) {
            alert('리뷰를 작성해 주세요.') // 모달로 바꾸기
            return;
        }
        axios.post(`http://localhost:8080/posts/${clickedInfo.UNI_ID}`, { text: value },)
            .then(() => {
                axiosInstance.get('/posts', {
                    params: { code: `${clickedInfo.UNI_ID}`}
                })
                .then((res) => setPosts(res.data))
        })
        .catch((err) => console.log('submit에러', err)) 
    }
    
    // 게시물 삭제
    const handleDeleteComment = (e) => {
        e.preventDefault();
        if(window.confirm('해당 게시물을 삭제하시겠습니까?')){
    axiosInstance.delete(`posts/${posts[0].id}`, {userId: userInfo.userId})
    .then(() => 
        axiosInstance.get('/posts', {
            params: { code: `${clickedInfo.UNI_ID}` }
        })
        .then((res) => setPosts(res.data))
        )
    }
}
//onClick으로 

    
const list = posts.map((v) => (<Comment key={v.id} id={v.nickname} text={v.text} createdAt={v.createdAt} handleDeleteComment={handleDeleteComment}/>))
    return (
        <div>
            <form onSubmit={onSubmit}>
            <div className={styles.board}>
                <textarea className={styles.post}
                            placeholder="게시글 추가.."
                            ref={textareaRef}
                            >
                </textarea>
                <button className={styles.submit} >submit</button>
            </div>
            </form>
            <div className={styles.line}></div>
            {list}
        </div>
    )
}

export default Review;
