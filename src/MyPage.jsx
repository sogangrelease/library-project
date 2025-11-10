import { useState } from 'react';
import './MyPage.css';
import { booksOnServer, accountOnServer } from './pretendNetwork.js';

function MyPage() {
	const [count, setCount] = useState(0);
	const account = accountOnServer;
	const books = booksOnServer.map(book =>
	<li key = {book.id}>
    	<p>{book.title}</p>
	    <p>반납 예정일</p>
	    <p>{book.due}</p>
	</li>
    );
    return (
	<>
		<div className="container">
			<div className="box">
				<header>
					<p>대출 현황</p>
				</header>
				<ul>{books}</ul>
			</div>
			<div className="box">
				<header>
					<p>정보 수정</p>
				</header>
				<form>
					<div className='input'>
						<input type='text' disabled placeholder={account.이름} name='이름' prefix='이름' />
					</div>
					<input type='text' disabled placeholder={account.학번} name='학번' prefix='이름' />
					<input type='text' disabled placeholder={account.전화번호} name='전화번호' prefix='이름' />
				</form>
				<form>
					<input type='password' name='현재 비밀번호' required />
					<input type='password' name='변경할 비밀번호' required />
					<input type='password' name='변경할 비밀번호 확인' required />
				</form>
			</div>
		</div>
	</>
    );
}

export default MyPage
