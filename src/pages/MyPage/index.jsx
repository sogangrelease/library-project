import styles from './MyPage.module.css'; 
import { useState, useEffect } from 'react'; 
import api from '@/api/axios';
import { Link } from 'react-router-dom';
import releaseLogo from '@/assets/release-black-small.webp';

function MyPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState({name: '홍길동', studentId: '20231234', phoneNumber: '010-1234-5678'}); 
    const [booksData, setBooksData] = useState([
        {borrowId: 1, titleMain: 'JavaScript 기초', returnAt: '2024-07-15'},
        {borrowId: 2, titleMain: 'React 입문', returnAt: '2024-07-20'},
        {borrowId: 3, titleMain: '웹 개발 완전 정복', returnAt: '2024-07-25'}
    ]);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        });

        console.log(passwordForm);
    };

    const handleSubmitPassword = () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다!");
            return;
        }

        api.post('/member/changepw', {
            'oldpw': passwordForm.currentPassword,
            'newpw': passwordForm.newPassword
        })
        .then(function (response) {
            alert(response.data);
        })
        .catch(function (error) {
            console.error(error);
            alert(`error: ${error}`);
        });
    };

    useEffect(() => {
        api.post('/member/getinfo')
            .then(function (response) {
                setAccount(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    
        api.post('/borrow/list')
            .then(function (response) {
                setBooksData(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });

        setIsLoading(false);
    }, []);

    const books = booksData.map(book =>
    <li key = {book.borrowId} className={styles.bookItem}>
        <div className={styles.bookimage}>
            <img src="example_book.png" alt="Cover image of book" height={180} />
        </div>
        <div className={styles.bookinfo}>
            <p><b>{book.titleMain}</b></p>
            <p>반납 예정일</p>
            <p>{book.returnAt}</p>
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
                    <p className={styles.barHeaderTitle}>대출 현황</p>
                </header>
                <div className={styles.content}>
                    <ul className={styles.bookList}>{books}</ul>
                </div>
            </div>
            <div className={styles.box}>
                <header className={styles.barHeader}>
                    <p className={styles.barHeaderTitle}>정보 수정</p>
                </header>
                <div className={styles.content}>
                    <form className={styles.form}>
                        <input className={styles.input} type='text' disabled placeholder='이름' value={account.name} name='이름' prefix='이름' />
                        <input className={styles.input} type='text' disabled placeholder='학번' value={account.studentId} name='학번' prefix='이름' />
                        <input className={styles.input} type='text' disabled placeholder='전화번호' value={account.phoneNumber} name='전화번호' prefix='이름' />
                    </form>
                    <form className={styles.form}>
                        <input 
                            className={styles.input}
                            type='password'
                            name='currentPassword'
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder='현재 비밀번호'
                            required
                        />
                        <input
                            className={styles.input}
                            type='password'
                            name='newPassword'
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            placeholder='변경할 비밀번호'
                            required
                        />
                        <input
                            className={styles.input}
                            type='password'
                            name='confirmPassword'
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder='변경할 비밀번호 확인'
                            required
                        />
                    </form>
                    <button className={styles.button} onClick={() => handleSubmitPassword()} type='button' name='비밀번호 변경'>비밀번호 변경</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default MyPage;