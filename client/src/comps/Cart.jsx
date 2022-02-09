import React, { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setcart] = useState();
  const [update, setupdate] = useState(false);

  useEffect(async () => {
    const res = await fetch(`http://localhost:1000/cart`)
    const data = await res.json();
    console.log(data);
    setcart(data)
  }, [update]);
    
  const CleanCart = async () => {
    const res = await fetch(`http://localhost:1000/cleancart`,{
      method: "put",
      headers: {'content-type':'application/json'},
  })
  const data = await res.json();
    console.log(data);
    setupdate(!update)
  }

  
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
        setupdate(!update)
    }
}

  const DeleteFromCart =async (productid) => {
    const res = await fetch(`http://localhost:1000/${productid}`,{
        method: "delete",
        headers: {'content-type':'application/json'},
    })
    const data = await res.json();
    if(res.status == 400){
        alert(data.err)
    }else{
        console.log(data);
        setupdate(!update)
    }
}


  return <div className='cart'>
       <ul>
          {
              cart ? cart.map(item => <li key={item.id}><img className='minimg' src={item.img}/> {item.name}  {item.price * item.qt}₪  x{item.qt} <button onClick={() => AddToCart(item.id)}>+</button> <button onClick={() => DeleteFromCart(item.id)}> -</button></li>) : <h4>No items yet😕</h4>
          }
          
      </ul>
      <br />
    
      <h5 style={{textAlign:"center"}}>The Total Price:  {
          cart && cart.reduce((prev,cur)=> prev + cur.price * cur.qt , 0) 
        } ₪</h5>
      <br />
      <button onClick={CleanCart}>Pay Now</button>
      
  </div>;
}
