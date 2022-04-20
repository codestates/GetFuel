import React, { useEffect, useState } from 'react';
import styles from './Review.module.css';
import Comment from '../../components/comment/Comment';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

function Review({ userInfo, axiosInstance }) {
  const [posts, setPosts] = useState([]);
  const [station, setStation] = useState([]); // Comment에 props로 코드 내려줌
  const textareaRef = React.useRef();
  const location = useLocation();
  const clickedInfo = location.state.clickedInfo;
  const postsData = location.state.postsData;
  const history = useHistory()
//   axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.accessToken}`
    
  useEffect(() => {
      if(userInfo){
    axiosInstance.get('/posts', {
        params: { code: `${clickedInfo.UNI_ID}`}
    })
    .then((res) => {
        setPosts(res.data)
    })}
  }, [userInfo])

  
    // 게시물 등록
    const onSubmit = (e) => {
        e.preventDefault();
        const value = textareaRef.current.value
        if(!value) {
            alert('리뷰를 작성해 주세요.') // 모달로 바꾸기
            return;
        }else if(value.length < 10){
            alert('글자 수 길이는 10글자 이상이어야 합니다')
        }
        axiosInstance.post(`/posts/${clickedInfo.UNI_ID}`, { text: value },)
            .then(() => {
                textareaRef.current.value = '';
                axiosInstance.get('/posts', {
                    params: { code: `${clickedInfo.UNI_ID}`}
                })
                .then((res) => {
                    setPosts(res.data)
                })
        })
        .catch((err) => console.log('submit에러', err)) 
    }
    
    // 게시물 삭제
    const handleDeleteComment = (idx) => {
        if(window.confirm('해당 게시물을 삭제하시겠습니까?')){
    axiosInstance.delete(`posts/${posts[idx].id}`, {userId: userInfo.userId})
    .then(() => 
        axiosInstance.get('/posts', {
            params: { code: `${clickedInfo.UNI_ID}` }
        })
        .then((res) => setPosts(res.data))
        )
        .catch((err) => alert('자신 이외의 게시물은 삭제할 수 없습니다'))
    }
}
    
    // 게시물 수정
    const handleEditComment = (idx) => {
        
    axiosInstance.put(`posts/${posts[idx].id}`, {userId: userInfo.userId})
    .then(() => 
        axiosInstance.get('/posts', {
            params: { code: `${clickedInfo.UNI_ID}` }
        })
        .then((res) => setPosts(res.data))
        )
        .catch((err) => alert('수정이 완료되었습니다'))
    }


    const handleGoBack = () => {
        history.push('/map')
    } 

    
    const list = posts.map((v,idx) => (<Comment key={v.id} id={v.id} author={v.author} text={v.text}
                                                createdAt={v.createdAt} handleDeleteComment={handleDeleteComment}
                                                handleEditComment={handleEditComment}
                                                idx={idx} userInfo={userInfo}/>))
    return (
        <div>
            <button className={styles.out} onClick={handleGoBack}>x</button>
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
