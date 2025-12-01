import styles from './Login.module.css';
import api from '@/api/axios.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const submit = (currentId, currentPw) => {
      if (!currentId || !currentPw) {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
      }

      setIsLoading(true);

      api.post('/member/authenticate', {
          studentId: currentId,
          password: currentPw
      })
      .then(function (response) {
          const token = response.data.token;
          setCookie('token', token, { path: '/' });
          navigate("/");
      })
      .catch(function (error) {
          console.error("로그인 에러:", error);
          if (error.response && error.response.status === 401) {
              alert("아이디 또는 비밀번호가 일치하지 않습니다.");
          } else {
              alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          }
      })
      .finally(function () {
          setIsLoading(false);
      });
<<<<<<< HEAD
      */
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.email);
      navigate("/");
	  }).catch(function(error) {
      if (error.response.status == 401) {
        // TODO : "아이디나 비밀번호가 일치하지 않습니다"
      }
      else if (error.response) {
        // TODO: "알 수 없는 오류가 발생했습니다."
        // Error code: error.response.status
        // Error message: error.response.data
      }
      else if (error.request) {
        // TODO: "서버가 오프라인 상태입니다. 대체 이 문구를 어떻게 보고 계신 거죠?"
      }
      else {
        // TODO: "알 수 없는 오류가 발생했습니다."
        // Error message: error.message
      }
    })
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
=======
>>>>>>> 538ecabc3c37a230a95c3bc437ca7e13f80a79d1
    };

    return <div>
        <input className={styles.input} type='text' value={id} onChange={() => setId(event.target.value)} placeholder='아이디' name='아이디' prefix='아이디' required/>
        <input className={styles.input} type='password' value={pw} onChange={() => setPw(event.target.value)} placeholder='비밀번호' name='비밀번호' required />
        <button className={styles.button} type='button' name='로그인' onClick={() => submit(id, pw)}>로그인</button>
    </div>;
}

export default Login;
