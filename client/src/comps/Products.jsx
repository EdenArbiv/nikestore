import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

export default function Products({products}) {
  
    const navigate = useNavigate()
   

  return <div className='main'>
       <button className='add' onClick={() => navigate(`/newproduct`)} ><span className="material-icons-outlined">add_circle_outline</span></button>
      {
          products && products.map(product => <Card key={product.id} product={product} />)
      }
  </div>;
}
