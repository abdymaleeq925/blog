import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useLoginMutation } from '../services/authApi';
import { setAuthState } from '../redux/authSlice';



const Login = ({ setFormType }) => {
    const [login] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (vals) => {
        try {
            const response = await login(vals).unwrap();

            if (response?.token) {
                localStorage.setItem('token', response.token);
                dispatch(setAuthState({ isLoggedIn: true, data: response }));
                navigate(-1);
            }
        } catch (err) {
            const serverError = err.data?.message;
            if (serverError) {
                setError("root.serverError", {
                    type: "server",
                    message: serverError,
                });
            }
        }
    };


    const { register, handleSubmit, setError, formState: { errors } } = useForm(
        {
            defaultValues: {
                email: 'username@mail.com',
                password: '123456'
            },
            mode: 'onChange',
        }
    );

    return (
        <>
            <h2>Log In</h2>
            <form aria-labelledby="login-title" className='login-form form-col' onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label='E-Mail'
                    className='field'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Email is required' })}
                />
                <div className='password'>
                    <TextField
                        label='Password'
                        className='field'
                        type={showPassword ? 'text' : 'password'}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        {...register('password', { required: 'Password is required' })}
                        InputProps={{
                            endAdornment: (
                                <button
                                    className='btn-showpassword'
                                    type='button'
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        padding: 0
                                    }}
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </button>
                            ),
                        }}
                    />

                </div>
                {errors.root?.serverError && (
                    <div className="login-error-message">
                    {errors.root.serverError.message}
                    </div>
                )}
                <button className="action-btn-yellow" type="submit">Log In</button>
            </form>
            <p className='sign-up-button'>
                Don't have an account?
                <button type='button' className='switch-form' onClick={() => setFormType('register')}>Sign up</button>
            </p>
        </>
    )
}

export default Login
