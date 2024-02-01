import React, { useState } from 'react';
import axiosInstance from '../components/Request'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let response = await axiosInstance.post(`https://book-store-bqe8.onrender.com/user/login`, {
        "username": email,
        "password": password
      });



      console.log(response)
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/user');
      }


    } catch {

    }


    // history.push('/');
  };

  return (
    <div id="wrapper">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');
          * {
            box-sizing: border-box;
          }
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Montserrat', sans-serif;
            font-size: 17px;
          }
          #wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
          }
          form {
            border: 1px solid #dadce0;
            border-radius: 5px;
            padding: 30px;
          }
          h3 {
            text-align: center;
            font-size: 24px;
            font-weight: 500;
          }
          .form-group {
            margin-bottom: 15px;
            position: relative;
          }
          input {
            height: 50px;
            width: 300px;
            outline: none;
            border: 1px solid #dadce0;
            padding: 10px;
            border-radius: 5px;
            font-size: inherit;
            color: #202124;
            transition: all 0.3s ease-in-out;
          }
          label {
            position: absolute;
            padding: 0px 5px;
            left: 5px;
            top: 50%;
            pointer-events: none;
            transform: translateY(-50%);
            background: #fff;
            transition: all 0.3s ease-in-out;
          }
          .form-group input:focus {
            border: 2px solid #1a73e8;
          }
          .form-group input:focus + label,
          .form-group input:valid + label {
            top: 0px;
            font-size: 13px;
            font-weight: 500;
            color: #1a73e8;
          }
          input#btn-login {
            background: #1a73e8;
            color: #fff;
            cursor: pointer;
          }
          input#btn-login:hover {
            opacity: 0.85;
          }
        `}
      </style>
      <form onSubmit={handleSubmit}>
        <h3>Đăng nhập</h3>
        <div className="form-group">
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label>Email</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label>Mật khẩu</label>
        </div>
        <input type="submit" value="Đăng nhập" id="btn-login" />
      </form>
    </div>
  );
};

export default Login;
