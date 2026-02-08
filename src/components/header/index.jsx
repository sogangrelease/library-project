import SearchBar from '@/components/SearchBar';
import MyPageButton from '@/components/MyPageButton';
import LogOutButton from '@/components/LogOutButton';
import AddBoardButton from '@/components/AddBoardButton';
import AdminPageButton from '@/components/AdminPageButton';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import api from '@/api/axios';

import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const categories = [
    { label: '컴퓨터공학/수학', value: 'cs/math' },
    { label: '웹/앱', value: 'web/app' },
    { label: '인프라', value: 'infra' },
    { label: '인공지능', value: 'ai' },
    { label: '기타', value: 'others' }
];

const Header = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [userRole, setUserRole] = useState(null);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        api.get('/member/getInfo')
            .then(response => {
                setUserRole(response.data.role);
            })
            .catch(error => {
                console.error("사용자 정보 조회 실패:", error);
            });
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/api/logout'); 
            removeCookie('token', { path: '/' });
            navigate('/login'); 
            window.location.reload(); 
        } catch (error) {
            removeCookie('token', { path: '/' });
            navigate('/login');
            window.location.reload(); 
        }
    };
    
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
            </div>

            <div className={styles.centerSection}>
                <SearchBar categories={categories}/>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.desktopButtons}>
                    <MyPageButton />
                    {userRole === 'ADMIN' && <AdminPageButton />}
                    {(location.pathname === '/dashboard' || location.pathname === '/DashBoard') && (
                        <AddBoardButton />
                    )}
                    <LogOutButton onLogout={handleLogout} />
                </div>

                <button className={styles.hamburgerButton} onClick={toggleMenu}>
                    {isMenuOpen ? <IoClose size={28} /> : <RxHamburgerMenu size={28} />}
                </button>

                {isMenuOpen && (
                    <div className={styles.mobileMenuDropdown}>
                        <div onClick={() => setIsMenuOpen(false)}>
                            <MyPageButton />
                        </div>
                        {userRole === 'ADMIN' && (
                            <div onClick={() => setIsMenuOpen(false)}>
                                <AdminPageButton />
                            </div>
                        )}
                        {(location.pathname === '/dashboard' || location.pathname === '/DashBoard') && (
                            <div onClick={() => setIsMenuOpen(false)}>
                                <AddBoardButton />
                            </div>
                        )}
                        <div onClick={() => setIsMenuOpen(false)}>
                            <LogOutButton onLogout={handleLogout} />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;