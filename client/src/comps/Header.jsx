import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({setsort}) {

    const navigate = useNavigate()

  return <div className='header'>
      <div className='logo' onClick={() => navigate(`/products`)} >
      <h1 >Nike  <img className='img' src="https://i.pinimg.com/736x/d5/c7/2c/d5c72cb18497d1ea65f29f0857a8c760.jpg" alt="logo" /></h1>
      </div>
      <div className='links'>
    <Link to='/products'><h1>Home <span className="material-icons-outlined">
    home</span></h1></Link>
    <h1>||</h1>
    <Link to='/branches'><h1>branches <span className="material-icons-outlined">
    store</span></h1></Link>
    <h1>||</h1>
    <Link to='/cart'><h1>My Cart <span className="material-icons-outlined">shopping_cart</span></h1></Link>
    </div>
    <div className='sort'>
        <select onChange={e => setsort(e.target.value)}>
            <option value="1">Sort By All</option>
            <option value="2">Men</option>
            <option value="3">Women</option>
            <option value="4">Accessories</option>
            <option value="5">Shoes</option>
            <option value="6">clothes</option>
        </select>
    </div>
  </div>;
}
