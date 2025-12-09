import React, { useState, useEffect } from 'react';
import styles from './AddBoard.module.css';
import { Link } from 'react-router-dom';
import releaseLogo from '@/assets/release-black-small.webp';
import api from '@/api/axios.js';
import MemberInfoDialog from '@/components/MemberInfoDialog';
import MemberCreateModal from '@/components/MemberCreateModal';
import BookCreateModal from '@/components/BookCreateModal';

function ShowMemberList({ refetchKey }) {
    
    const [dataMembers, setDataMembers] = useState([
        {
            studentId: "Loading...",
            name: "로딩중...",
        }
    ]);
            
    const fetchMembers = () => {
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
        );
    }

    useEffect(() => {
        fetchMembers();
    }, [refetchKey]);

    const handleDeleteMember = (member) => {
        if (window.confirm(`[${member.name} (${member.studentId})] 회원 계정을 정말로 삭제하시겠습니까?`)) {
            api.delete(`/member/delete/${member.studentId}`)
            .then(() => {
                alert(`[${member.name} (${member.studentId})] 회원 계정이 성공적으로 삭제되었습니다.`);
                fetchMembers();
            })
            .catch((error) => {
                console.error(`[${member.name} (${member.studentId})] 회원 계정 삭제 실패:`, error);
                const msgFromServer = error.response?.data;
                if (error.response?.status === 400 && typeof msgFromServer === 'string') {
                    alert(msgFromServer);
                } else {
                    alert(`회원 계정 삭제에 실패했습니다: ${msgFromServer || error.message}`);
                }
            });
        }
    };
    
    const members = (
        dataMembers.map(member => <MemberInfoDialog memberInfo={member} handleDeleteMember={handleDeleteMember} key={member.studentId} />)
    );
    
    return <ul className={styles.memberList}>
        {members}
    </ul>;
}

function ShowBookList({ refetchKey }) {
    const [dataBooks, setDataBooks] = useState([
        {"id": 1, "coverUrl": "", "titleMain": 'JavaScript 기초', "category": "web", "language": "한국어", "description": "예시 설명", "index": "1.2.3.", "author": "작가", "isLoaned": false},
        {"id": 2, "titleMain": 'React 입문', "isLoaned": true},
        {"id": 3, "titleMain": '웹 개발 완전 정복', "isLoaned": true}
    ]);

    const fetchBooks = () => {
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
        );
    }

    useEffect(() => {
        fetchBooks();
    }, [refetchKey]);

    const handleDeleteBook = (bookId, bookTitle) => {
        if (window.confirm(`도서 [${bookTitle}]을(를) 정말로 삭제하시겠습니까?`)) {
            api.delete(`/api/books/delete/${bookId}`)
            .then(() => {
                alert(`도서 [${bookTitle}]이(가) 성공적으로 삭제되었습니다.`);
                fetchBooks();
            })
            .catch((error) => {
                console.error(`도서 삭제 실패 (${bookId}):`, error);
                alert(`도서 삭제에 실패했습니다: ${error.response?.data || error.message}`);
            });
        }
    };
    
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
            <button className={styles.deleteButton} onClick={() => handleDeleteBook(book.id, book.titleMain)}>X</button>
        </li>
    );
    
    return <ul className={styles.bookList}>
        {books}
    </ul>;
}

function AddBoard() {
    const [openMemberModal, setOpenMemberModal] = useState(false);
    const [memberRefetchKey, setMemberRefetchKey] = useState(0);

    const [openBookModal, setOpenBookModal] = useState(false);
    const [bookRefetchKey, setBookRefetchKey] = useState(0);

    const handleMemberCreated = () => {
      setMemberRefetchKey((prev) => prev + 1);
    };

    const handleBookCreated = () => {
      setBookRefetchKey((prev) => prev + 1);
    };  

    return (
    <div className={styles.pageOutline}>
        <Link to="/" className={styles.logoButton}>
            <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
        </Link>
        <div className={styles.container}>
            <div className={styles.box}>
                <header className={styles.barHeader}>
                    <p className={styles.barHeaderTitle}>회원 관리</p>
                    <button className={styles.barHeaderButton} onClick={() => setOpenMemberModal(true)}>+</button>
                </header>
                <div className={styles.content}>
                    <ShowMemberList refetchKey={memberRefetchKey} />
                </div>
            </div>
            <div className={styles.box}>
                <header className={styles.barHeader}>
                    <p className={styles.barHeaderTitle}>도서 관리</p>
                    <button className={styles.barHeaderButton} onClick={() => setOpenBookModal(true)}>+</button>
                </header>
                <div className={styles.content}>
                    <ShowBookList refetchKey={bookRefetchKey} />
                </div>
            </div>
        </div>

        <MemberCreateModal
            open={openMemberModal}
            onClose={() => setOpenMemberModal(false)}
            onCreated={handleMemberCreated}
        />

        <BookCreateModal
            open={openBookModal}
            onClose={() => setOpenBookModal(false)}
            onCreated={handleBookCreated}
        />
    </div>
    );
}

export default AddBoard;