import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useRegisterUserMutation } from '../services/authApi';
import { setAuthState } from '../redux/authSlice';

const Register = ({ formType, setFormType }) => {
    const [ registerUser ] = useRegisterUserMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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
                type='email'
                className='field'
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', {required: 'Put valid email'})}
                />
                <div className="password" style={{width: '100%'}}>
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                >{showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}</button>
                </div>
                <button className="btn btn-primary" type="submit">Sign Up</button>
            </form>
            <p className='sign-up-button'>
            Have an account?
            <button type='button' className='switch-form' onClick={() => setFormType('login')}>Login</button>
        </p>
            
      </div>
    </div>
  )
}

export default Register
