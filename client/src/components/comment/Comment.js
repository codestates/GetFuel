import React from 'react';
import styles from './Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Comment({ post, axiosInstance, clickedInfo, setPosts }) {
  const parseDate = new Date(post.createdAt).toLocaleDateString('ko-kr');
  console.log(post);
  const handleDelete = async () => {
    await axiosInstance.delete(`/posts/${post.id}`);

    const stationPosts = await axiosInstance.get('/posts', {
      params: { code: `${clickedInfo.UNI_ID}` },
    });
    setPosts([...stationPosts.data]);
  };
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
      </div>
    </div>
  );
}

export default Comment;
