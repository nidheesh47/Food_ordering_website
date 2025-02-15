import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ data }) => {
  return (
    <div className="cardslider  rounded-2xl overflow-hidden bg-base-100 w-60 shadow-xl">
      
        <figure>
          <img className="w-[100%] h-[15vh]" src={data.image} alt={data.name} />
        </figure>
        <div className="card-body flex justify-center">
          <h2 className="card-title">{data.name}</h2>
        </div>
      
    </div>
  );
};

export default Card;
