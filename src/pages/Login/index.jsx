import styles from './Login.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const API_BASE_URL = "http://localhost:8080";

    const submit = async (currentId, currentPw) => {
      if (!currentId || !currentPw) {
        alert('아이디와 비밀번호를 입력해주세요.');
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.post(`${API_BASE_URL}/member/authenticate`, {
          studentId: currentId,
          password: currentPw
        });

        const token = response.data.token;
        setCookie('token', token, { path: '/' });
        navigate("/");
      } catch (error) {
        console.error('로그인 에러:', error);
        
        if (error.response && error.response.status === 401) {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        } else {
          alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    return <div>
        <input className={styles.input} type='text' value={id} onChange={() => setId(event.target.value)} placeholder='아이디' name='아이디' prefix='아이디' required/>
        <input className={styles.input} type='password' value={pw} onChange={() => setPw(event.target.value)} placeholder='비밀번호' name='비밀번호' required />
        <button className={styles.button} type='button' name='로그인' onClick={() => submit(id, pw)}>로그인</button>
    </div>;
}

export default Login;
