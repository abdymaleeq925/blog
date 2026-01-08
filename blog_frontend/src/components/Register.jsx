import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextField, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useRegisterUserMutation } from '../services/authApi';
import { setAuthState } from '../redux/authSlice';

const Register = ({ setFormType }) => {
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const avatar = watch('avatar');

  // PREVIEW
  useEffect(() => {
    if (!avatar || !avatar[0]) {
      setAvatarPreview(null);
      return;
    }

    const file = avatar[0];
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [avatar]);

  // DRAG & DROP
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setValue('avatar', [file], { shouldValidate: true });
    }
  };

  const removeAvatar = () => {
    setValue('avatar', null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (vals) => {
    const formData = new FormData();
    formData.append('fullName', vals.fullName);
    formData.append('email', vals.email);
    formData.append('password', vals.password);

    if (vals.avatar?.[0]) {
      formData.append('avatar', vals.avatar[0]);
    }

    const response = await registerUser(formData);

    if (response?.data?.token) {
      localStorage.setItem('token', response.data.token);
      dispatch(setAuthState({ isLoggedIn: true, data: response.data }));
      navigate('/');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <>
      <h2>Create an account</h2>
      <form aria-labelledby="register-title" className="register-form form-col" onSubmit={handleSubmit(onSubmit)}>
        {/* AVATAR */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${isDragging ? '#1976d2' : '#ccc'}`,
            padding: 12,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar
            src={avatarPreview || ''}
            sx={{ width: 64, height: 64 }}
          />

          <div>
            <p style={{ margin: 0, color:"white" }}>
              {avatarPreview
                ? 'Click or drag to change avatar'
                : 'Click or drag image here'}
            </p>

            {avatarPreview && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAvatar();
                }}
                className="btn-primary"
              >
                Remove avatar
              </button>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            hidden
            {...register('avatar')}
            ref={(e) => {
                register('avatar').ref(e);
                fileInputRef.current = e;
              }}
          />
        </div>

        <TextField
          label="Full Name"
          className='field'
          error={Boolean(errors.fullName)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Put valid name' })}
        />

        <TextField
          label="E-Mail"
          className='field'
          type="email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Put valid email' })}
        />

        <TextField
          label="Password"
          className='field'
          type={showPassword ? 'text' : 'password'}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Put valid password' })}
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

        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>

      <p className='sign-up-button'>
        Have an account?
        <button
          type="button"
          className="switch-form"
          onClick={() => setFormType('login')}
        >
          Login
        </button>
      </p>
    </>
  );
};

export default Register;
