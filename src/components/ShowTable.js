import React from 'react';
import axios from 'axios';

export default class extends React.Component{

state = {
    edit: false,
    employeeId:null,
    name:null,
    role:null,
    location:null
  }

onDelete = (id) => {
    console.log(id,"id to be deleted");
    this.props.onDelete(id)
  }

onEdit = (employeeId,name,role,location) =>{
    console.log(employeeId,name,role,location)
    this.setState({employeeId,name,role,location, edit:true})
  }

onSave = () => {
    var obj= {
      employeeId: this.state.employeeId,
      name: this.state.name,
      role: this.state.role,
      location: this.state.location,
    }
    this.setState({edit:false,employeeId:null})
    this.props.onSave(obj)
  }

editRow = (e) =>{
    if(e.target.id == "name"){
      this.setState({name: e.target.value})
    }
    if(e.target.id == "role"){
      this.setState({role: e.target.value})
    }
    if(e.target.id == "location"){
      this.setState({location: e.target.value})
    }
  }

render(){
      return (
        <div >
        <table className="mdl-data-table mdl-js-data-table  mdl-shadow--2dp tableDisplay">
            <thead>
            <tr>
              <th className="mdl-data-table__cell--center">Employee Id</th>
              <th>Name</th>
              <th>Role</th>
            <th>Office Location</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            {
              this.props.mydata.map((data,index)=>
            {
              return(
                <tbody key={index}>
                <tr>
                <td  className="mdl-data-table__cell--non-numeric">
                  <input onChange={this.editRow}
                   readOnly= {true}
                  className="inputField"
                  id="employeeId"
                  defaultValue ={data['employeeId']}/>
                </td>
                <td>
                  <input onChange={this.editRow}
                   id="name"
                   readOnly= {this.state.employeeId !== data['employeeId']}
                   className="inputField"
                   defaultValue = {data['name']}/>
                 </td>
                <td>
                  <input onChange={this.editRow}
                  id="role"
                  readOnly= {this.state.employeeId !== data['employeeId']}
                  className="inputField"
                  defaultValue = {data['role']}/>
                </td>
                <td>
                  <input onChange={this.editRow}
                  id="location"
                   readOnly= {this.state.employeeId !== data['employeeId']}
                   className="inputField"
                   defaultValue = {data['location']}/>
                </td>

               {this.state.edit===true
                ?<td>
                   <button onClick ={()=>this.onSave()}>
                      <div className="icon material-icons">save</div>
                   </button>
                 </td>
                :<td>
                   <button onClick ={()=>this.onEdit(data['employeeId'],data['name'],data['role'],data['location'])}>
                      <div className="icon material-icons">edit</div>
                   </button>
                 </td>}
                <td>
                  <button onClick={()=>this.onDelete(data['employeeId'])}>
                    <div className="icon material-icons">delete</div>
                  </button>
                </td>
                </tr>
              </tbody>
            )}
          )}
        </table>
        </div>
      )
  }
}
