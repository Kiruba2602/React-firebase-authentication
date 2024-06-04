import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            setSuccess('Successfully Logged In...');
        } catch (error) {
            setError(error.message);
        }
    };

  return (
    <div className='loginpage'>
        <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br/>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br/>
            <button type="submit">Login</button>
            <p>To create a new account <a href='/register'>register</a></p>
        </form>
        {error && <div style={{color: 'red'}}>{error}</div>}
        {success && <div style={{color: 'green'}}>{success}</div>}
    </div>
  )
}

export default Login;