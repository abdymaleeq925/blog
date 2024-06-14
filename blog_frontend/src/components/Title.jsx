import React from 'react';

import '../styles/title.css';

const Title = ( { title } ) => {
  return (
    <div className='title'>
      <div className="container">
        <h1 className='title-3xl'>{ title }</h1>
      </div>
    </div>
  )
}

export default Title
