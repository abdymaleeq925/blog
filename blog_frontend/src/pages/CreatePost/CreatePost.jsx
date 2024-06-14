import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import SimpleMde from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { useParams } from 'react-router-dom';
import { WithContext as ReactTag, SEPARATORS } from 'react-tag-input'

import styles from './CreatePost.module.scss';
import { useUploadImageMutation, useCreatePostMutation, useGetOnePostQuery, useEditPostMutation, useCreateTagMutation, useGetAllTagsQuery } from '../../services/postsApi';

const CreatePost = () => {
	const [image, setImage] = useState('');
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState([]);
	const [text, setText] = useState('');

	const navigate = useNavigate();

	const inputRef = useRef(null);
	const { id } = useParams();

	const isEditing = Boolean(id);

	const [uploadImage] = useUploadImageMutation();
	const [createPost] = useCreatePostMutation();
	const { data } = useGetOnePostQuery(id, { skip: !isEditing });
	const [editPost] = useEditPostMutation();

	const [createTag] = useCreateTagMutation();
	const { data: allTags } = useGetAllTagsQuery();
	
	const handleChangeFile = async (event) => {
		const file = event.target.files[0];
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
				tags: tags.map(tag => ({ _id: tag.id, name: tag.text }))
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
			setTags(data?.tags.map(tag => ({ id: tag._id, text: tag.name })));
			setText(data?.text);
			setImage(data?.imageUrl);
		}
	}, [data]);


	const removeImage = () => {
		setImage('');
	}

	const handleAddition = async (tag) => {
		const trimmedTag = tag.text.trim();

		if (trimmedTag === '') {
			return
		}

		if (allTags && Array.isArray(allTags?.tags)) {
			const existingTag = allTags?.tags?.find(exTag => exTag.name === trimmedTag);

			if (existingTag) {
				setTags((prevTags) => ([...prevTags, { id: existingTag._id, text: existingTag.name }]));
				console.log('Tag already exist', trimmedTag);
			} else {
				try {
					const doc = {
						name: trimmedTag
					}
					const { data: newTag } = await createTag(doc);
					setTags(prevTags => [...prevTags, { id: newTag._id, text: newTag.name }]);
				} catch (error) {
					console.log(error)
				}
			}
		}


	}

	const suggestions = allTags?.tags?.map(tag => ({ id: tag._id, text: tag.name }))

	return (
		<div className='post-editor'>
			<div className="container">
				<div className={styles.image}>
					<Button variant='outlined' onClick={() => inputRef.current.click()}>Load preview</Button>
					<input ref={inputRef} type="file" hidden onChange={handleChangeFile} />
					{
						image && (
							<>
								<Button variant='contained' color="error" onClick={removeImage}>Delete</Button>
								<img src={`http://localhost:4444${image}`} />
							</>
						)
					}
				</div>
				<TextField
					value={title || ''}
					placeholder='Post Title'
					fullWidth
					classes={{ root: styles.title }}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<ReactTag
					tags={tags}
					// suggestions={suggestions}
					placeholder='Tags'
					classes={{ root: styles.tags }}
					handleAddition={handleAddition}
					separators={[SEPARATORS.ENTER]}
					handleDelete={(i) => {
						const newTags = tags?.filter((tag, index) => index !== i);
						setTags(newTags);
					}}
				/>
				<SimpleMde className={styles.editor} onChange={changeText} value={text || ''} />
				<div className={styles.buttons}>
					<Button variant='contained' color='primary' onClick={onSubmitPost}>{isEditing ? 'Edit Post' : 'Add Post'}</Button>
					<Button variant='outlined' color='warning' onClick={stepBack}>Cancel</Button>
				</div>
			</div>
		</div>
	)
}

export default CreatePost