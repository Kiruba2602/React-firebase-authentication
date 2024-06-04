import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords do not match");
        } else {
            try{
                await createUserWithEmailAndPassword(auth, email, password);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setSuccess('Successfully Registered...');
            } catch (error) {
                setError(error.message);
            }
        }
    };

  return (
    <div className='registerpage'>
        <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br/>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br/>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <br/>
            <button type="submit">Register</button>
            <p>Already have an account? <a href='/login'>login</a></p>
        </form>
        {error && <div style={{color: 'red'}}>{error}</div>}
        {success && <div style={{color: 'green'}}>{success}</div>}
    </div>
  )
}

export default Register;