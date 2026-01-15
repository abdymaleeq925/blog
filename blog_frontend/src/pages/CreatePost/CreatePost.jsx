import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SimpleMde from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { useParams } from 'react-router-dom';

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
		try {
			const fields = {
				title,
				imageUrl: image,
				text,
				description,
				category: category || ''
			};
			const data = isEditing ? await editPost({ id, fields }) : await createPost(fields);
			isEditing ? navigate(`/posts/post-detail/${id}`) : navigate(`/posts/post-detail/${data?.data?._id}`);
		} catch (error) {
			console.warn(error);
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
					<div className={styles.image}>
						<Button variant='outlined' onClick={() => inputRef.current.click()}>Load preview</Button>
						<input ref={inputRef} type="file" hidden onChange={handleChangeFile} />
						{
							image && (
								<>
									<Button variant='outlined' onClick={removeImage}>Delete</Button>
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
						<button className='btn' onClick={onSubmitPost}>{isEditing ? 'Edit Post' : 'Add Post'}</button>
						<button className='btn' onClick={stepBack}>Cancel</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePost