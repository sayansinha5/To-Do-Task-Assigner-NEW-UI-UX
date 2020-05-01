import React from 'react';

let dialogStyles = {
    width:'300px',
    maxWidth:'100%',
    margin:'0 auto',
    position:'fixed',
    left:'50%',
    top:'20%',
    transform:'translate(-50%, 50%)',
    zIndex:'999',
    backgroundImage:'linear-gradient(#667eea, #764ba2)',
    boxShadow: '0px 8px 25px 0px rgba(0,0,0,0.75)',
    color:'#fff',
    padding:'30px 10px 0px 10px',
    borderRadius:'5px'
};

class Dialog extends React.Component
{
    render()
    {
        let task_lists = this.props.task_list;
        
        let no_of_tasks = task_lists.length;
        let get_random = Math.floor(Math.random() * (no_of_tasks));
        
        let dialog = (
            
            <div style={dialogStyles}>
                <div>
                    <h5 className="text-center">
                        {task_lists[get_random]}
                    </h5>
                </div>
                <br />
                <div className="text-center">
                    <button className="btn btn-warning" onClick={this.props.onClose}>Okay</button>
                </div>
                <br />
            </div>
        );
        
        if(!this.props.isOpen)
        {
            dialog = null;
        }
        
        return(
            <div>
                {dialog}
            </div>
        );
    }
}

export default Dialog;