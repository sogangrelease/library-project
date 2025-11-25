import styles from './AddBoard.module.css'; 
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import releaseLogo from '@/assets/release-black-small.webp';
import { useFetchGet, useFetchPost } from '@/hooks/useFetch';

 const API_BASE_URL = "";

async function GetBook() {
    var response;
    try {
      response = await axios.get("${API_BASE_URL}/api/books");
    } catch {
      alert("책 정보를 불러오는 데 문제가 발생했습니다");
      response = [
        {"id": 1, "coverUrl": "", "titleMain": 'JavaScript 기초', "category": "web", "language": "한국어", "description": "예시 설명", "index": "1.2.3.", "author": "작가", "isLoaned": false},
        {"id": 2, "titleMain": 'React 입문', "isLoaned": true},
        {"id": 3, "titleMain": '웹 개발 완전 정복', "isLoaned": true}
        ];
    }
    return response;
}

async function GetMember() {
    try {
        const responst = await axios.post("${API_BASE_URL}/member/list");
        return responst;
    } catch {
        alert("멤버 정보를 불러오는 데 문제가 발생했습니다");
        const responst = [
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
        ];
        return responst;
    }
}

function AddBoard() {
    const { dataBooks, loadingBooks, errorBooks } = useFetchGet("/api/books");
    const { dataMembers, loadingMembers, errorMembers } = useFetchPost("/member/list");

    var dataBooksPlaceHolder = <li></li>;
    var dataMembersPlaceHolder = <li></li>;

    if (loadingBooks) {dataBooksPlaceHolder = <li className = {styles.bookItem}><div className={styles.bookinfo}><p>로딩중...</p></div></li>}
    if  (loadingMembers) {dataMembersPlaceHolder = <li className= {styles.memberItem}><div className={styles.memberItem}><p>로딩중...</p></div></li>}
    if (errorBooks) {
        dataBooksPlaceHolder = [
        {"id": 1, "coverUrl": "", "titleMain": 'JavaScript 기초', "category": "web", "language": "한국어", "description": "예시 설명", "index": "1.2.3.", "author": "작가", "isLoaned": false},
        {"id": 2, "titleMain": 'React 입문', "isLoaned": true},
        {"id": 3, "titleMain": '웹 개발 완전 정복', "isLoaned": true}
        ].map(book =>
    <li key = {book.id} className={styles.bookItem}>
        <div className={styles.bookimage}>
            <img src="example_book.png" alt="Cover image of book" height={180} />
        </div>
        <div className={styles.bookinfo}>
            <p><b>{book.titleMain}</b></p>
            <p>반납 예정일</p>
            <p>{book.isLoaned}</p>
        </div>
    </li>);
    }
    if (errorMembers) {
        dataMembersPlaceHolder = [
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
        ].map(member =>
    <li key = {member.id} className={styles.memberItem}>
        <div className={styles.bookinfo}>
            <p><b>{member.name}</b></p>
            <p>학번: {member.studentId}</p>
            <p>대출 권수: {}</p> //TODO: MemberListDto에 대출 권수 추가 // 아직 안하기로 했음 member 상세 페이지 만들어서 거기에 표시하기로
        </div>
    </li>
        );
    }
    
    var books = dataBooks.map(book =>
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

    var members = dataMembers.map(member =>
    <li key = {member.id} className={styles.memberItem}>
        <div className={styles.bookinfo}>
            <p><b>{member.name}</b></p>
            <p>학번: {member.id}</p>
            <p>대출 권수: {}</p> //TODO: MemberListDto에 대출 권수 추가
        </div>
    </li>
    );
    
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