import React from 'react';
import { Skeleton, Stack } from '@mui/material';
import '../styles/skeleton.scss';

const PostSkeleton = ({ variant = 'post' }) => {
  // Вариант для постов
  if (variant === 'post') {
    return (
      <div className='skeleton skeleton--post'>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width="100%" height="300px"/>
          <div className="skeleton-info">
            <div className="skeleton-user">
              <Skeleton variant="text" width="40%" height={24}/>
              <Skeleton variant="text" width="50%" height={24}/>
            </div>
            <Skeleton variant="text" width="70%" height={36}/>
            <Skeleton variant="text" width="100%" height={72}/>
            <div className="skeleton-category">
              <Skeleton variant="text" width="20%" height={24}/>
            </div>
          </div>
        </Stack>
      </div>
    );
  }

  // Вариант для видео карточек
  if (variant === 'video') {
    return (
      <div className='skeleton skeleton--video'>
        <Stack spacing={1.875}>
          {/* Видео с aspect ratio 16:9 */}
          <div className="skeleton-video-wrapper">
            <Skeleton 
              variant="rounded" 
              width="100%" 
              height="100%"
              sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '8px'
              }}
            />
            <Skeleton 
              variant="rounded" 
              width={60} 
              height={28}
              sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                borderRadius: '6px',
                zIndex: 1
              }}
            />
          </div>
          {/* Информация о видео */}
          <div className="skeleton-video-info">
            {/* Заголовок (2 строки, min-height: 4rem) */}
            <Skeleton variant="text" width="90%" height={32} />
            <Skeleton variant="text" width="70%" height={32} />
            {/* Описание (2 строки) */}
            <Skeleton variant="text" width="100%" height={24} />
            <Skeleton variant="text" width="85%" height={24} />
          </div>
        </Stack>
      </div>
    );
  }

  // Дефолтный вариант
  return (
    <div className='skeleton'>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width="100%" height="200px"/>
        <Skeleton variant="text" width="100%" height={24}/>
        <Skeleton variant="text" width="80%" height={24}/>
      </Stack>
    </div>
  );
}

export default PostSkeleton
