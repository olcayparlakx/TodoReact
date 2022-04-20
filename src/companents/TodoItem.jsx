import React, {useStage} from 'react';
import {Tooltip , Tag , List , Button , Popconfirm , Switch} from 'antd';
import  {closeOutlined, CheckOutlined} from '@ant-design/icons';

const Todo = ({todo, onTodoRemoval, onTodoToggle}) =>{

    return(

        <List.Item
            actions={[
                <Tooltip
                title={todo.comleted? 'Mark as unclompleted' : 'Mark as completed'}>
                    <Switch
                        checkedChildren={<CheckOutlined/>}
                        uncheckedChildren={<closeOutlined/>}
                        onChange ={() => onTodoToggle(todo)}
                        defaultChecked = {todo.comleted}
                        />

                </Tooltip>,
                <Popconfirm
                    title= {'Are you sure you want to delete'}
                    onConfirm = {() =>{
                        onTodoRemoval(todo);

                    }}>
                        <Button className="remove-todo button" type="primary" danger>
                            Sil
                        </Button>
                </Popconfirm>
            ]}

        className="list-item"
        key={todo.id}
        >
         <div className='todo-item'>
         <tag color={todo.comleted?'cyan' : 'red'} className ='todo-tag'>

            {todo.title}
         </tag>

         </div>
        </List.Item>
    )

}

export default Todo;