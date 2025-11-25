import styles from './Login.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const API_BASE_URL = "";

    const submit = (id, pw) =>{
    setIsLoading(true);
    try {
      const response = axios.post(`${API_BASE_URL}/member/authenticate`, {
        "studentId":`${id}`,
        "password":`${pw}`
      });

      /*
      alert({
        title: "로그인 성공",
        description: "로그인에 성공했습니다",
      });
      */
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.email);
      navigate("/");
    } catch {
        /*
      alert({
        variant: "destructive",
        title: "로그인 실패",
        description: "로그인에 실패했습니다.",
      });
      */
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