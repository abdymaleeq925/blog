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

    const onSubmit = async (vals) => {
        try {
            // Используем .unwrap(), чтобы попасть в catch при ошибке
            const response = await login(vals).unwrap();
            
            if (response?.token) {
                localStorage.setItem('token', response.token);
                dispatch(setAuthState({ isLoggedIn: true, data: response }));
                navigate(-1);
            }
        } catch (err) {
            // Проверяем, есть ли в ответе массив ошибок от бэкенда
            const serverErrors = err.data?.errors?.errors;
    
            if (Array.isArray(serverErrors)) {
                serverErrors.forEach((error) => {
                    // error.path — это имя поля (email или password)
                    // error.msg — это текст ошибки ("Incorrect format" и т.д.)
                    setError(error.path, {
                        type: 'server',
                        message: error.msg,
                    });
                });
            } else {
                // Запасной вариант, если пришла общая ошибка (не по полям)
                alert('Something went wrong. Please try again.');
            }
        }
    };


    const { register, handleSubmit, setError, formState: {errors} } = useForm(
        {
            defaultValues: {
                email: 'username@mail.com',
                password: '123456'
            },
            mode: 'onChange',
        }
    );

    console.log("errors", errors);
  return (
    <>
        <h2>Log In</h2>
        <form aria-labelledby="login-title" className='login-form form-col' onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label = 'E-Mail'
                className='field'
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email', {required: 'Email is required'})}
            />
            <div className='password' style={{width: '100%'}}>
                <TextField
                    label = 'Password'
                    className='field'
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'Password is required'})}
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
            <button className="btn" type="submit">Log In</button>
        </form>
        <p className='sign-up-button'>
            Don't have an account?
            <button type='button' className='switch-form' onClick={() => setFormType('register')}>Sign up</button>
        </p>
    </>
  )
}

export default Login
