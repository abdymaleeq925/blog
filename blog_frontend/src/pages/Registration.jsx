import React from 'react';

import { Register, Login } from '../components';
import { useState } from 'react';

const Registration = () => {

    const [form, setForm] = useState('login');
    
  return (
    <div className="forms">
        
        <div className="form">
            {
                form === 'login' ?
                <Login formType={form} setFormType={setForm}/> : <Register formType={form} setFormType={setForm}/>
            }
        </div>
        
    </div>   
  )
}

export default Registration
