import styles from './LayoutedMyPage.module.css';
import { useState, useEffect } from 'react';
import LayoutPage from '@/components/LayoutPage';
import LayoutBox from '@/components/LayoutBox';
import api from '@/api/axios';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate 추가
import { useCookies } from 'react-cookie';
import LayoutCenterPadding from '@/components/LayoutCenterPadding';

function LayoutedMyPage() {
    const navigate = useNavigate(); // ✅ navigate 훅 초기화

    const [isLoading, setIsLoading] = useState(true);
    const [isBorrowLoading, setIsBorrowLoading] = useState(true);
    const [account, setAccount] = useState({name: '홍길동', studentId: '20231234', phoneNumber: '010-1234-5678'}); 
    // 실제 데이터가 로드되기 전에 사용할 임시 데이터
    const [booksData, setBooksData] = useState([]); 
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        
        // 상태 업데이트는 비동기적으로 처리
        setPasswordForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmitPassword = () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다! 다시 확인해 주세요.");
            return;
        }

        // 비밀번호 변경 API 호출
        api.post('/member/changepw', {
            'oldpw': passwordForm.currentPassword,
            'newpw': passwordForm.newPassword
        })
        .then(function (response) {
            // 서버 응답 메시지 alert
            alert("비밀번호가 성공적으로 변경되었습니다. 보안을 위해 다시 로그인해 주세요.");
            
            // ✅ 비밀번호 변경 성공 후 로그아웃 처리

            // 2. 서버에 로그아웃 요청 (세션/인증 정보 무효화)
            // 비동기로 처리하며, 서버 응답과 관계없이 페이지 이동을 보장하기 위해 finally 사용
            api.post('/api/logout')
               .finally(() => {
                    try {
                        // 1. 클라이언트 토큰 삭제 (JWT 가정)
                        // localStorage.removeItem('authToken');
                        removeCookie('token', { path: '/' });
                    }
                    catch (error) {
                        console.error(error || "알 수 없는 오류가 발생했습니다.");
                    }
                    navigate('/login');
                    window.location.reload(); 
               });

        })
        .catch(function (error) {
            console.error("비밀번호 변경 실패:", error);
            const errorMessage = error.response?.data?.message || error.message || "알 수 없는 오류가 발생했습니다.";
            alert(`비밀번호 변경 실패: ${errorMessage}`);
        });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const getInfoPromise = api.get('/member/getInfo');
            
            try {
                const infoResponse = await getInfoPromise;
                
                setAccount(infoResponse.data);
                
            } catch (error) {
                console.error("데이터 로드 중 오류 발생:", error);
                // 필요 시, 인증 정보가 없으면 로그인 페이지로 강제 이동 등의 처리 추가
            } finally {
                setIsLoading(false); 
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchBorrowData = async () => {
            const getBorrowListPromise = api.get('/my/borrow/list');
            
            try {
                const borrowResponse = await getBorrowListPromise;
            
                setBooksData(borrowResponse.data);
                
            } catch (error) {
                console.error("데이터 로드 중 오류 발생:", error);
                // 필요 시, 인증 정보가 없으면 로그인 페이지로 강제 이동 등의 처리 추가
            } finally {
                setIsBorrowLoading(false); 
            }
        };

        fetchBorrowData();
    }, []);

    // 💡 로딩 상태 처리
    if (isLoading) {
        return <div className={styles.loading}>사용자 정보를 로드하는 중...</div>;
    }
    
    // 대출 도서 목록 렌더링
    const books = booksData.map(book =>
        <li key = {book.borrowId} className={styles.bookItem}>
            <div className={styles.bookimage}>
                {/* book.coverUrl이 없거나 오류 발생 시 기본 이미지 처리가 필요할 수 있습니다. */}
                <BookImage src={book.coverUrl} alt={`Cover image of ${book.titleMain}`} height={180} />
            </div>
            <div className={styles.bookinfo}>
                <p><b>{book.titleMain}</b></p>
                <p>반납 예정일</p>
                <p>{book.returnAt}</p>
            </div>
            {/* 반납 버튼 등의 기능은 여기에 추가될 수 있습니다. */}
        </li>
    );
    
    return (
        <LayoutPage>
            {/* 1. 대출 현황 박스 */}
            <LayoutBox title="대출 현황">
                <LayoutCenterPadding>
                    {
                        isBorrowLoading ? (
                            <p style={{ textAlign: 'center', padding: '20px' }}>로딩 중..</p>
                        ) : books.length > 0 ? (
                            <ul className={styles.bookList}>{books}</ul>
                        ) : (
                            <p style={{ textAlign: 'center', padding: '20px' }}>대출 중인 도서가 없습니다.</p>
                        )
                    }
                </LayoutCenterPadding>
            </LayoutBox>

            {/* 2. 정보 수정 박스 */}
            <LayoutBox title="정보 수정">
                <LayoutCenterPadding>
                    {/* 사용자 기본 정보 (Disabled) */}
                    <form className={styles.form}>
                        <input className={styles.input} type='text' disabled placeholder='이름' value={account.name || ''} name='이름' />
                        <input className={styles.input} type='text' disabled placeholder='학번' value={account.studentId || ''} name='학번' />
                        <input className={styles.input} type='text' disabled placeholder='전화번호' value={account.phoneNumber || ''} name='전화번호' />
                    </form>
                    
                    {/* 비밀번호 변경 폼 */}
                    <form className={styles.form}>
                        <input 
                            className={styles.input} type='password' name='currentPassword'
                            value={passwordForm.currentPassword} onChange={handlePasswordChange}
                            placeholder='현재 비밀번호' required
                        />
                        <input
                            className={styles.input} type='password' name='newPassword'
                            value={passwordForm.newPassword} onChange={handlePasswordChange}
                            placeholder='변경할 비밀번호' required
                        />
                        <input
                            className={styles.input} type='password' name='confirmPassword'
                            value={passwordForm.confirmPassword} onChange={handlePasswordChange}
                            placeholder='변경할 비밀번호 확인' required
                        />
                    </form>

                    {/* 비밀번호 변경 버튼 */}
                    <button
                        className={styles.button}
                        onClick={handleSubmitPassword}
                        type='button'
                        name='비밀번호 변경'
                    >
                        비밀번호 변경
                    </button>
                </LayoutCenterPadding>
            </LayoutBox>
        </LayoutPage>
    );
}

export default LayoutedMyPage;