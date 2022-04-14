import React, { useEffect, useState } from "react";
import styles from './Reply.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function Reply ({comment, axiosInstance, clickedInfo, post, setPosts}) {
    
    const handleDeleteReply = async () => {
        if(window.confirm('댓글을 삭제 하시겠습니까?')) {
        await axiosInstance.delete(`/posts/${post.id}/comment`, {
            params: { commentId: `${comment._id}`}
        });
        
        const stationPosts = await axiosInstance.get('/posts', {
          params: { code: `${clickedInfo.UNI_ID}` },
        });
        setPosts([...stationPosts.data]);
    }
      };
    
    
    

    return(
        <div className={styles.replys}>
            <div>
                <div className={styles.line}></div>
                <span className={styles.username}>{`${comment.author.nickname} :`}</span>
                <span className={styles.comment}>{comment.text}</span>
            </div>
                <button className={styles.delete} onClick={handleDeleteReply} >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
        </div>
    )
}

export default Reply;