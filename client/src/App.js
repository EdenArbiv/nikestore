import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Branches from './comps/Branches';
import Cart from './comps/Cart';
import Header from './comps/Header';
import NewProduct from './comps/NewProduct';
import Product from './comps/Product';
import Products from './comps/Products';


export default function App() {

  const [sort, setsort] = useState(1);
  const [products, setproducts] = useState([]);
  const [update, setupdate] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:1000/")
      const data = await res.json();
      setproducts(data);
      console.log(data)
    })();
  }, [update])

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:1000/`,{
        method: "post",
        headers: {'content-type':'application/json'},
        body:JSON.stringify({sort}),
    })
    const data = await res.json();
    setproducts(data);
    })();
  }, [sort])
 
  return(
     <Router>
  <div>
   <Header setsort={setsort}/>
    <Routes>
      <Route path="/" element={<Products products={products}/>}/>
      <Route path="/products" element={<Products products={products}/>}/>
      <Route path="/newproduct" element={<NewProduct setupdate={setupdate}/>}/>
      <Route path="/product/:productid" element={<Product setupdate={setupdate}/>}/>
      <Route path="/branches" element={<Branches/>}/>
      <Route path="/cart" element={<Cart/>}/>

    </Routes>

  </div>
    </Router>
  )
}
