import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import './NumberList.css'

function NumberList() {

  const actualState = useSelector(state => state)
  const [directory, setDirectory] = useState([])
  useEffect(() => {
    setDirectory(actualState)
  }, [actualState])

  return (
    <div className='NumberList'>
      {directory.length
      ? (<ol>
      {directory.map((el, i) => {
        return (
          <li key={i}>{el.code + el.number}</li>
        )
      })}
      </ol>)
      : null
    }
    </div>
  );
}

export default NumberList;
