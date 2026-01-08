import React from 'react';
import { Skeleton, Stack } from '@mui/material';

const PostSkeleton = () => {
  return (
    <div className='skeleton'>
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
  )
}

export default PostSkeleton
