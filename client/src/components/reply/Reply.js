import React, { useState } from "react";
import styles from './Reply.module.css'


function Reply ({props}) {
    const textareaRef = React.useRef();
    
    console.log(props)


    return(
        <>
        <div className={styles.username}></div>
        <div className={styles.reply}>
            <textarea className={styles.replyContent} 
                        placeholder="답글 달기.." 
                        ref={textareaRef}
                        />
            <button className={styles.replyBtn}>등록</button>
        </div>
        </>
    )
}

export default Reply;