import React from 'react';

export default function Branch({branch}) {
  return <div className='card'>
  <img  src={branch.img} alt="img" />
        <h3>{branch.location}</h3>
        <h6>{branch.address}</h6>
        <h6>{branch.number}</h6>
        <h6>{branch.open}</h6>
</div>
}
