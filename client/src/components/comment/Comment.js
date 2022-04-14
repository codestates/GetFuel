import React, { useEffect, useState } from 'react';
import styles from './Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Reply from '../reply/Reply';

function Comment({ post, axiosInstance, clickedInfo, setPosts, userInfo }) {
  const parseDate = new Date(post.createdAt).toLocaleDateString('ko-kr');
  const textareaRef = React.useRef();
  
  
  
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const text = textareaRef.current.value;
    textareaRef.current.value = '';
    
    await axiosInstance.post(`/posts/${post.id}/comment`, {
        text: text,
    });
    const stationComments = await axiosInstance.get('/posts', {
        params: {code: `${clickedInfo.UNI_ID}`},
    })
    setPosts([...stationComments.data])
}

  const handleDelete = async () => {
    if(window.confirm('게시물을 삭제 하시겠습니까?')){
    await axiosInstance.delete(`/posts/${post.id}`);
    
    const stationPosts = await axiosInstance.get('/posts', {
      params: { code: `${clickedInfo.UNI_ID}` },
    });
    setPosts([...stationPosts.data]);
  }
  };

  // const newComments = comments
  // console.log(post)
  
    


  return (
    <div className={styles.review}>
      <div className={styles.content}>
        <div className={styles.userInfo}>
          <div>
            <div className={styles.username}>{post.author.nickname}</div>
            <div className={styles.createdAt}>{parseDate}</div>
          </div>
          <div>
            <button className={styles.delete} onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        <div className={styles.comment}>{post.text}</div>
        <div className={styles.line}></div>
        {post.comments.map((comment) => (
          <Reply
            key={comment._id} 
            comment={comment}
            axiosInstance={axiosInstance}
            clickedInfo={clickedInfo}
            post={post}
            setPosts={setPosts}
          />
        ))}
        <div className={styles.confirm}>
            <textarea className={styles.replyContent} 
                        placeholder="답글 달기.."
                        ref={textareaRef} 
                        />
            <button className={styles.replyBtn} onClick={handleReplySubmit}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
