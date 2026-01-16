import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SimpleMde from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

import { API_URL } from '../../utils/constants';
import styles from './CreatePost.module.scss';
import { useUploadImageMutation, useCreatePostMutation, useGetOnePostQuery, useEditPostMutation } from '../../services/postsApi';

const CreatePost = () => {
	const [image, setImage] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [text, setText] = useState('');
	const [preview, setPreview] = useState('');
	const [errors, setErrors] = useState([]);

	const navigate = useNavigate();

	const inputRef = useRef(null);
	const { id } = useParams();

	const isEditing = Boolean(id);

	const [uploadImage] = useUploadImageMutation();
	const [createPost] = useCreatePostMutation();
	const { data } = useGetOnePostQuery(id, { skip: !isEditing });
	const [editPost] = useEditPostMutation();

	const handleChangeFile = async (event) => {
		const file = event.target.files[0];

		const localUrl = URL.createObjectURL(file);
		setPreview(localUrl);

		const formData = new FormData();
		formData.append('image', file);

		const { data } = await uploadImage(formData)
		setImage(data?.url)
	}

	const changeText = (val) => {
		setText(val)
	};

	const stepBack = () => {
		navigate(-1)
	}

	const onSubmitPost = async () => {
		setErrors([]); // Очищаем предыдущие ошибки
		
		try {
			const fields = {
				title,
				imageUrl: image,
				text,
				description,
				category: category || ''
			};
			
			const result = isEditing ? await editPost({ id, fields }) : await createPost(fields);
			
			// Проверяем наличие ошибок в ответе RTK Query
			if (result.error) {
				// Обрабатываем ошибки валидации
				if (result.error.data?.errors && Array.isArray(result.error.data.errors)) {
					const validationErrors = result.error.data.errors.map(err => {
						// Ошибки валидации могут быть в формате { msg, param } или просто строками
						return typeof err === 'string' ? err : (err.msg || err.message || 'Validation error');
					});
					setErrors(validationErrors);
				} else if (result.error.data?.message) {
					setErrors([result.error.data.message]);
				} else if (result.error.data) {
					// Если data - это строка или другой формат
					setErrors([typeof result.error.data === 'string' ? result.error.data : 'An error occurred while creating the post']);
				} else {
					setErrors([result.error.message || 'An error occurred while creating the post']);
				}
				return; // Не переходим на другую страницу при ошибке
			}
			
			// Если все успешно, переходим на страницу поста
			if (result.data) {
				const postId = isEditing ? id : result.data._id;
				if (postId) {
					navigate(`/posts/post-detail/${postId}`);
				} else {
					setErrors(['Post ID is missing']);
				}
			}
		} catch (error) {
			console.warn(error);
			setErrors([error.message || 'An unexpected error occurred']);
		}
	};

	useEffect(() => {
		if (data) {
			setTitle(data?.title);
			setCategory(data?.category || '');
			setDescription(data?.description);
			setText(data?.text);
			setImage(data?.imageUrl);
		}
	}, [data]);

	const removeImage = () => {
		setImage('');
		setPreview('');
	}

	const delay = React.useMemo(() => ({
		spellChecker: false, // ПОЛНОСТЬЮ ОТКЛЮЧАЕТ КРАСНЫЙ ФОН И ПРОВЕРКУ
		autosave: {
			enabled: true,
			delay: 1000,
			uniqueId: "create-post-editor",
		},
		// Можно также настроить высоту здесь:
		minHeight: "300px",
		autofocus: false,
		placeholder: "Введите текст статьи...",
		status: false, // убирает нижнюю панель, если она мешает
	}), []);

	return (
		<div className={styles.postEditor}>
			<div className="container">
				<div className={styles.postEditorWrapper}>
					<h1>Create a Post</h1>
					<div className={styles.image}>
						<Button onClick={() => inputRef.current.click()} btnName="Load preview" isYellow/>
						<input ref={inputRef} type="file" hidden onChange={handleChangeFile} />
						{
							image && (
								<>
									<Button onClick={removeImage} btnName="Delete" isYellow/>
									<img 
										src={preview ? preview : `${API_URL}${image}`} 
										alt="Post"
										onError={(e) => {
											e.target.style.display = 'none';
										}}
									/>
								</>
							)
						}
					</div>
					{errors.length > 0 && (
						<div className={styles.errorContainer}>
							{errors.map((error, index) => (
								<div key={index} className={styles.errorMessage}>
									{error}
								</div>
							))}
						</div>
					)}
					<div className={styles.formColWrapper}>
						<TextField
							value={title || ''}
							className='field'
							placeholder='Post Title'
							fullWidth
							classes={{ root: styles.title }}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<TextField
							value={description || ''}
							className='field'
							placeholder='Description'
							fullWidth
							classes={{ root: styles.title }}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<FormControl fullWidth className={styles.categoryFormControl}>
							<InputLabel 
							id="post-category"
							sx={{ 
								color: 'var(--grey-50)', 
								'&.Mui-focused': { color: 'var(--grey-50) !important' } 
							}}
							>
								Category
							</InputLabel>
							<Select
								labelId="post-category"
								className={styles.selectCategory}
								id="category"
								value={category  || ""}
								label="Category"
								onChange={(e) => setCategory(e.target.value)}
								MenuProps={{
									PaperProps: {
										className: styles.categoryMenuPaper, // Класс для самого окна
									},
								}}
							>
								<MenuItem className={styles.categoryMenuItem} value="Quantum">Quantum Computing</MenuItem>
								<MenuItem className={styles.categoryMenuItem} value="Ethics">AI Ethics</MenuItem>
								<MenuItem className={styles.categoryMenuItem} value="Space">Space Exploration</MenuItem>
								<MenuItem className={styles.categoryMenuItem} value="Environment">Environment</MenuItem>
								<MenuItem className={styles.categoryMenuItem} value="Healthcare">Healthcare</MenuItem>
								<MenuItem className={styles.categoryMenuItem} value="Biotechnology">Biotechnology</MenuItem>
								<MenuItem className={styles.categoryMenuItem} value="Energy">Renewable Energy</MenuItem>
								<MenuItem className={styles.categoryMenuItem} value="Other">Other</MenuItem>
							</Select>
						</FormControl>
					</div>
					<SimpleMde className={styles.editor} options={delay} onChange={changeText} value={text || ''} />
					<div className={styles.buttons}>
						<Button onClick={onSubmitPost} btnName={isEditing ? 'Edit Post' : 'Add Post'} isYellow/>
						<Button onClick={stepBack} btnName="Cancel" isYellow/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePost