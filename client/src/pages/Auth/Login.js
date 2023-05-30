import React, { useState } from 'react';
import Layout from "./../../components/Layout/Layout";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import '../../styles/AuthStyles.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(email, password);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                { email, password }
            );
            if (res && res.data.success) {
                toast.success(res && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout title="Login">
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Login</h4>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder='Enter your Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder='Enter Pasword' required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div >
        </Layout >
    )
}

export default Login