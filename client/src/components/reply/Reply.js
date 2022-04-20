import React, { useState } from 'react';
import styles from './Reply.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Reply({
  comment,
  axiosInstance,
  clickedInfo,
  post,
  setPosts,
  userInfo,
}) {
  const inputRef = React.useRef();
  const [isOpenReply, setIsOpenReply] = useState(false);

  const handleOpenReply = () => {
    setIsOpenReply(true);
  };
  const handleCloseReply = () => {
    setIsOpenReply(false);
  };
  // 댓글 삭제
  const handleDeleteReply = async () => {
    if (window.confirm('댓글을 삭제 하시겠습니까?')) {
      await axiosInstance.delete(`/posts/${post.id}/comment`, {
        params: { commentId: `${comment._id}` },
      });

      const stationPosts = await axiosInstance.get('/posts', {
        params: { code: `${clickedInfo.UNI_ID}` },
      });
      setPosts([...stationPosts.data]);
    }
  };
  // 댓글 수정
  const handleUpdateReply = async () => {
    const text = inputRef.current.value;
    await axiosInstance.put(
      `/posts/${post.id}/comment`,
      {
        text,
      },
      { params: { commentId: `${comment._id}` } }
    );

    const stationPosts = await axiosInstance.get('/posts', {
      params: { code: `${clickedInfo.UNI_ID}` },
    });
    setPosts([...stationPosts.data]);
    setIsOpenReply(false);
    alert('수정 완료 되었습니다.');
  };

  return (
    <div className={styles.replys}>
      <div>
        <div className={styles.line}></div>
        <span
          className={styles.username}
        >{`${comment.author.nickname} :`}</span>
        {isOpenReply === true ? (
          <span className={styles.modifyContent}>
            <input
              className={styles.modifyInput}
              placeholder="수정할 댓글 내용을 입력하세요.."
              ref={inputRef}
            />
            <button className={styles.cancle} onClick={handleCloseReply}>
              취소
            </button>
            <button
              className={styles.modifyConfirm}
              onClick={handleUpdateReply}
            >
              수정하기
            </button>
          </span>
        ) : (
          <span className={styles.comment}>{comment.text}</span>
        )}
      </div>
      {userInfo.userId === comment.author._id ? (
        <div>
          <button className={styles.modify}>
            <FontAwesomeIcon icon={faPencil} onClick={handleOpenReply} />
          </button>
          <button className={styles.delete} onClick={handleDeleteReply}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Reply;
