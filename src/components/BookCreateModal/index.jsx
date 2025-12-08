// BookCreateModal.jsx
import { useState } from 'react';
import api from '@/api/axios.js';
import styles from './BookCreateModal.module.css';

function BookCreateModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    titleMain: '',
    category: '',
    language: '',
    description: '',
    index: '',
    author: '',
  });
  const [bookCover, setBookCover] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookCover(file);
      // 미리보기 URL 생성
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookCover) {
      alert('책 표지를 업로드해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      
      // BookRequestDto를 JSON으로 변환하여 추가
      const bookDto = {
        titleMain: form.titleMain,
        category: form.category,
        language: form.language,
        description: form.description,
        index: form.index,
        author: form.author,
      };
      
      formData.append('book', new Blob([JSON.stringify(bookDto)], { type: 'application/json' }));
      formData.append('bookCover', bookCover);

      await api.post('/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('책이 등록되었습니다.');
      onCreated();
      onClose();
      
      // 상태 초기화
      setForm({
        titleMain: '',
        category: '',
        language: '',
        description: '',
        index: '',
        author: '',
      });
      setBookCover(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('책 등록 실패:', error);
      alert(error.response?.data?.message || error.message);
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
          <h3>새 책 등록</h3>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formContent}>
            <div className={styles.coverUpload}>
              <label className={styles.coverLabel}>책 표지</label>
              <div className={styles.coverArea}>
                {previewUrl ? (
                  <img src={previewUrl} alt="책 표지 미리보기" className={styles.coverPreview} />
                ) : (
                  <div className={styles.coverPlaceholder}>
                    <span>+</span>
                    <p>표지 업로드</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="titleMain">책 제목</label>
              <input
                id="titleMain"
                name="titleMain"
                type="text"
                placeholder="책 제목을 입력하세요"
                value={form.titleMain}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="category">카테고리</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">카테고리 선택</option>
                  <option value="CS/Math">컴퓨터공학/수학</option>
                  <option value="Web/App">웹/앱</option>
                  <option value="Infra">인프라</option>
                  <option value="AI">인공지능</option>
                  <option value="Others">기타</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="language">언어</label>
                <select
                  id="language"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  required
                >
                  <option value="">언어 선택</option>
                  <option value="한국어">한국어</option>
                  <option value="영어">영어</option>
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="author">저자</label>
              <input
                id="author"
                name="author"
                type="text"
                placeholder="저자명을 입력하세요"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description">책 상세 정보</label>
              <textarea
                id="description"
                name="description"
                placeholder="책에 대한 상세 정보를 입력하세요"
                value={form.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="index">목차</label>
              <textarea
                id="index"
                name="index"
                placeholder="책의 목차를 입력하세요"
                value={form.index}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              취소
            </button>
            <button type="submit" className={styles.submitBtn}>
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookCreateModal;