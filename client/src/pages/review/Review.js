import React, { useEffect, useState } from 'react';
import styles from './Review.module.css';
import Comment from '../../components/comment/Comment';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router';

function Review({ accessToken, userInfo, loginFunctions, axiosInstance }) {
  const [posts, setPosts] = useState([]);
  const [station, setStation] = useState([]); // Comment에 props로 코드 내려줌
  const textareaRef = React.useRef();
  const location = useLocation();
  const clickedInfo = location.state.clickedInfo;
  const postsData = location.state.postsData;
  //console.log(clickedInfo);
  console.log(postsData);
  // 여기 state에 담아서 여기 state를 comment로 내려줌

  // 게시물 가져오기
  const Board = () => {
    axiosInstance
      .get('/posts', { code: clickedInfo.UNI_ID })
      .then((res) => {
        console.log('어떤데이터들어오나', res); // submit에러 해결 후 setposts 사용
      })
      .catch((err) => console.log('board에러', err));
  };
  // 게시물 등록
  const onSubmit = (e) => {
    e.preventDefault();
    const value = textareaRef.current.value;
    if (!value) {
      alert('리뷰를 작성해 주세요.'); // 모달로 바꾸기
      return;
    }
    console.log(clickedInfo.UNI_ID);
    axios
      .post(`http://localhost:8080/posts/${clickedInfo.UNI_ID}`, {
        text: value,
      })
      .then(() => {
        Board();
      })
      .catch((err) => console.log('submit에러', err));
  };

  useEffect(() => {
    setStation(clickedInfo);
  }, [clickedInfo]);

  return (
    <div>
      <div className={styles.commentForm}>
        <textarea
          className={styles.comment}
          placeholder="게시글 추가.."
          ref={textareaRef}
        ></textarea>
        <button className={styles.submit} onClick={onSubmit}>
          submit
        </button>
      </div>
      <div className={styles.line}></div>
      <div className={styles.comments}>
        <Route>
          <Comment station={station} />
        </Route>
      </div>
    </div>
  );
}

export default Review;
