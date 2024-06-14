import React from 'react';

import { Register, Login } from '../components';
import { useState } from 'react';

import illustration from '../assets/login_illustration.svg'

const Registration = () => {

    const [form, setForm] = useState('login');
    
  return (
    <div className="forms">
        <div className="forms__wrapper">
            <div className="form">
                {
                    form === 'login' ?
                    <Login formType={form} setFormType={setForm}/> : <Register formType={form} setFormType={setForm}/>
                }
            </div>
            <div className="forms__illustration">
                <div className="forms__illustration-txt">
                    <h2 className="h2">Read breaking news</h2>
                    <p>
                        On all devices daily.
                    </p>
                </div>
                <img src={illustration} alt="" />
            </div>
        </div>
    </div>   
  )
}

export default Registration
