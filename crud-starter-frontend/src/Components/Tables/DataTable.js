import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';
import axios from 'axios';
const cron = require('node-cron');

class DataTable extends Component {

  handleConvo = (cust_id, cust_convo) => {
    const updateConvo = {
      cust_id,
      cust_convo
    }

    axios.post('http://localhost:3000/addConvo', updateConvo)

  }

  sendEmail = (cust_email,cust_name,cust_gst,rem_freq) => {
    // e.preventDefault();

    const dataToSubmit = {
      cust_email,
      cust_name,
      cust_gst,
      rem_freq

    }
      
    axios.post('http://localhost:3000/api/sendMail', dataToSubmit)
    window.alert('Your email has been sent to '+cust_email);

  }


  deleteItem = cust_id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/crud', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cust_id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(cust_id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        
        <tr key={item.cust_id}>
          <th scope="row">{item.cust_id}</th>
          <td>{item.cust_name}</td>
          <td>{item.cust_email}</td>
          <td>{item.cust_phn}</td>
          <td>{item.cust_address}</td>
          <td>{item.cust_gst}</td>
          <td>{item.rem_freq}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit User" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.cust_id)}>Delete</Button> &nbsp;
              <Button color="success" onClick={() => this.sendEmail(item.cust_email,item.cust_name,item.cust_gst,item.rem_freq)}>Send Email</Button>
              {/* <Button color="success" onClick={() => this.updateConvo(item.cust_id, item.cust_convo)}>Send Email</Button> */}
            </div>
          </td>
        </tr>
         

      )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>cust_id</th>
            <th>cust_name</th>
            <th>cust_email</th>
            <th>cust_phn</th>
            <th>cust_address</th>
            <th>cust_gst</th>
            <th>rem_freq</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable