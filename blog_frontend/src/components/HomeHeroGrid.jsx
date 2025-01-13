import React from 'react';

import PostItem from './PostItem';
import '../styles/HomeHeroGrid.css';

const HomeHeroGrid = ( { postList }) => {

  const shortList = Array.isArray(postList)
    ? postList.length > 4
        ? postList.slice(-5, -1).reverse()
        : [...postList].reverse()
    : [];

  return (
    <div className='hero-grid'>
      <h2 className='title-sm'>Recent blog posts</h2>
        <div className="hero-grid__wrapper">
            {
                shortList?.map((item, index) => {
                    return <PostItem 
                        key={index} 
                        id={item._id}
                        size={ index===0 ? 'post-item--sm' : index===3 ? 'post-item--md' : 'post-item--lg'}
                        direction={index===0 ? 'column' : 'row'}
                        title={item.title}
                        author={item.user.fullName}
                        date={new Date(item.createdAt).toLocaleDateString()}
                        text={item.text}
                        tags={item.tags}
                        image={item.imageUrl}
                        views={item.viewsCount}
                        />
                })
            }
        </div>
      </div>
  )
}

export default HomeHeroGrid
