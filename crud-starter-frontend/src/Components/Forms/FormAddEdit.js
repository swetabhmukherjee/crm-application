import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    cust_name: '',
    cust_email: '',
    cust_phn: '',
    cust_address: '',
    cust_gst: '',
    rem_freq: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cust_name: this.state.cust_name,
        cust_email: this.state.cust_email,
        cust_phn: this.state.cust_phn,
        cust_address: this.state.cust_address,
        cust_gst: this.state.cust_gst,
        rem_freq: this.state.rem_freq
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cust_id: this.state.cust_id,
        cust_name: this.state.cust_name,
        cust_email: this.state.cust_email,
        cust_phn: this.state.cust_phn,
        cust_address: this.state.cust_address,
        cust_gst: this.state.cust_gst,
        rem_freq: this.state.rem_freq
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { cust_id, cust_name, cust_email,cust_phn,cust_address,cust_gst, rem_freq } = this.props.item
      this.setState({ cust_id, cust_name, cust_email,cust_phn,cust_address,cust_gst, rem_freq })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="cust_id">cust_id - DO NOT EDIT </Label>
          <Input type="text" name="cust_id" id="cust_id" onChange={this.onChange} value={this.state.cust_id === null ? 'DO NOT EDIT' : this.state.cust_id} />
        </FormGroup>
        <FormGroup>
          <Label for="cust_name">cust_name</Label>
          <Input type="text" name="cust_name" id="cust_name" onChange={this.onChange} value={this.state.cust_name === null ? '' : this.state.cust_name} />
        </FormGroup>
        <FormGroup>
          <Label for="cust_email">cust_email</Label>
          <Input type="email" name="cust_email" id="cust_email" onChange={this.onChange} value={this.state.cust_email === null ? '' : this.state.cust_email}  />
        </FormGroup>
        <FormGroup>
          <Label for="cust_phn">cust_phn</Label>
          <Input type="text" name="cust_phn" id="cust_phn" onChange={this.onChange} value={this.state.cust_phn === null ? '' : this.state.cust_phn}  />
        </FormGroup>
        <FormGroup>
          <Label for="cust_address">cust_address</Label>
          <Input type="text" name="cust_address" id="cust_address" onChange={this.onChange} value={this.state.cust_address === null ? '' : this.state.cust_address}  placeholder="ex. 555-555-5555" />
        </FormGroup>
        <FormGroup>
          <Label for="cust_gst">cust_gst</Label>
          <Input type="text" name="cust_gst" id="cust_gst" onChange={this.onChange} value={this.state.cust_gst === null ? '' : this.state.cust_gst}  placeholder="City, State" />
        </FormGroup>
        <FormGroup>
          <Label for="rem_freq">rem_freq</Label>
          <Input type="text" name="rem_freq" id="rem_freq" onChange={this.onChange} value={this.state.rem_freq}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm