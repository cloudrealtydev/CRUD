import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// import EditStudent from './edit-student.component';


export default class StudentTableRow extends Component {
    
    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent() {
        axios.delete('http://localhost:4000/students/delete-student/' + this.props.obj._id)
            .then((res) => {
                console.log('Student succefully deleted!')
            }).catch((error) => {
                console.log(error)
            }
        );
        this.props.handler();
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.userId}</td>
                <td>
                    <Link className="edit-link"  to={{pathname: "/edit-student/" + this.props.obj._id, state: { forId: this.props.obj._id } }} >
                        Edit
                    </Link>
                    <Button size="sm" variant="danger" onClick={this.deleteStudent} >Delete</Button>
                </td>
            </tr>
        );
    }
}