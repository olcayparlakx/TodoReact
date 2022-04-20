import React, {useEffect,useState, useCallback }from "react"; 

import { Tabs,Layout,Row, Col, Input,message } from "antd";

import './TodoList.css';

import TodoTab from  './TodoTab';

import TodoFrom from  './TodoForm';

import {createTodo,deleteTodo,loadTodos,updateTodo} from  '../services/todoService';
// import { TabPane } from "rc-tabs";

const { TabPane } = Tabs;
const { Content}  = Layout;



const  TodoList= () => {
    const [refreshing,setRefreshing] = useState(false);
    const [todos,setTodos] = useState([]);
    const [activeTodos,setActiveTodos] = useState([]);
    const [completedTodos,setCompletedTodos] = useState();

    const handleFormSubmit = (todo) => {
        console.log('Görev oluşturuldu',todo);
        createTodo(todo).then(onRefresh());
        message.success('Görev Eklendi.');
    }

    const handleRemoveTodo = (todo) => {

        deleteTodo(todo.id).then(onRefresh());
        message.warn('Görev Silindi');


    }
    const handleToggleTodoStatus = (todo) => {

        todo.complated = !todo.complated;
        updateTodo(todo).then(onRefresh());
        message.info('Görev Güncellendi')

    }
    const refresh = () => {

        loadTodos()
            .then(json=> {

                setTodos(json);
                setActiveTodos(json.filter(todo=>todo.complated==false));
                setCompletedTodos(json.filter(todo=>todo.complated==true));

            }).then(console.log('tamamlandı'));

    }
    const onRefresh = useCallback( async () => {
        setRefreshing(true);
        let data =await loadTodos();
        setTodos(data);
        setActiveTodos(data.filter(todo=>todo.complated==false))
        setCompletedTodos(data.filter(todo=>todo.complated==true));
        setRefreshing(false);
        console.log('refresh state',refreshing);

    }, [refreshing]); 

    useEffect(()=>{
        refresh();
    }, [onRefresh])

    return (
   <Layout className="layout">
       <Content style={{padding:'0 50px'}}>
        <div className="todolist">
            <Row>
                <Col span={14} offset={5}>
                    <h1>Olcay görevler</h1>
                    <TodoFrom onFormSubmit={handleFormSubmit}/>
                    <br/>
                    <Tabs defaultActiveKey="all" >
                        <TabPane tab="Hepsi" key="all">
                            <TodoTab todos={todos}  onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                        </TabPane>
                        <TabPane tab="Aktif" key="active">
                        <TodoTab todos={activeTodos}  onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>

                        </TabPane>
                        <TabPane tab="Tamamlananlar" key="complate" >
                        <TodoTab todos={completedTodos}  onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>

                        </TabPane>
                    </Tabs>

                </Col>

            </Row>

        </div>

       </Content>

   </Layout>


    )
}


export default TodoList;