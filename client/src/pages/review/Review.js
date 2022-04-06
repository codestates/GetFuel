import React, { useState } from 'react';
import styles from './Review.module.css';
import Comment from '../../components/comment/Comment';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState('');

  // 게시글 submit 버튼
  const handleButtonClick = (e) => {
    const review = {
      post: text,
      createdAt: new Date().toLocaleDateString('ko-KR'),
    };
    const newReview = [review, ...reviews];
    setReviews(newReview);
  };

  // 게시글 내용
  const handlePostText = (e) => {
    setText(e.target.value);
  };
  // 게시글 삭제
  const handleDeleteReview = (deleteIndex) => {
    const deleteReview = reviews.filter((idx) => idx !== deleteIndex);
    setReviews(deleteReview);
  };

  // 게시글 보여주기
  const reviewsRender = (review, idx) => {
    return (
      <Comment
        key={idx}
        review={review}
        handleDeleteReview={handleDeleteReview}
      />
    );
  };

  return (
    <div>
      <div className={styles.commentForm}>
        <textarea
          className={styles.comment}
          placeholder='게시글 추가..'
          onChange={handlePostText}
          value={text}
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
