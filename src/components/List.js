import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
function List({items,removeItem,editItem}) {
    return (
        <div>
           {
               items.map((item,index)=>{
                   const {id,title}=item;
                   return (
                       <article key={id} className="list-item">
                          <p className="title">  {title}</p>
                          <div className="btn-container">
                              <button className="edit-btn" onClick={()=>editItem(id)}><FaEdit/></button>
                              <button className="delete-btn" onClick={()=>removeItem(id)}><FaTrash/></button>
                          </div>
                          
                           </article>
                    )
               })
           }
        </div>
    )
}

export default List
