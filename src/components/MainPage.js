"use strict";
import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import ShowTable from './ShowTable';

import XLSX from 'xlsx'

export default class extends React.Component{
state = {
      mydata:undefined,
      show:true,
      error:false
  }

onDelete = (id) => {
  const that = this;
  console.log("hello", id);
  axios.delete('/deleteData', {data:{ employeeId: id}}).then(function (response) {
      if(response.data==true)
      {
         that.viewDB();
      }
      else{
        that.setState({error:true})
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

onSave = (obj,objId) => {
  var that = this;
  axios.put('/editData', {obj:obj}).then(function (response) {
      console.log(response)
      if(response.data == true)
      {
        that.viewDB();
      }
      else{
        that.setState({error:true})
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

viewDB = () => {
  console.log("view db");
  var that = this;
  this.setState({mydata:null})
  axios.get('/getData')
    .then(function (response) {
      console.log(response,"data from viewDb");
      that.setState({mydata: response.data, error:false})
      if(respose!==null){
        that.setState({error:true})
      }

     })
    .catch(function (error) {
      console.log(error);
    });
}

handleChange = (event) => {
    const reader = new FileReader();
    const that = this;
    reader.onload = function(){
    const fileData = reader.result;
    const wb = XLSX.read(fileData, {type : 'binary'});
    wb.SheetNames.forEach(function(sheetName){
    const rowObj =XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
    const jsonObj = JSON.stringify(rowObj);
    axios.post('/fileUpload', rowObj)
      .then(function (response) {
        console.log(response,"resssppooommssee");
        if(response.data==true)
          {
              that.viewDB();
          }
          else{
            that.setState({error:true})
          }
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    };
    reader.readAsBinaryString(event[0]);
}
  render(){
    return (
      <div>
        <Dropzone onDrop={this.handleChange} className="mydropzone">
          <img className="cloud" src="./images/upload-cloud.png" />
          <p className="drag">Drag & Drop file here</p>
          <p className="or">OR</p>
          <p className="browse">Browse file</p>
        </Dropzone>

        {this.state.error==true?<p className="error">*Please upload correct file</p>:null}
        <button
        className="viewDBbutton"
          type= "submit"
          onClick={this.viewDB}>View Database</button>

      {this.state.mydata && (<ShowTable mydata={this.state.mydata}
        edit= {this.state.edit}
        onSave={this.onSave}
        onDelete={this.onDelete}/>) }
      </div>
    )
  }
}
