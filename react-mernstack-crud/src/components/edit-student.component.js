import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class EditStudent extends Component {
    
    constructor(props) {
        super(props)

        this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
        this.onChangeStudentId = this.onChangeStudentId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
        name: '',
        email: '',
        userId: ''
        }
    }

    componentDidMount() {

        const { forId } = this.props.location.state

        axios.get('http://localhost:4000/students/edit-student/'+ forId)
        .then((res) => {
            this.setState({
                name: res.data.name,
                email: res.data.email,
                userId: res.data.userId
            })
        }).catch((error) => {
            console.log(error)
            console.log(this.props)
        })
    }

    onChangeStudentName(e) {
        this.setState({ name: e.target.value })
    }
    
    onChangeStudentEmail(e) {
        this.setState({ email: e.target.value })
    }
    
    onChangeStudentId(e) {
        this.setState({ id: e.target.value })
    }
    
    onSubmit(e) {
        e.preventDefault()
    
        const studentObject = {
          name: this.state.name,
          email: this.state.email,
          userId: this.state.userId
        };

        const forId = this.props.location.state.forId;
    
        axios.put('http://localhost:4000/students/update-student/'+ forId, studentObject)
          .then((res) => {
            console.log(res.data)
            console.log('Student successfully updated')
          }).catch((error) => {
            console.log(error)
          }
        )
    
        // Redirect to Student List 
        this.props.history.push('/student-list')
    }
    
    render() {
        return (
            <div class="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
                    </Form.Group>

                    <Form.Group controlId="Id">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" value={this.state.userId} onChange={this.onChangeStudentId} />
                    </Form.Group>
                    
                    <Button variant="danger" size="lg" block="block" type="submit" >
                        Update Student
                    </Button>

                </Form>
            </div>
        )
    }
}