import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Product({setupdate}) {
    const {productid} = useParams()
    const [product, setproduct] = useState(false);
    const [active, setactive] = useState(false);
    const [price, setprice] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
        const res = await fetch(`http://localhost:1000/product/${productid}`)
        const data = await res.json();
         setproduct(data);
         console.log(data)
        })();
    }, [])

    const DeleteProd = async () => {
        const res = await fetch(`http://localhost:1000/product/${productid}`,{
          method: "delete",
        })
        const data = await res.json();
        alert(data.msg);
        navigate('/products')
        setupdate(up => !up)
    }

    const UpdatePrice = async () => {
       
    const res = await fetch(`http://localhost:1000/product/${productid}`,{
        method: "put",
        headers: {'content-type':'application/json'},
        body:JSON.stringify({price}),
        })
        const data = await res.json();
        alert(data.msg);
        navigate('/products')   
        setupdate(up => !up)
    }



    return product && <div className='product'>
        <img  src={product[0].img} alt="img" />
        <h3>{product[0].name}</h3>
        <h6>{product[0].price}₪</h6>
        <input onChange={e => setprice(e.target.value)} type='number' className={active ? "none" : "show" }/>
        <button onClick={UpdatePrice} className={active ? "none" : "show" }>Change</button>
        <br />
        <button onClick={DeleteProd}>Delete Product</button>  
        <button onClick={() => navigate(`/products`)}>Return</button>
        <button onClick={() => setactive(up =>!up)}>Update</button>

    </div>
}
