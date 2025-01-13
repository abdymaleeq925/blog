import { TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = ({ formType, setFormType }) => {
    const [ login ] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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
        navigate(-1);
    };
    const { register, handleSubmit, formState: {errors} } = useForm(
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
            <div className='password' style={{width: '100%'}}>
                <TextField
                    label = 'Password'
                    className='field'
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'Put valid password'})}
                />
                <button
                    className='btn-showpassword'
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                >{showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}</button>
            </div>
            <button className="btn btn-primary" type="submit">Log In</button>
        </form>
        <span className='switch-form' onClick={() => setFormType('register')}>Don't have an account? <i>Sign up</i></span>
    </>
  )
}

export default Login
