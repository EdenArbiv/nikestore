import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card({product }) {
    const navigate = useNavigate()

    const AddToCart =async (productid) => {
        const res = await fetch(`http://localhost:1000/product/${productid}`,{
            method: "post",
            headers: {'content-type':'application/json'},
        })
        const data = await res.json();
        if(res.status == 400){
            alert(data.err)
        }else{
            console.log(data);
        }
    }

  return <div className='card'>
        <img  src={product.img} alt="img" onClick={() => navigate(`/product/${product.id}`)} />
              <h3>{product.name}</h3>
              <h6>{product.price}₪</h6>
              <button onClick={()=> AddToCart(product.id)} className='btn'><span className="material-icons-outlined">add_shopping_cart</span></button>
  </div>
}
