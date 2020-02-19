import React,{useState} from 'react';
import { Input, Button,message, Modal } from 'antd';
import 'antd/dist/antd.css';
const TodoIndex =()=>{
    const[todo,setTodo]=useState([
        {id:'1',title:'todo1',update:false}
    ]);
    const[value,setValue]=useState("");
    const[updateValue,setUpdateValue]=useState();
    const onInputChange =(e)=>{
        setValue(e.target.value);
        // console.log(e.target.value)
    };
    const onUpdateInput =(e)=>{
        // console.log(e.target.value)
        setUpdateValue(e.target.value);
    }
    const onAddTodo=(e)=>{
        if (
            value === ""||
            value === " "||
            value === null||
            value === undefined
        ) {
            message.warning("please enter task");
            return;
        }
        let tempList=[];
        let count= todo.length;
        tempList=[
            ...todo,{
                id:count+1,
                title:value,
                update:false
            }
        ];
        // console.log(tempList);
        setTodo(tempList);
        setValue("");
    };

    const onUpdateTodo =(data,index)=>{
        setUpdateValue(data.title);
        let tempList=[...todo];
        tempList.map((item,i)=>{
            if(index===i){
                tempList[i]={ ...tempList[i],title:updateValue,update:true}
            }
        }
        );
        setTodo(tempList);
        console.log(tempList)
        setValue("");
    };
    const onSaveTodo =(data,index)=>{
        let tempList=[...todo];
        tempList.map((item,i)=>{
            if(index===i){
                tempList[i]={...tempList[i],title:updateValue,update:false}
            }
        });
        message.success("Successfully Updated Record");
        setTodo(tempList);
    };
    const onDeleteTodo=(data,index)=>{
        let tempList=[...todo];
        tempList.splice(index,1);
        message.warning("Delete data");
        setTodo(tempList);
    };
    return(
        <div style={{marginTop:'15px'}}>
            <div style={{textAlign:'center'}}>
                <div> 
                    <Input style={{width:'40%'}} value={value} onChange={onInputChange} />
                </div>
                    <Button onClick={onAddTodo} style={{marginTop:'5px'}} type="primary"> Add todo </Button>
                <div style={{marginTop:'15px'}}>
                    <ul style={{listStyle:"none"}}>
                        {todo.map((item,i)=>(
                            <li key={i} style={{marginTop:'5px'}}>
                                {item.update === false ? (
                                    item.title 
                                ):(
                                    <Input value={updateValue} onChange={onUpdateInput} style={{width:'30%'}} />
                                )}
                                <span>{item.update === false ? (
                                        <Button onClick={()=>onUpdateTodo(item,i)} type="primary"> Update </Button>
                                    ):(
                                        <Button onClick={()=>onSaveTodo(item,i)} type="success"> Save </Button>
                                    )}
                                </span>
                                <Button onClick={()=>onDeleteTodo(item,i)} type="danger"> Delete </Button>
                            </li>
                            )
                        )}
                        
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoIndex;


