import React, { useEffect, useState } from 'react';
import Branch from './Branch';

export default function Branches() {
    
    const [branches, setbranches] = useState([]);

    useEffect(() => {
        (async () => {
          const res = await fetch("http://localhost:1000/branches")
          const data = await res.json();
          setbranches(data);
          console.log(data)
        })();
      }, [])

  return <div className='main'>
      {
          branches.map(branch => <Branch key={branch.id} branch={branch}/>)
      }
  </div>;
}
