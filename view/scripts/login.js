document.addEventListener('DOMContentLoaded', e => {
	const loginUser = async () => {
		let email = document.getElementById('email_login').value;
		let password = document.getElementById('password_login').value;

		// console.log(email);
		// console.log(password);

		let data = {
			email: email,
			password: password
		};

		let response = await fetch('https://glacial-plains-71562.herokuapp.com/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(data)
		});

		let token = await response.json();
		console.log(token);
		window.sessionStorage.setItem('token', token);
	};

	let login = document.getElementById('signin_btn');
	login.addEventListener('click', function(e) {
		loginUser();
		let login_app = document.getElementById('login_app');
		let todo_app = document.getElementById('app');
		// if(todo_app.style.display === 'none') {
		todo_app.style.display = 'block';
		login_app.style.display = 'none';

		//}
	});
});
