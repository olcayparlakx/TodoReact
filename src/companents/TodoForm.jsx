import React from "react";  
import { Form, Row, Col, Button, Input} from 'antd';


const TodoForm = ({onFormSubmit}) =>{
    const [form] = Form.useForm();
    
    const onFinish = () => {
        onFormSubmit({
            title : form.getFieldValue('tittle'),
            complated : false

        });
        console.log( form.getFieldValue('tittle'));

        form.resetFields();

    }
    
    return(
            <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            className="todo-form"
            >
            <Row gutter={20}>
                <col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item
                        name = {'title'}
                        rules ={[{ required : true , message : "This field is required"}]}>
                        <Input placeholder="What needs to be done"></Input>
                    </Form.Item>
                </col>
                <col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Button type="primary" htmlType="submit" block>
                        Add Todo
                    </Button>
                </col>

            </Row>
            </Form>


    );


}
export default TodoForm;