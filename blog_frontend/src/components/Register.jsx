import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useRegisterUserMutation } from '../services/authApi';
import { setAuthState } from '../redux/authSlice';

const Register = ({ formType, setFormType }) => {
    const [ registerUser ] = useRegisterUserMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors} } = useForm(
        {
            mode: 'onChange'
        }
    );

    const onSubmit = async(vals) => {
        let fullName = vals.fullName;
        let email = vals.email;
        let password = vals.password;

        const doc = {
            fullName, email, password
        }

        const response = await registerUser(doc);
        if (response?.data?.token) {
            localStorage.setItem('token', response?.data?.token);
            dispatch(setAuthState({isLoggedIn: true, data: response.data}));
            navigate('/');
        }
        else {
            return alert("Registration failured");
        }
    };
    const isLogged = useSelector(state => state.auth.isLoggedIn);
  return (
    <div>
      <div className="register">
            <h2 className="h2 title-sm">Create an account</h2>
            <form className='register-form form-col' action="" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                label = 'Full Name'
                className='field'
                error={Boolean(errors.fullName?.message)}
                helperText={errors.fullName?.message}
                {...register('fullName', {required: 'Put valid name'})}
                />
                <TextField
                label = 'E-Mail'
                className='field'
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', {required: 'Put valid email'})}
                />
                <TextField
                label = 'Password'
                className='field'
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register('password', {required: 'Put valid password'})}
                />
                <button className="btn btn-primary" type="submit">Sign Up</button>
            </form>
            <span className='switch-form' onClick={() => setFormType('login')}>Have an account? <i>Login</i></span>
      </div>
    </div>
  )
}

export default Register
