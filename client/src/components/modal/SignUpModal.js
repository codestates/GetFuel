import React from 'react';
import styles from './SignUpModal.module.css';

function SignUpModal(props) {
  // 회원가입 모달 작성
  const { openModal, closeModal } = props;

  return (
    <div>
      <div className={styles.modalbox}>
        <div className={openModal ? 'openModal modal' : 'modal'}>
          {openModal ? (
            <section>
              <header>
                <div className={styles.text}>
                  회원가입이
                  <br />
                  <br />
                  완료되었습니다!
                </div>
              </header>
              <footer>
                <a href='login' data-role='button' data-inline='true'>
                  <button onClick={closeModal} className={styles.close}>
                    Confirm
                  </button>
                </a>
              </footer>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
