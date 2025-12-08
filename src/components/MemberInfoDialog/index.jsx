import React, { useState, useEffect, useRef } from 'react';
import styles from './MemberInfoDialog.module.css';
import Dialog from '@/components/Dialog';
import api from '@/api/axios.js';

function MemberInfoDialog({ memberInfo = {name: '', studentId: '', phoneNumber: ''} }) {
    const [loanedBooks, setLoanedBooks] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    // const [changePhoneNumber, setChangePhoneNumber] = useState([]);
    const dialogRef = useRef(null);

    const dialogOpen = () => setIsOpen(true);
    const dialogClose = () => {
        setIsOpen(false);
    } 

    const handleClose = () => {
        dialogClose();
    };

    // const handlePhoneChange = (e) => {
    //     setChangePhoneNumber(e.target.value);
    // };

    useEffect (() => {
        if (isOpen) {
            dialogRef.current?.showModal();

            api.post('/member/borrow/list', { studentId: memberInfo.name })
            .then(
                (response) => {
                    setLoanedBooks(response.data);
                }
            )
            .catch(
                (error) => {
                    console.error("데이터 로드 중 오류 발생:", error);
                    console.log("더미 데이터를 가져옵니다.");

                    setLoanedBooks([
                        {"id": 1, "coverUrl": "", "titleMain": 'JavaScript 기초', "category": "web", "language": "한국어", "description": "예시 설명", "index": "1.2.3.", "author": "작가", "isLoaned": false},
                        {"id": 2, "titleMain": 'React 입문', "isLoaned": true},
                        {"id": 3, "titleMain": '웹 개발 완전 정복', "isLoaned": true}
                    ]);
                }
            )

        } else {
            dialogRef.current?.close();
        }
    }, [memberInfo, isOpen, dialogRef]);
    
    const books = loanedBooks.map(book =>
        <li key = {book.id} className={styles.bookItem}>
            {/* <div className={styles.bookimage}>
                <img src={book.coverUrl || "example_book.png"} alt="Cover image of book" height={180} />
            </div> */}
            <div className={styles.bookinfo}>
                <p><b>{book.titleMain}</b></p>
                <p>반납 예정일</p>
                <p>{book.due}</p>
            </div>
        </li>
    );

    return <li key = {memberInfo.studentId} className={styles.memberItem} onClick={dialogOpen}>
        <div className={styles.memberInfo}>
            <p><b>{memberInfo.name}</b></p>
            <p>학번: {memberInfo.studentId}</p>
            {/*<p>대출 권수: {}</p> {/*TODO: MemberListDto에 대출 권수 추가 /* 아직 안하기로 했음 member 상세 페이지 만들어서 거기에 표시하기로*/}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
            <Dialog title='회원 정보' dialogRef={dialogRef} onClose={dialogClose}>
                <input className={styles.input} type='text' placeholder='회원 이름' value={memberInfo.name} name='이름' disabled />
                <input className={styles.input} type='text' placeholder='학번' value={memberInfo.studentId} name='학번' disabled />
                <input className={styles.input} type='text' placeholder='전화번호' defaultValue={memberInfo.phoneNumber} /*onChange={handlePhoneChange}*/ name='전화번호' />

                <p>대여중인 책</p>
                <ul className={styles.bookList}>
                    {books}
                </ul>
                <button className={styles.button} type='button' onClick={(e) => { e.stopPropagation(); dialogClose(); }} name='닫기'>닫기</button>
            </ Dialog>
        </div>
    </li>
}

export default MemberInfoDialog;