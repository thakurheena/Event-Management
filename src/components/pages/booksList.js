"use strict"

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEvents,deleteEvents } from '../../actions/booksActions';
import { Button, Glyphicon } from 'react-bootstrap';
import BookEntry from './bookEntry';
import UpdateEntry from './updateEntry';

class BooksList extends React.Component{
    
    constructor(props){
        super(props);
        const x = this.props.events.filter((record)=>{
            return true;
        });
        this.state = {
            editable : false,
            id : ""
        }
    }
    componentDidMount(){
        //Calling 1st dispatch function
        this.props.getEvents();
    }
    handleDelete(id){
        this.props.deleteEvents(id);
    }
    toggleEditableMode(){
        this.setState(...this.state,{
            editable : false
        })
    }
    updateEntryHandler(event){

    }
    handleEdit(id){
        this.setState(...this.state,{
            editable : true,
            id : id
        })
    }
    view(){
        if (this.state.editable)
            return (<UpdateEntry 
                        //events={this.state.events} 
                        //updateEntryHandler={this.updateEntryHandler.bind(this,event)} 
                        id={this.state.id} 
                        toggleEditableMode={this.toggleEditableMode.bind(this)}
                        events={this.props.events}
                    />);
        else
            return (<BookEntry />);
    }
    // transferingPropsDataToState(){
    //     this.setState(...this.state,{
    //         events: this.props.events
    //     })
    // }
    render(){

        const booksCopy = this.props.events.map((x)=>{
            return Object.assign({},x);
        })
        const booksList = booksCopy.map((booksArr)=>{
            return(
                
                <tr key={booksArr._id}>
                    {/* <td>{booksArr.title}</td> */}
                    <td>{booksArr.description}</td>
                    <td>{booksArr.date}</td>
                    <td>{booksArr.time}</td>
                    <td>{booksArr.venue}</td>                  
                    <td>{booksArr.no_of_people_involved}</td>
                    <td>
                        <Button onClick={this.handleEdit.bind(this,booksArr._id)} type="submit" bsStyle="info" bsSize="xsmall" >
                                Edit
                            </Button>
                    </td>
                    <td>
                        <Button onClick={this.handleDelete.bind(this,booksArr._id)} type="submit" bsStyle="danger" bsSize="xsmall" >
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
        const view = this.view();
        return (
            <div>
                {view}
                <h2 style={{marginTop:'30px',marginBottom:'20px'}}>Event Todos</h2>
                <center >
                
                <table className="table booksTable">
                    <thead>
                        <tr>
                            <th className="textCenter">TITLE</th>
                            {/* <th className="textCenter">DESCRIPTION</th> */}
                            <th className="textCenter">DATE</th>
                            
                            <th className="textCenter">TIME</th>
                            
                            <th className="textCenter">VENUE</th>
                                                      
                            <th className="textCenter">NO OF PEOPLE INVOLVED</th>
                            <th className="textCenter">EDIT</th>
                            <th className="textCenter">DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                {booksList}
                    </tbody>
                </table>
                </center>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        events : state.events
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getEvents : getEvents,
        deleteEvents : deleteEvents
        //otherKey : other action function,
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(BooksList);