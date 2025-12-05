import React, { useState, useTransition } from 'react';
import styles from './AddBoard.module.css';
import { Link } from 'react-router-dom';
import releaseLogo from '@/assets/release-black-small.webp';
import api from '@/api/axios.js';

function AddBoard() {
    const [books, setBooks] = useState(null);
    const [members, setMembers] = useState(null);
    const { dataBooks, setDataBooks } = useState();
    const { dataMembers, setDataMembers } = useState();
    const { loadingBooks, startLoadingBooks } = useTransition();
    const { loadingMembers, startLoadingMembers } = useTransition();

    startLoadingBooks(async () => {
        await api.post('/api/books')
        .then(function (response) {
            const bookData = response.data;
            setDataBooks(bookData);
        })
        .catch(function (error) {
            console.error("로그인 에러:", error);
            setDataBooks([
                {"id": 1, "coverUrl": "", "titleMain": 'JavaScript 기초', "category": "web", "language": "한국어", "description": "예시 설명", "index": "1.2.3.", "author": "작가", "isLoaned": false},
                {"id": 2, "titleMain": 'React 입문', "isLoaned": true},
                {"id": 3, "titleMain": '웹 개발 완전 정복', "isLoaned": true}
            ]);
        })
        .finally(function () {
            setBooks(
                dataBooks.map(book =>
    <li key = {book.id} className={styles.bookItem}>
        <div className={styles.bookimage}>
            <img src="example_book.png" alt="Cover image of book" height={180} />
        </div>
        <div className={styles.bookinfo}>
            <p><b>{book.title}</b></p>
            <p>반납 예정일</p>
            <p>{book.due}</p>
        </div>
    </li>)
            );
      });
    });

    startLoadingMembers(async () => {
        await api.post('/member/list')
      .then(function (response) {
          const memberData = response.data;
          setDataMembers(memberData);
      })
      .catch(function (error) {
          console.error("로그인 에러:", error);
          setDataMembers([
            {
                "studentId": "admin",
                "name": "관리자",
                "phoneNumber": "010-0000-0000",
                "role": "ADMIN"
            },
            {
                "studentId": "20250000",
                "name": "이용자",
                "phoneNumber": "010-0000-0000",
                "role": "USER"
            }
        ]);
      })
      .finally(function () {
          setMembers(
            dataMembers.map(member =>
    <li key = {member.id} className={styles.memberItem}>
        <div className={styles.bookinfo}>
            <p><b>{member.name}</b></p>
            <p>학번: {member.id}</p>
            <p>대출 권수: {}</p> //TODO: MemberListDto에 대출 권수 추가
        </div>
    </li>));
      })
    });

    var dataBooksPlaceHolder = <li></li>;
    var dataMembersPlaceHolder = <li></li>;

    if (loadingBooks) {dataBooksPlaceHolder = <li className = {styles.bookItem}><div className={styles.bookinfo}><p>로딩중...</p></div></li>}
    if  (loadingMembers) {dataMembersPlaceHolder = <li className= {styles.memberItem}><div className={styles.memberItem}><p>로딩중...</p></div></li>}
    
    //TODO: MemberListDto에 대출 권수 추가 // 아직 안하기로 했음 member 상세 페이지 만들어서 거기에 표시하기로
    
    /*
    setBooks(
        dataBooks.map(book =>
    <li key = {book.id} className={styles.bookItem}>
        <div className={styles.bookimage}>
            <img src="example_book.png" alt="Cover image of book" height={180} />
        </div>
        <div className={styles.bookinfo}>
            <p><b>{book.title}</b></p>
            <p>반납 예정일</p>
            <p>{book.due}</p>
        </div>
    </li>)
    );

    setMembers(
        dataMembers.map(member =>
    <li key = {member.id} className={styles.memberItem}>
        <div className={styles.bookinfo}>
            <p><b>{member.name}</b></p>
            <p>학번: {member.id}</p>
            <p>대출 권수: {}</p> //TODO: MemberListDto에 대출 권수 추가
        </div>
    </li>)
    );
    */
    
    return (
    <div className={styles.pageOutline}>
        <Link to="/" className={styles.logoButton}>
            <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
        </Link>
        <div className={styles.container}>
            <div className={styles.box}>
                <header className={styles.barHeader}>
                    <p className={styles.barHeaderTitle}>회원 관리</p>
                    <button className={styles.barHeaderButton}>+</button>
                </header>
                <div className={styles.content}>
                    <ul className={styles.memberList}>{loadingMembers?dataMembersPlaceHolder:members}</ul>
                </div>
            </div>
            <div className={styles.box}>
                <header className={styles.barHeader}>
                    <p className={styles.barHeaderTitle}>도서 관리</p>
                    <button className={styles.barHeaderButton}>+</button>
                </header>
                <div className={styles.content}>
                    <ul className={styles.bookList}>{loadingBooks?dataBooksPlaceHolder:books}</ul>
                </div>
            </div>
        </div>
    </div>
    );
}

export default AddBoard;