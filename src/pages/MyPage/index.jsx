import { useState } from 'react';
import styles from './MyPage.module.css'; 

function MyPage() {
    const accountOnServer = {이름: '홍길동', 학번: '202312345', 전화번호: '010-1234-5678'};
    const booksOnServer = [
        {id: 1, title: 'JavaScript 기초', due: '2024-07-15'},
        {id: 2, title: 'React 입문', due: '2024-07-20'},
        {id: 3, title: '웹 개발 완전 정복', due: '2024-07-25'}
    ];

    const account = accountOnServer;
    const books = booksOnServer.map(book =>
    <li key = {book.id} className={styles.bookItem}>
        <div className={styles.bookimage}>
            <img src="example_book.png" alt="Cover image of book" height={180} />
        </div>
        <div className={styles.bookinfo}>
            <p><b>{book.title}</b></p>
            <p>반납 예정일</p>
            <p>{book.due}</p>
        </div>
    </li>
    );
    return (
    <>
        <div className={styles.container}>
            <div className={styles.box}>
                <header className={styles.header}>
                    <p className={styles.headerTitle}>대출 현황</p>
                </header>
                <div className={styles.content}>
                    <ul className={styles.bookList}>{books}</ul>
                </div>
            </div>
            <div className={styles.box}>
                <header className={styles.header}>
                    <p className={styles.headerTitle}>정보 수정</p>
                </header>
                <div className={styles.content}>
                    <form className={styles.form}>
                        <input className={styles.input} type='text' disabled placeholder='이름' value={account.이름} name='이름' prefix='이름' />
                        <input className={styles.input} type='text' disabled placeholder='학번' value={account.학번} name='학번' prefix='이름' />
                        <input className={styles.input} type='text' disabled placeholder='전화번호' value={account.전화번호} name='전화번호' prefix='이름' />
                    </form>
                    <form className={styles.form}>
                        <input className={styles.input} type='password' placeholder='현재 비밀번호' name='현재 비밀번호' required />
                        <input className={styles.input} type='password' placeholder='변경할 비밀번호' name='변경할 비밀번호' required />
                        <input className={styles.input} type='password' placeholder='변경할 비밀번호 확인' name='변경할 비밀번호 확인' required />
                    </form>
                    <button className={styles.button} type='button' name='비밀번호 변경'>비밀번호 변경</button>
                </div>
            </div>
        </div>
    </>
    );
}

export default MyPage