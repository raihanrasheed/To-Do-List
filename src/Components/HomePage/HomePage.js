import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [isEditable, setIsEditable] = useState(false);
  let id = useRef(null);
  let [toDo, setToDo] = useState([]);
  // let ToDo=localStorage.getItem("to-do")||[];
  console.log(toDo);
  const handelAdd = (e) => {
    e.preventDefault();
    // console.log(ToDo);
    // localStorage.setItem("to-do",ToDo.push(JSON.stringify({id:Math.random() ,title:title,description:description})))
    setToDo([
      ...toDo,
      { id: Math.random(), title: title, description: description },
    ]);
    setTitle(" ");
    setDescription(" ");
    console.log(title);
  };
  //  let information=[...arr];
  //  information[e.target.name]=setArr(e.target.value);
  //     console.log(information)

  const rest = (e) => {
    e.preventDefault();
    setTitle(" ");
    setDescription(" ");
  };
  const deleteFun = (index) => {
    let newToDo = [...toDo];
    newToDo.splice(index, 1);

    setToDo(newToDo);
    //console.log(index);
    //console.log(newToDo);
  };

  const editFun = (index, element) => {
    setTitle(element.title);
    setDescription(element.description);
    setIsEditable(true);
    id.current = element.id;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    let newToDo = [...toDo];
    newToDo = newToDo.map((ele, idx) => {
      if (ele.id === id.current) {
        ele = { id: id.current, title: title, description: description };

        console.log(ele);
      }

      return ele;
    }, []);
    setDescription(" ");
    setTitle(" ");
    //console.log(newToDo)
    //console.log(id);
    setToDo(newToDo);
       setIsEditable(false);
  };

  const add = (e) => {};
  return (
    <div>
      <div className="simple-to-do">

      Simple Todo List App
      
      </div>
      <form>
        <div className="title">
          <label htmlFor="title" className="title">Title</label>
          <br></br>
          <input
         className="title-txt"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>


        <div className="description">
          <br></br>
          <label for="description" className="title">Description</label>
          <br></br>
          <textarea
          className="description-txt"
            id="description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="btn">
          {isEditable ? (
            <button className="edit" onClick={(e) => handleEdit(e)}>
              Edit
            </button>
          ) : (
            <button
            
              type="button"
              className="btn-btn-primary"
              disabled={title.trim().length === 0}
              onClick={(e) => {
                handelAdd(e);
              }}
            >
              Add
            </button>
          )}

          {/* { 
          toDo.map(
            (task,idx)=>(
<h3> {task.title}  </h3>
            ),[]
          )
          
          } */}
          <button
           className="btn-btn-primary" 
           type="button" onClick={rest}>
            Rest
          </button>
        </div>
      </form>
      {toDo.map((ele, idx) => {
        return (
          <div key={idx}>
            <h3> {ele.title}</h3>
            <p>{ele.description}</p>
            <button
              onClick={() => {
                deleteFun(idx);
              }}
              
                className="btn-btn-primary2"
            >
              Delete
            </button>
            <button className="btn-btn-primary2" onClick={() => editFun(idx, ele)}>Edit</button>
          </div>
        );
      }, [])}
    </div>
  );
}
