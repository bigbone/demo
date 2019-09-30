import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Form, Input, Button,notification } from 'antd';
export default class AddTodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.saveNewItem = this.saveNewItem.bind(this)
    this.enterSave = this.enterSave.bind(this)
  }
  saveNewItem(e) {
    e.preventDefault()
    let element = ReactDOM.findDOMNode(this.refs.newItem)
    let task = element.value
    if (!task) {
      notification.open({
        description: 'Todo内容不得为空！',
    });
    } else {
      this.props.saveNewItem(task)
      element.value = ""
    }
  }
  enterSave(e){
    if (e.which !== 13) return
    this.saveNewItem(e);
  }
  render() {
    return (
      <div className="addtodoitem"> 
        <Form.Item>
          <label htmlFor="newItem"></label>
          <Input id="newItem" ref="newItem" type="text"  onKeyPress={this.enterSave}  placeholder="吃饭睡觉打豆豆~"></Input>
          <Button type="primary" className="pull-right"  onClick={this.saveNewItem}>保存</Button>
        </Form.Item>
      </div>
    )
  }
}