import { useEffect, useState } from "react"

export default function Todo(){
const [title, setTitle]=useState("");
const [description, setDescription]=useState("");
const [todos, setTodos]= useState([]);
const [editId,setEditId]=useState(-1);
const [error,setError]=useState("");
const [message,setMessage]=useState("");
const apiurl="http://localhost:8000/";

//Edit
const [editTitle,setEditTitle]=useState("");
const [editDescription,setEditDescription]=useState("");

const handleSubmit = () => {
    setError("");
    //check inputs
    if(title.trim()!=="" && description.trim()!==""){
        fetch(apiurl+"todos",{ 
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({title,description})
        }).then((res)=>{
            if(res.ok){
                //add item to list
            setTodos([...todos,{title,description}]);
            setTitle("");
            setDescription("");
            setMessage("Item Added Successfully");
            setTimeout(() => {
                setMessage("");
            },3000);
            }else{
                //set error
                setError("Failed to add item");
            }
            }).catch(()=>{
                setError("Failed to add item");
        });
    }
}
useEffect( () => {
    getitems();
},[]);

const getitems = () => {
    fetch(apiurl+"todos")
    .then((res) => res.json())
    .then((res)=>{
        setTodos(res);
    })
}

const handleEdit = (items) => {
    setEditId(items._id);
    setEditTitle(items.title);
    setEditDescription(items.description);

}

const handleUpdate = () => { 
    setError("");
    //check inputs
    if(editTitle.trim()!=="" && editDescription.trim()!==""){
        fetch(apiurl+"todos/"+editId,{ 
            method:"PUT",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({title:editTitle,description:editDescription})
        }).then((res)=>{
            if(res.ok){
        const UpdatedTodos = todos.map((items) => {
                if(items._id == editId){
                    items.title = editTitle;
                    items.description = editDescription;
                }
                return items;
            })
                //add item to list
            setTodos(UpdatedTodos);
            setEditTitle("");
            setEditDescription("");
            setMessage("Item Added Successfully");
            setTimeout(() => {
                setMessage("");
            },3000);
            setEditId(-1);
            }else{
                //set error
                setError("Failed to add item");
            }
            }).catch(()=>{
                setError("Failed to add item");
        });
    }

}

const handleEditCancel = () => {
    setEditId(-1);
}

const handleDelete = (_id) => {
    if(window.confirm("Are you sure to delete?")){
        fetch(apiurl+'/todos/',+_id,{
            method:"DELETE"
        }).then(()=>{
           const UpdatedTodos = todos.filter((items) => items._id !== _id);
           setTodos(UpdatedTodos);
        })

}
}
    return<>
     <div className="row p-3 bg-success text-light">
        <h1>ToDo Project Using MERN Stack</h1>
    </div>
    <div className="row">
        <h3>Add Item</h3>
        {message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-2">
        <input className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title" type="text"/>
        <input className="form-control" onChange={(e) => setDescription(e.target.value)}value={description} placeholder="Description" type="text"/>
        <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="mt-4">
            <h3>Tasks</h3>
            <ul className="list-group">
                {todos.map((items)=>{
                    return <li className="list-group-items bg-info d-flex justify-content-between align-items-center my-2">
                    <div className="d-flex flex-column">
                        {
                            editId == -1 || editId !== items._id ?<>
                            <span className="fw-bold">{items.title}</span>
                            <span>{items.description}</span>
                            </> : <>
                                <div className="form-group d-flex gap-2">
                                <input className="form-control" onChange={(e) => setEditTitle(e.target.value)} value={editTitle} placeholder="Title" type="text"/>
                                <input className="form-control" onChange={(e) => setEditDescription(e.target.value)} value={editDescription} placeholder="Description" type="text"/>
                                </div>
                            </>
                        }
                    </div>
                    <div className="d-flex gap-2">
                        {
                            editId == -1 ||editId !== items._id ? <button className="btn btn-warning" onClick={() => handleEdit(items)}>Edit</button>:<button className="btn btn-warning" onClick={handleUpdate}>Update</button>
                        }
                    {editId == -1 ? <button className="btn btn-danger" onClick={() => handleDelete(items._id)}>Delete</button>:
                    <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>}
                    </div>
                </li>
                })}
            </ul>
        </div>
    </div>
    </>
}