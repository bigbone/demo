import React from 'react';
import TodoItem from './todoitem';
import { Button } from 'antd';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.setFilter = this.setFilter.bind(this);
    }


    setFilter(e) {
        let value = e.target.getAttribute('data-fitlertype')
        this.props.filterTodolist(value);
    }

    render() {
        let filterfun = {
            'all': function(arr) {
                return arr;
            },
            'complete': function(arr) {
                return arr.filter(function(item) {
                    return item.complete == "true";
                });
            },
            'active': function(arr) {
                return arr.filter(function(item) {
                    return item.complete == "false";
                });
            }
        }
        let fitlertype = this.props.filtertype || 'all';
        let data = filterfun[fitlertype](this.props.data);

        var taskList = data.map(listItem =>
            <TodoItem taskId = { listItem.id }
            key = { listItem.id }
            task = { listItem.task }
            complete = { listItem.complete }
            toggleComplete = { this.props.toggleComplete }
            deleteTask = { this.props.deleteTask }/>
        )
        return ( <div>
            <div>
            <Button type="button" data-fitlertype = 'all' onClick={ this.setFilter } class="ant-btn pull-right ant-btn-danger"><span>all</span></Button>
            <Button type="button" data-fitlertype = 'complete' onClick={ this.setFilter } class="ant-btn pull-right ant-btn-danger"><span>complete</span></Button>
            <Button type="button" data-fitlertype = 'active' onClick={ this.setFilter } class="ant-btn pull-right ant-btn-danger" ><span>active</span></Button>
            </div>
            <ul className = "list-group" >
             { taskList } 
             </ul>

            </div>
        )
    }
}