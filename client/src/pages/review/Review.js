import React, { useEffect, useState } from 'react';
import styles from './Review.module.css';
import Comment from '../../components/comment/Comment';
import { useLocation } from 'react-router';
import GetFuel from '../../newgetfuel.png';
import { useHistory } from 'react-router-dom';

function Review({ userInfo, axiosInstance, setIsLogin, isLogin }) {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const textareaRef = React.useRef();
  const location = useLocation();
  const clickedInfo = location.state.clickedInfo; // click 된 주유소 정보

  useEffect(async () => {
    if (!userInfo) {
      return;
    }
    const stationPosts = await axiosInstance.get('/posts', {
      params: { code: `${clickedInfo.UNI_ID}` },
    });
    setPosts([...stationPosts.data]);
  }, [userInfo]);

  // 버튼 클릭시 게시물 등록
  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = textareaRef.current.value;
    textareaRef.current.value = '';

    await axiosInstance.post(`/posts/${clickedInfo.UNI_ID}`, {
      text,
    });
    const stationPosts = await axiosInstance.get('/posts', {
      params: { code: `${clickedInfo.UNI_ID}` },
    });
    setPosts([...stationPosts.data]);
  };

  const handleGoBack = () => {
    history.push('/map');
  };

  const handleLogout = async () => {
    setIsLogin(false);

    await axiosInstance('/auth/signout');
    history.push('/');
  };

  return (
    <>
      {userInfo && (
        <div>
          <div className={styles.nav}>
            <img className={styles.logo} src={GetFuel} onClick={handleGoBack} />
            <div className={styles.menu}>
              {isLogin && localStorage.getItem('loginType') === 'user' ? (
                <button
                  className={styles.btn}
                  onClick={() => history.push('/edituser')}
                >
                  Edit Profile
                </button>
              ) : (
                <button></button>
              )}

              {isLogin ? (
                <button className={styles.btn} onClick={handleLogout}>
                  Sign Out
                </button>
              ) : (
                <button></button>
              )}
            </div>
          </div>
          <div className={styles.commentForm}>
            <form onSubmit={handleSubmit}>
              <textarea
                className={styles.comment}
                placeholder='게시글 추가..'
                ref={textareaRef}
              ></textarea>
              <button className={styles.submit}>submit</button>
            </form>
          </div>
          <div className={styles.line}></div>
          <div className={styles.comments}>
            {posts.map((post) => (
              <Comment
                post={post}
                key={post.id}
                axiosInstance={axiosInstance}
                setPosts={setPosts}
                clickedInfo={clickedInfo}
                userInfo={userInfo}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default Review;
