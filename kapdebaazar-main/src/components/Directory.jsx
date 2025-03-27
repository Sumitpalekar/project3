import React from 'react'
import "../resources/directory.scss";
import Categoryitem from './Categoryitem';
function Directory(props) {
  return (
    <div className="directory">
      {props.categories.map((category)=>(
          <Categoryitem key={category.id} category={category}/>
      ))}    
    </div>
  )
}

export default Directory;