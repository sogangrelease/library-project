// MemberCreateModal.jsx
import { useState } from 'react';
import api from '@/api/axios.js';
import styles from './MemberCreateModal.module.css';

function MemberCreateModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    studentId: '',
    password: '',
    phoneNumber: '',
    name: '',
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/member/create', form);
      alert('계정이 생성되었습니다.');
      onCreated();
      onClose();
    } catch (error) {
      console.error('회원 생성 실패:', error);
      alert(error.response?.data || error.message);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>새 회원 추가</h3>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formContent}>
            <div className={styles.inputGroup}>
              <label htmlFor="studentId">학번</label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                placeholder="학번을 입력하세요"
                value={form.studentId}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name">이름</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="이름을 입력하세요"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phoneNumber">전화번호</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="전화번호를 입력하세요"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              취소
            </button>
            <button type="submit" className={styles.submitBtn}>
              생성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemberCreateModal;