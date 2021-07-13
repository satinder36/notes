import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import List from './components/List';
import Alert from './components/Alert';

const getLocaleStorageList = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};



function App() {
  const [list,setList]=useState(getLocaleStorageList());
  const [name,setName] =useState('');
  const [isEditing,setIsEditing] =useState(false);
  const [editId,setEditId] =useState(null);
  const[alert,setAlert]=useState({show:false,msg:"",type:""});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Submit Form");
    if(!name){
      showAlert(true,"Please Enter a value","danger");
    }
    else if(name && isEditing){
      // const newSetEditItem= list.map(( item)=>{
      //   if(item.id=== editId){
      //     return {...item,title:name};
      //   }
      //   return item;
      // })

      setList(list.map(( item)=>{
        if(item.id=== editId){
          console.log(item,"item in setList");
          return {...item,title:name};
        }
        return item;
      }));
      
      setEditId(null);
      setIsEditing(false);
      setName('');
      showAlert(true,"Value Changed","sucess");

    }
    else{
      const newName={id:new Date().getTime().toString(),title:name}
      setList([...list,newName])
      setName('');
      showAlert(true,"Item Added Sucessfully","sucess");
    }
    
  }

  const showAlert=(show=false,msg="",type="")=>{
    console.log("Show Alert");
    setAlert({show,msg,type});
  }

  const clearList=()=>{
    console.log("clarrr");
    setList([]);
    showAlert(true,"items cleared","danger")
  }

  const removeItem=(itemId)=>{
    console.log(itemId,"ID remove ITems");
    showAlert(true,"Item Deleted","danger")
    const newItems=list.filter((item) =>{ 
      return itemId!==item.id;
    });

    setList(newItems);
  }
const editItem =(id)=>{

  const newEditItem= list.find((item)=> item.id===id)
  console.log(newEditItem.title,"Edit Itemss");
setEditId(id);
setIsEditing(true);
setName(newEditItem.title);
}

useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(list))
},[list]);

  return (
    <div className="App">
      <section className="section-center">
        <form className="form" onSubmit={handleSubmit}>
          { alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <div className="form-control">
          <input className="input" type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
          <button className="submit-btn"> {isEditing?'Edit':'Submit'}</button>
          </div>
        </form>
        
        {list.length > 0  && 
        (<div>
        <List items={list} removeItem={removeItem} editItem={editItem}></List>
        <button className="clear-items" onClick={clearList}>Clear items</button>
        </div>)}
      </section>
    </div>
  );
}

export default App;
