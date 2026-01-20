import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import '../styles/FourOFour.scss';

const FourOFour = () => {
  const navigate = useNavigate();

  return (
    <section className="page_404">
      <div className="container">
        <div className="four_zero_four_bg">
            <h1 className="text-center ">404</h1>
        </div>
        <div className="contant_box_404">
            <h3 className="h2">Look like you're lost</h3>
            <p>The page you are looking for is not available right now.</p>
            <Link to={navigate(-1)} className="btn btn-primary">Go Back</Link>
        </div> 
        
      </div>
    </section>
  );
};

export default FourOFour;
