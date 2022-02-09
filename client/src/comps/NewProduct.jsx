import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewProduct({setupdate}) {

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:1000/category")
            const data = await res.json();
            setcategory(data)
            console.log(data)
          })();
    }, []);

    const AddProd = async () => {
        const res = await fetch(`http://localhost:1000/newproduct`,{
            method: "post",
            headers: {'content-type':'application/json'},
            body:JSON.stringify({name ,price, img, category_id }),
        })
        const data = await res.json();
        if(res.status == 400){
            alert(data.err)
        }else{
            alert(data.msg);
            navigate('/products')
            setupdate(up => !up)
        }
    }

    const [name, setname] = useState("");
    const [price, setprice] = useState(0);
    const [img, setimg] = useState("");
    const [category_id, setcategory_id] = useState(1);
    const [category, setcategory] = useState();
    const navigate = useNavigate()

  return <div className='newprod'>
       <h2>Add New product</h2>
       <br />
      <h3>Enter the name of the product:</h3>
      <input onChange={e=> setname(e.target.value)} type="text" />
      <h3>price:</h3>
      <input onChange={e=> setprice(e.target.value)} type="number" />
      <h3>Image URL:</h3>
      <input onChange={e=> setimg(e.target.value)} type="text" />
      <br /><br />
      <h3>Category:</h3>
        <select onChange={e=> setcategory_id(e.target.value)}>
        {
            category && category.map(category => <option key={category.id} value={category.id}>{category.type}, {category.gender}</option>)
        }
        </select>
        <br />
        <br />
        <button onClick={AddProd}>Add product</button>
        <br />
  </div>;
}
