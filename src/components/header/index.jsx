import SearchBar from '@/components/SearchBar';
import MyPageButton from '@/components/MyPageButton';
import LogOutButton from '@/components/LogOutButton';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom'; // navigate 추가
import { useCookies } from 'react-cookie';
import api from '@/api/axios'; // api 호출을 위해 추가

const categories = [
  { label: '컴퓨터공학/수학', value: 'cs/math' },
  { label: '웹/앱', value: 'web/app' },
  { label: '인프라', value: 'infra' },
  { label: '인공지능', value: 'ai' },
  { label: '기타', value: 'others' }
];

const Header = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
        const [cookies, setCookie, removeCookie] = useCookies(['token']);

    // ✅ 로그아웃 로직 구현
    const handleLogout = async () => {
        try {
            // 1. 서버에 로그아웃 요청 (POST /api/logout)
            await api.post('/api/logout'); 
            
            // 2. 클라이언트의 인증 정보 삭제 (JWT 토큰 가정)
            // localStorage.removeItem('authToken'); 
            removeCookie('token', { path: '/' });
            
            // 3. 페이지 이동
            // 로그인 페이지로 이동 후 전체 새로고침하여 상태 확실히 초기화
            navigate('/login'); 
            window.location.reload(); 
            
        } catch (error) {
            console.error("로그아웃 실패 (서버 응답 오류 가능성):", error);
            // 서버 에러가 발생하더라도 클라이언트 인증 정보는 지워야 함
            // localStorage.removeItem('authToken'); 
            removeCookie('token', { path: '/' });
            navigate('/login');
            window.location.reload(); 
        }
    };
    
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}></div>
            <div className={styles.centerSection}>
                <SearchBar categories={categories}/>
            </div>
            <div className={styles.rightSection}>
                <MyPageButton />
                {/* ✅ LogOutButton에 로그아웃 함수를 props로 전달 */}
                <LogOutButton onLogout={handleLogout} /> 
            </div>
        </header>
    );
};

export default Header;