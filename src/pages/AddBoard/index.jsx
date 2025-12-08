import React, { useState, useEffect } from 'react';
import styles from './AddBoard.module.css';
import { Link } from 'react-router-dom';
import releaseLogo from '@/assets/release-black-small.webp';
import api from '@/api/axios.js';

function ShowMemberList() {
    
    const [dataMembers, setDataMembers] = useState([
        {
            "studentId": "Loading...",
            "name": "로딩중...",
        }
    ]/*[
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
    ]*/);
            
    useEffect (() => {
        api.get('/member/list')
        .then (
            (response) => {
                setDataMembers(response.data);
            }
        )
        .catch (
            (reason) => {
                console.error("회원 정보를 불러오던 중 오류 발생:", reason);
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
            }
        )
    }, []);
    
    const members = (
        dataMembers.map(member =>
            <li key = {member.studentId} className={styles.memberItem}>
                <div className={styles.memberInfo}>
                    <p><b>{member.name}</b></p>
                    <p>학번: {member.studentId}</p>
                    {/*<p>대출 권수: {}</p> {/*TODO: MemberListDto에 대출 권수 추가 /* 아직 안하기로 했음 member 상세 페이지 만들어서 거기에 표시하기로*/}
                </div>
            </li>
        )
    );
    
    return <ul className={styles.memberList}>
        {
            (members)
        }
    </ul>;
}

function ShowBookList() {
    const [dataBooks, setDataBooks] = useState([
        {"id": 1, "coverUrl": "", "titleMain": 'JavaScript 기초', "category": "web", "language": "한국어", "description": "예시 설명", "index": "1.2.3.", "author": "작가", "isLoaned": false},
        {"id": 2, "titleMain": 'React 입문', "isLoaned": true},
        {"id": 3, "titleMain": '웹 개발 완전 정복', "isLoaned": true}
    ]);

    useEffect (() => {
        api.get('/api/books')
        .then(
            (response) => {
                setDataBooks(response.data);
            }
        )
        .catch(
            (error) => {
                console.error("데이터 로드 중 오류 발생:", error);

                setDataBooks([
                    {"id": 1, "coverUrl": "", "titleMain": 'JavaScript 기초', "category": "web", "language": "한국어", "description": "예시 설명", "index": "1.2.3.", "author": "작가", "isLoaned": false},
                    {"id": 2, "titleMain": 'React 입문', "isLoaned": true},
                    {"id": 3, "titleMain": '웹 개발 완전 정복', "isLoaned": true}
                ]);
            }
        )
    }, []);
    
    const books = dataBooks.map(book =>
        <li key = {book.id} className={styles.bookItem}>
            <div className={styles.bookimage}>
                <img src={book.coverUrl || "example_book.png"} alt="Cover image of book" height={180} />
            </div>
            <div className={styles.bookinfo}>
                <p><b>{book.titleMain}</b></p>
                <p>반납 예정일</p>
                <p>{book.due}</p>
            </div>
        </li>
    );
    
    return <ul className={styles.bookList}>
        {
            (books)
        }
    </ul>;
}

function AddBoard() {
    
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
                    <ShowMemberList />
                </div>
            </div>
            <div className={styles.box}>
                <header className={styles.barHeader}>
                    <p className={styles.barHeaderTitle}>도서 관리</p>
                    <button className={styles.barHeaderButton}>+</button>
                </header>
                <div className={styles.content}>
                    <ShowBookList />
                </div>
            </div>
        </div>
    </div>
    );
}

export default AddBoard;