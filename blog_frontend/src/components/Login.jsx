import { TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = ({ formType, setFormType }) => {
    const [ login, data ] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async(vals) => {
        let email = vals.email;
        let password = vals.password;

        const userCredentials = { email, password }

        const response = await login(userCredentials);
        if (response?.data?.token) {
            localStorage.setItem('token', response?.data?.token);
            dispatch(setAuthState({isLoggedIn: true, data: response.data}));
        } else {
            return alert('Login failured')
        }
        navigate('/');
    };
    const { register, setError, handleSubmit, formState: {errors, isValid} } = useForm(
        {
            defaultValues: {
                email: 'malikbatyr@mail.com',
                password: '12345'
            },
            mode: 'onChange',
        }
    );
  return (
    <>
        <h2 className="h2 title-sm">Log In</h2>
        <form action="" className='login-form form-col' onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label = 'E-Mail'
                className='field'
                error={Boolean(errors.fullName?.message)}
                helperText={errors.fullName?.message}
                {...register('email', {required: 'Put valid name'})}
            />
            <TextField
                label = 'Password'
                className='field'
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register('password', {required: 'Put valid password'})}
            />
            <button className="btn btn-primary" type="submit">Log In</button>
        </form>
        <span className='switch-form' onClick={() => setFormType('register')}>Don't have an account? <i>Sign up</i></span>
    </>
  )
}

export default Login
