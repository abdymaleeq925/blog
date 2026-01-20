import React from 'react';
import { Skeleton, Stack } from '@mui/material';
import '../styles/skeleton.scss';

const PostSkeleton = ({ variant }) => {

  if (variant === 'recent') {
    return (
      <div className='post-item post-item--recent skeleton'>
        <div className="post-item-wrapper">
          <Skeleton variant="rounded" animation="wave" width={515} height={430} sx={{ bgcolor: 'var(--dark-10)' }} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="30%" height={60} sx={{ bgcolor: 'var(--dark-10)' }} />
            <Skeleton variant="text" width="90%" height={60} sx={{ bgcolor: 'var(--dark-10)' }} />
            <Skeleton variant="text" width="100%" height={100} sx={{ bgcolor: 'var(--dark-10)' }} />
            <Stack direction="row" justifyContent='space-between' alignItems="center" >
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ bgcolor: 'var(--dark-10)' }} />
                <Skeleton variant="rectangular" width={100} height={40} sx={{ bgcolor: 'var(--dark-10)' }} />
              </Stack>
              <Skeleton variant="rectangular" width={100} height={40} sx={{ bgcolor: 'var(--dark-10)', mt: 4 }} />
            </Stack>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className='post-item post-item--list skeleton'>
        <div className="post-item-wrapper">
          <Skeleton variant="rounded" width={510} height="240px" sx={{ mb: 2, bgcolor: 'var(--dark-10)' }} />
          <Skeleton variant="text" width="80%" height={32} sx={{ bgcolor: 'var(--dark-10)' }} />
          <Skeleton variant="text" width="40%" height={24} sx={{ bgcolor: 'var(--dark-10)' }} />
          <Stack direction="row" justifyContent='space-between'>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rounded" width={50} height={30} sx={{ bgcolor: 'var(--dark-10)' }} />
              <Skeleton variant="rounded" width={50} height={30} sx={{ bgcolor: 'var(--dark-10)' }} />
            </Stack>
            <Skeleton variant="rounded" width={80} height={30} sx={{ bgcolor: 'var(--dark-10)' }} />
          </Stack>
        </div>
      </div>
    );
  }

  if (variant === 'video') {
    return (
      <div className='skeleton skeleton--video'>
        <Stack spacing={1.875}>
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
          <div className="skeleton-video-info">
            <Skeleton variant="text" width="90%" height={32} sx={{ bgcolor: 'var(--dark-10)'}}/>
            <Skeleton variant="text" width="70%" height={32} sx={{ bgcolor: 'var(--dark-10)'}}/>
            {/* Описание (2 строки) */}
            <Skeleton variant="text" width="100%" height={24} sx={{ bgcolor: 'var(--dark-10)'}}/>
            <Skeleton variant="text" width="85%" height={24} sx={{ bgcolor: 'var(--dark-10)'}}/>
          </div>
        </Stack>
      </div>
    );
  }

  return (
    <div className='skeleton skeleton--post'>
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="circular" width={80} height={80} sx={{ bgcolor: 'var(--dark-10)' }} />
        <Stack spacing={1}>
          <Skeleton variant="text" width={150} height={24} sx={{ bgcolor: 'var(--dark-10)' }} />
          <Skeleton variant="text" width={150} height={24} sx={{ bgcolor: 'var(--dark-10)' }} />
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="text" width={150} height={24} sx={{ bgcolor: 'var(--dark-10)' }} />
        <Stack spacing={0.5}>
          <Skeleton variant="text" width={250} height={24} sx={{ bgcolor: 'var(--dark-10)' }} />
          <Skeleton variant="text" width={950} height={24} sx={{ bgcolor: 'var(--dark-10)' }} />
        </Stack>
      </Stack>
      <Skeleton variant="rounded" width={150} height={60} sx={{ bgcolor: 'var(--dark-10)' }} />
    </div>
  );
}

export default PostSkeleton
