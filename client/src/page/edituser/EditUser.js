import React from 'react';
import EditForm from '../../component/edit/EditForm';
import GetFuel from '../../GetFuel.png';
import styles from './EditUser.module.css'

const EditUser = () => {
    return (
        
        <div>
            <img className={styles.logo} src={GetFuel} />
            <EditForm>

            </EditForm>

          <div className={styles.button_bundle}>
            <a href='login' data-role="button" data-inline="true">
              <button className={styles.button}>Comfirm</button>
            </a>
            <a href=''  data-role="button" data-inline="true">
              <button className={styles.button}>Cancel</button>
            </a>
            <a href=''  data-role="button" data-inline="true">
            <button className={styles.button}>Delete Account</button>
          </a>
          </div>
        </div>
    );
};

export default EditUser;