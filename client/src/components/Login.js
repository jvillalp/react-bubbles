import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
    const [login, setLogin] = useState({
      username:'',
      password:''
    });

    const handleChange = e => {
        setLogin({
          ...login,
          [e.target.name] : e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
                  .post('login/', login)
                  .then(response => {
                    localStorage.setItem('token', response.data.payload);
                    props.history.push('/bubbles')
                  })
                  .catch(error => {
                    console.log( 'cannot access page', error)
                  })
    };
  return (
    <>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          name="username"
          label='username'
          placeholder="UserName"
          value={login.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          label='password'
          placeholder="PassWord"
          value={login.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
