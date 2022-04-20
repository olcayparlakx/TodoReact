import React,{useEfect} from "react";
import { Tabs,Layout,Row,Col,List } from "antd";
import TodoItem from './TodoItem';


const TodoTap = ({todos,onTodoRemoval, onTodoToggle}) => {

    return(

        <>
        <List 
             locale={{ emptyText : "Hiçbir görev yok",}}
             dataSource={todos}
             renderItem={(todo)=>{
                <TodoItem
                    todo={todo}
                    onTodoToggle={onTodoToggle}
                    onTodoRemoval ={onTodoRemoval}
                />

             }}
             pagination={{
                position:'bottom',
                pageSize: 10,

             }}
        />
        </>


    )


}

export default TodoTap;