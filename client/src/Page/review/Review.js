import React, { useState } from 'react';
import styles from './Review.module.css';
import Comment from '../component/nav/Nav';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [msg, setMsg] = useState('');

  const handleButtonClick = (e) => {
    const review = {
      comment: msg,
      createdAt: new Date().toLocaleDateString('ko-KR'),
    };
    const newReview = [review, ...reviews];
    setReviews(newReview);
  };

  const handleMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleDeleteReview = (deleteIndex) => {
    const deleteReview = reviews.filter((idx) => idx !== deleteIndex);
    setReviews(deleteReview);
  };

  const reviewsRender = (review, idx) => {
    return (
      <Comment
        review={review}
        handleDeleteReview={handleDeleteReview}
        idx={idx}
      />
    );
  };

  return (
    <div>
      <div className={styles.commentForm}>
        <textarea
          className={styles.comment}
          placeholder='게시글 추가..'
          onChange={handleMsg}
        ></textarea>
        <button className={styles.submit} onClick={handleButtonClick}>
          submit
        </button>
      </div>
      <div className={styles.line}></div>
      <div className={styles.comments}>{reviews.map(reviewsRender)}</div>
    </div>
  );
}

export default Review;
