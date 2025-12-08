import React, { useState, useEffect } from 'react';
import styles from './MemberAddDialog.module.css';
import Dialog from '@/components/Dialog';
import api from '@/api/axios.js';

function MemberInfoDialog() {
    let 회원 = {
        이름: '',
        학번: '',
        전화번호: ''
    };
    const [passwordForm, setPasswordForm] = useState({
        password: '',
    });

    return <Dialog title='회원 추가'>
        <input className={styles.input} type='text' placeholder='회원 이름' value={회원.이름} name='이름' />
        <input className={styles.input} type='text' placeholder='학번 : ' value={회원.학번} name='학번' />
        <input className={styles.input} type='text' placeholder='전화번호 : ' value={회원.전화번호} name='전화번호' />
        <input class={styles.input} type='password' placeholder='초기 비밀번호' value={passwordForm.currentPassword} name='초기 비밀번호' required />
        <button className={styles.button} type='submit'>계정 생성</button>
    </ Dialog>
}

export default MemberInfoDialog;