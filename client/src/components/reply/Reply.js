import React from 'react';
import styles from './Reply.module.css';

function Reply() {
  const textareaRef = React.useRef();

  return (
    <>
      <div className={styles.username}></div>
      <div className={styles.reply}>
        <textarea
          className={styles.replyContent}
          placeholder='답글 달기..'
          ref={textareaRef}
        />
        <button className={styles.replyBtn}>등록</button>
      </div>
    </>
  );
}

export default Reply;
