import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StudentTableRow from './StudentTableRow';

export default class StudentList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            students: []
        };
        this.handler = this.handler.bind(this)
    }

    handler() {
        axios.get('http://localhost:4000/students/')
            .then(res => {
                this.setState({
                    students: res.data
                });
            })
            .catch((error) => {
                console.log(error.response);
            }
        )
    }

    componentDidMount() {
        axios.get('http://localhost:4000/students/')
            .then(res => {
                this.setState({
                    students: res.data
                });
            })
            .catch((error) => {
                console.log(error.response);
            }
        )
    }


    DataTable() {
        return this.state.students.map((res, i) => {
            return <StudentTableRow obj={res} key={i} handler = {this.handler} />
        });
    }

    render() {
        return (
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.DataTable()}
                    </tbody>
                </Table>
            </div>
        );
    }
}