import React, { useEffect, useState } from 'react';
import api from '@/api/axios';
import releaseLogo from '@/assets/release-black-small.webp';
import styles from './SearchPage.module.css';
import SearchQuery from '@/components/SearchQuery';
import BookList from '@/components/BookList';
import Pagination from '@/components/Pagination';

import { useSearchParams } from 'react-router-dom';

// const books = [
//   { 
//     id: 1, 
//     title: '리액트의 정석', 
//     author: '김민수',
//     publisher: '인사이트', 
//     year: '2025', 
//     category: '프로그래밍', 
//     coverUrl: '',
//     isAvailable: true 
//   },
//   { 
//     id: 2, 
//     title: '모던 자바스크립트', 
//     author: '이웅모',
//     publisher: '위키북스', 
//     year: '2024', 
//     category: '프로그래밍', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 3, 
//     title: 'Clean Code', 
//     author: '로버트 C. 마틴',
//     publisher: '인사이트', 
//     year: '2023', 
//     category: '프로그래밍', 
//     coverUrl: '', 
//     isAvailable: false 
//   },
//   { 
//     id: 4, 
//     title: 'Do it! 딥러닝', 
//     author: '조태호',
//     publisher: '이지스', 
//     year: '2022', 
//     category: '인공지능', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 5, 
//     title: '비전공자를 위한 IT', 
//     author: '최원영',
//     publisher: '길벗', 
//     year: '2024', 
//     category: 'IT 일반', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 6, 
//     title: '디자인의 법칙', 
//     author: '박디자',
//     publisher: '안그라픽스', 
//     year: '2021', 
//     category: '디자인', 
//     coverUrl: '', 
//     isAvailable: false 
//   },
//   { 
//     id: 7, 
//     title: 'UX/UI 디자인 입문', 
//     author: '이사용',
//     publisher: '한빛미디어', 
//     year: '2023', 
//     category: '디자인', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 8, 
//     title: '마케팅 불변의 법칙', 
//     author: '알 리스',
//     publisher: '비즈니스북스', 
//     year: '2020', 
//     category: '마케팅', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 9, 
//     title: '트렌드 코리아 2025', 
//     author: '김난도',
//     publisher: '미래의창', 
//     year: '2024', 
//     category: '경제/경영', 
//     coverUrl: '', 
//     isAvailable: false 
//   },
//   { 
//     id: 10, 
//     title: '돈의 심리학', 
//     author: '모건 하우절',
//     publisher: '인플루엔셜', 
//     year: '2021', 
//     category: '경제/경영', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 11, 
//     title: '해리포터와 마법사의 돌', 
//     author: 'J.K. 롤링',
//     publisher: '문학수첩', 
//     year: '2019', 
//     category: '소설', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 12, 
//     title: '미드나잇 라이브러리', 
//     author: '매트 헤이그',
//     publisher: '인플루엔셜', 
//     year: '2021', 
//     category: '소설', 
//     coverUrl: '', 
//     isAvailable: false 
//   },
//   { 
//     id: 13, 
//     title: '코스모스', 
//     author: '칼 세이건',
//     publisher: '사이언스북스', 
//     year: '2010', 
//     category: '과학', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 14, 
//     title: '이기적 유전자', 
//     author: '리처드 도킨스',
//     publisher: '을유문화사', 
//     year: '2018', 
//     category: '과학', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 15, 
//     title: '사피엔스', 
//     author: '유발 하라리',
//     publisher: '김영사', 
//     year: '2015', 
//     category: '인문', 
//     coverUrl: '', 
//     isAvailable: false 
//   },
//   { 
//     id: 16, 
//     title: '총 균 쇠', 
//     author: '재레드 다이아몬드',
//     publisher: '문학사상', 
//     year: '2013', 
//     category: '인문', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 17, 
//     title: '역행자', 
//     author: '자청',
//     publisher: '웅진지식하우스', 
//     year: '2022', 
//     category: '자기계발', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 18, 
//     title: '아주 작은 습관의 힘', 
//     author: '제임스 클리어',
//     publisher: '비즈니스북스', 
//     year: '2019', 
//     category: '자기계발', 
//     coverUrl: '', 
//     isAvailable: false 
//   },
//   { 
//     id: 19, 
//     title: '데이터 분석의 기초', 
//     author: '김데이터',
//     publisher: '위키북스', 
//     year: '2023', 
//     category: '데이터과학', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 20, 
//     title: 'SQL 첫걸음', 
//     author: '아사이 아츠시',
//     publisher: '한빛미디어', 
//     year: '2021', 
//     category: '데이터베이스', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
//   { 
//     id: 21, 
//     title: '정보처리기사 필기', 
//     author: '수험연구소',
//     publisher: '시나공', 
//     year: '2025', 
//     category: '수험서', 
//     coverUrl: '', 
//     isAvailable: true 
//   },
// ];


const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState([]);

    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');
    const pageNumber = Number(searchParams.get('page'));
    const booksPerPage = 10;

    useEffect(() => {
        // ✅ 수정된 부분: GET 요청 시, 검색 조건을 'params' 객체에 담아 전달합니다.
        api.get('/api/books/search', {
            params: {
                // 백엔드의 @RequestParam(value = "title")과 일치
                title: keyword, 
                // 백엔드의 @RequestParam(value = "category")와 일치
                category: category 
            }
        })
        .then(function (response) {
            setBooks(response.data);
        })
        .catch(function (error) {
            console.error("검색 API 호출 오류:", error);
        });
    }, [keyword, category]); // keyword 또는 category가 변경될 때마다 재실행

    const slicedBooks = books.slice(booksPerPage * (pageNumber - 1), booksPerPage * pageNumber);
    const totalPages = Math.ceil(books.length / 10);

    const handlePageChange = (newPage) => {
        searchParams.set('page', newPage);
        setSearchParams(searchParams);
    };

    const validPage = Math.min(Math.max(1, pageNumber), totalPages);

    useEffect(() => {
        if (pageNumber !== validPage) {
            searchParams.set('page', validPage);
            setSearchParams(searchParams, { replace: true }); 
        }
    }, [pageNumber, validPage, searchParams, setSearchParams]);

    return (
        <div className={styles.searchPage}>
            <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
            <SearchQuery keyword={keyword} category={category}/>
            <BookList books={slicedBooks}/>
            <Pagination currentPage={pageNumber} totalPages={totalPages} maxPageButtons={5} onPageChange={handlePageChange}/>
        </div>
    );
};

export default SearchPage;