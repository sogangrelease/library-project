import { useState } from 'react';
import './MyPage.css';
import { booksOnServer, accountOnServer } from './pretendNetwork.js';

function MyPage() {
	const [count, setCount] = useState(0);
	const account = accountOnServer;
	const books = booksOnServer.map(book =>
	<li key = {book.id}>
		<div className="bookimage">
		<	img src="example_book.png" alt="Cover image of book" height={180} />
		</div>
		<div className="bookinfo">
    		<p><b>{book.title}</b></p>
	    	<p>반납 예정일</p>
	    	<p>{book.due}</p>
		</div>
	</li>
    );
    return (
	<>
		<div className="container">
			<div className="box">
				<header>
					<p>대출 현황</p>
				</header>
				<div className="content">
					<ul>{books}</ul>
				</div>
			</div>
			<div className="box">
				<header>
					<p>정보 수정</p>
				</header>
				<div className="content">
					<form>
						<input type='text' disabled placeholder='이름' value={account.이름} name='이름' prefix='이름' />
						<input type='text' disabled placeholder='학번' value={account.학번} name='학번' prefix='이름' />
						<input type='text' disabled placeholder='전화번호' value={account.전화번호} name='전화번호' prefix='이름' />
					</form>
					<form>
						<input type='password' placeholder='현재 비밀번호' name='현재 비밀번호' required />
						<input type='password' placeholder='변경할 비밀번호' name='변경할 비밀번호' required />
						<input type='password' placeholder='변경할 비밀번호 확인' name='변경할 비밀번호 확인' required />
					</form>
					<button type='button' name='비밀번호 변경'>비밀번호 변경</button>
				</div>
			</div>
		</div>
	</>
    );
}

export default MyPage
