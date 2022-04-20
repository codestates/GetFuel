import React, { useState } from 'react';
import styles from './Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Reply from '../reply/Reply';

function Comment({ post, axiosInstance, clickedInfo, setPosts, userInfo }) {
  const parseDate = new Date(post.createdAt).toLocaleDateString('ko-kr');
  const textareaRef = React.useRef();
  const inputRef = React.useRef();
  const [isOpenComment, setIsOpenComment] = useState(false);

  // 댓글 보여주기
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const text = textareaRef.current.value;
    textareaRef.current.value = '';
    await axiosInstance.post(`/posts/${post.id}/comment`, {
      text,
    });
    const stationComments = await axiosInstance.get('/posts', {
      params: { code: `${clickedInfo.UNI_ID}` },
    });
    setPosts([...stationComments.data]);
  };
  
  // 게시물 삭제
  const handleDelete = async () => {
    if (window.confirm('게시물을 삭제 하시겠습니까?')) {
      await axiosInstance.delete(`/posts/${post.id}`);

      const stationPosts = await axiosInstance.get('/posts', {
        params: { code: `${clickedInfo.UNI_ID}` },
      });
      setPosts([...stationPosts.data]);
      alert('삭제 완료 되었습니다.');
    }
  };

  const handleOpenComment = () => {
    setIsOpenComment(true);
  };
  const handleCloseComment = () => {
    setIsOpenComment(false);
  };

  // 게시물 수정
  const handleUpdateComment = async () => {
    const text = inputRef.current.value;
    await axiosInstance.put(`/posts/${post.id}`, {
      text,
    });

    const stationPosts = await axiosInstance.get('/posts', {
      params: { code: `${clickedInfo.UNI_ID}` },
    });
    setPosts([...stationPosts.data]);
    setIsOpenComment(false);
    alert('수정 완료 되었습니다.');
  };
  
  return (
    <div className={styles.review}>
      <div className={styles.content}>
        <div className={styles.userInfo}>
          <div>
            <div className={styles.username}>{post.author.nickname}</div>
            <div className={styles.createdAt}>{parseDate}</div>
          </div>
          {userInfo.userId === post.author._id ?
          <div>
            <button className={styles.modify} onClick={handleOpenComment}>
              <FontAwesomeIcon icon={faPencil } /> 
            </button>
            <button className={styles.delete} onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>: <div></div>}
        </div>
        {isOpenComment === true ?
          <div className={styles.modifyContent}> 
            <input className={styles.modifyInput}
                      placeholder="수정할 게시글 내용을 입력하세요.."
                      ref={inputRef}
            />
            <button className={styles.cancle} onClick={handleCloseComment}>취소</button>
            <button className={styles.modifyConfirm} onClick={handleUpdateComment}>수정하기</button>
            </div>
        : <div className={styles.comment}>{post.text}</div>}
        <div className={styles.line}></div>
        {post.comments.map((comment) => (
          <Reply
            key={comment._id} 
            comment={comment}
            axiosInstance={axiosInstance}
            clickedInfo={clickedInfo}
            post={post}
            setPosts={setPosts}
            userInfo={userInfo}
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
