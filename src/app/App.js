import React from 'react';
import './App.css';
import Dialog from '../components/dialog';

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentList:{
                text:'',
                key:''
            },
            get_task:3,
            isOpen:false,
            task_list:[],
            task_key:[]
        }
        
        //Bind Fucntions
            this.addItem = this.addItem.bind(this);
            this.handleInput = this.handleInput.bind(this);
            this.listItems = this.listItems.bind(this);
            this.deleteItem = this.deleteItem.bind(this);
            this.clearAll = this.clearAll.bind(this);
            this.WhatShouldIdoButtonDisplay = this.WhatShouldIdoButtonDisplay.bind(this);
            this.getTask = this.getTask.bind(this);
            //this.showTask = this.showTask.bind(this);
    }
    
    handleInput = (e) =>
    {
        this.setState({
            currentList:{
                text: e.target.value,
                key: Date.now()
            }
        })
        
        console.log(this.state.currentList.key);
    }
    
    addItem = (e) =>
    {
        e.preventDefault();
        const newList = this.state.currentList;
        var flag = 0;
        console.log(newList.text);
        
        if(newList.text !== "")
        {
            for(var i = 0; i < this.state.task_list.length; i++)
            {
                if(this.state.task_list[i].toUpperCase() === newList.text.toUpperCase())
                {
                    flag = 1;    
                }
                    
            }
            
            if(flag !== 1)
            {
                this.state.task_list.push(newList.text);
                this.state.task_key.push(newList.key);
            }
        }
        
        console.log(this.state.task_list);
        console.log(this.state.task_key);
        
        this.setState({currentList:{text:'', key:''}});
    }
    
    listItems = () => 
    {
        let items = this.state.task_list;
        return (
            items.map((val, index) => {
            return (
              <li className='list-group-item shadow'>
                    <span className='float-left'>{index+1+'. '}{val}</span>
                    <span className='float-right'>
                        <button className='btn btn-link text-danger' onClick={(e) => this.deleteItem(val)}>Remove</button>
                    </span>
                </li>
            );
          })
        );
    }
    
    deleteItem = (val) =>
    {
        let items = this.state.task_list;
        let temp_items = [];
        
        for(var i = 0; i < items.length; i++)
        {
           if(items[i] !== val )
            {
                temp_items.push(items[i]);
            }
        }
        
        items = temp_items;
        temp_items = [];
        this.setState({task_list:items});
        console.log(items);
    }

    clearAll = (e) =>
    {
        e.preventDefault();
        this.setState({task_list:[]});
    }
    
    WhatShouldIdoButtonDisplay = () =>
    {
        const temp_list = this.state.task_list;
        var flag = 0;
        
        for(var i = 0; i < temp_list.length; i++)
        {
            if(temp_list[i] !== "undefined")
            {
                flag = 1;
                break;
            }
                
        }
        
        /*
        if(flag === 1)
            return(<button type='button' className='btn btn-primary btn-lg btn-block' onClick={this.getTask}>What Should I do ?</button>);
        else
            return(<button type='button' className='btn btn-primary btn-lg btn-block' disabled>What Should I do ?</button>);
        */
        
        if(flag === 1)
        {
            return(
                <button className='btn btn-primary btn-lg btn-block' onClick={(e) => this.setState({ isOpen: true })}>
                    What Should I do ?
                </button>
            );
        }
        else
        {
            return(<button type='button' className='btn btn-primary btn-lg btn-block' disabled>What Should I do ?</button>);
        }
    }
    
    getTask = (e) => 
    {
        e.preventDefault();
        let items_length = this.state.task_list.length;
        let get_random = Math.floor(Math.random() * (items_length));
        console.log(get_random);
        
        this.setState({get_task:get_random});
        
        this.showTask(get_random);
    }
    
    //Getting the Random Pick to this function "showTask()" in order to refresh the data and present the updated one
    //otherwise it will show "undefined"
    showTask = (get_random) =>
    {
        console.log(this.state.task_list[get_random]);
        //alert(this.state.task_list[get_random]);
        
    }
    
    
    render()
    {
        return(
        
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <br />
                        <div className="card">
                            <div className="card-body">
                                {this.WhatShouldIdoButtonDisplay()}
                                <Dialog isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })} task_list={this.state.task_list}></Dialog>
                                <br />
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="list-body">
                                            <ul className="list-group">
                                                <h5><span className="float-left">Tasks</span><span className="float-right"><button className="btn btn-danger btn-sm" onClick={this.clearAll}>Clear All Tasks</button></span></h5>
                                                {this.listItems()}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <form className="form-inline">
                                        <div className="col-md-8">
                                            <div className="input-box">
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-lg text-center" placeholder="Enter Your Task" value={this.state.currentList.text} onChange={this.handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <button className="btn btn-success btn-lg btn-block" onClick={this.addItem}> + Add Task</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        );
    }
}

export default App;