import React, { useState } from "react";
import styles from './Reply.module.css'

function Reply () {
    const textareaRef = React.useRef();
    
    // const onReplySubmit = (e) => {
    //     e.prevenDefault();
    //     const value = textareaRef.current.value
        
    // }


    return(
        <div className={styles.reply}>
            <textarea className={styles.replyContent} 
                        placeholder="답글 달기.." 
                        ref={textareaRef}
                        />
            <button className={styles.replyBtn}>등록</button>
        </div>
    )
}

export default Reply;