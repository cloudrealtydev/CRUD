import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateStudent extends Component {

    constructor(props) {
        super(props)

        //Setting up functions
        this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
        this.onChangeStudentId = this.onChangeStudentId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            name: '',
            email: '',
            userId: ''
        }
    }

    onChangeStudentName(e) {
        this.setState({name: e.target.value})
    }
    
    onChangeStudentEmail(e) {
        this.setState({email: e.target.value})
    }
    
    onChangeStudentId(e) {
        this.setState({userId: e.target.value})
    }
    
    onSubmit(e) {
        e.preventDefault()

        const studentObject = {
            name: this.state.name,
            email: this.state.email,
            userId: this.state.userId
        };

        axios.post('http://localhost:4000/students/create-student', studentObject)
            .then(res => console.log(res.data));

        /*{console.log('Student successfullt created!');
        console.log('Name: ${this.state.name}');
        console.log('Name: ${this.state.email}');
        console.log('Name: ${this.state.id}');}*/

        this.setState({name: '', email: '', userId: ''})
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
                    </Form.Group>

                    <Form.Group controlId="userId">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" value={this.state.userId} onChange={this.onChangeStudentId} />
                    </Form.Group>
                    
                    <Button variant="danger" size="lg" block="block" type="submit" >
                        Create Student
                    </Button>

                </Form>
            </div>
        );
    }
}