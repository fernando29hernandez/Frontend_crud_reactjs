import React, { Component } from "react";
import RegistroService from "../services/api.service";
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
export default class AddRegistro extends Component {
    constructor(props) {
        super(props);
        this.onChangename = this.onChangename.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onChangeage = this.onChangeage.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.onChangecity = this.onChangecity.bind(this);
        this.onChangecountry = this.onChangecountry.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);
        this.save = this.save.bind(this);
        this.newRegistro = this.newRegistro.bind(this);

        this.state = {
            _id: null,
            name: null,
            gender: null,
            age: null,
            address: null,
            city: null,
            country: null,
            status: null,
            message: null,
        };
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangegender(e) {
        this.setState({
            gender: e.target.value
        });
    }
    onChangeage(e) {
        this.setState({
            age: e.target.value
        });
    }
    onChangeaddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangecity(e) {
        this.setState({
            city: e.target.value
        });
    }
    onChangecountry(e) {
        this.setState({
            country: e.target.value
        });
    }

    onChangestatus(e) {
        this.setState({
            status: e.target.value
        });
    }
    save() {
        var data = {
            name: this.state.name,
            gender: this.state.gender,
            age: this.state.age,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            status: this.state.status,
        };

        RegistroService.create(data)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    gender: response.data.gender,
                    age: response.data.age,
                    address: response.data.address,
                    city: response.data.city,
                    country: response.data.country,
                    status: response.data.status,
                    message: "El registro ha sido creado!"
                });
                this.newRegistro();
                this.props.history.push('/registros')
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newRegistro() {
        this.setState = {
            _id: null,
            name: null,
            gender: null,
            age: null,
            address: null,
            city: null,
            country: null,
            status: null,
        };
    }


    render() {
        return (
            <Typography variant="body2" component={'div'}>
                <div className="submit-form">
                    
                    <div className="form-group">
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.onChangename}
                            name="name"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">Gender</label>
                        <input
                            type="text"
                            className="form-control"
                            id="gender"
                            required
                            value={this.state.gender}
                            onChange={this.onChangegender}
                            name="gender"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Age</label>
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            required
                            value={this.state.age}
                            onChange={this.onChangeage}
                            name="age"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            required
                            value={this.state.address}
                            onChange={this.onChangeaddress}
                            name="address"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            required
                            value={this.state.city}
                            onChange={this.onChangecity}
                            name="city"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Country</label>
                        <input
                            type="text"
                            className="form-control"
                            id="country"
                            required
                            value={this.state.country}
                            onChange={this.onChangecountry}
                            name="country"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Status</label>
                        <input
                            type="text"
                            className="form-control"
                            id="status"
                            required
                            value={this.state.status}
                            onChange={this.onChangestatus}
                            name="status"
                        />
                    </div>
                    <Button onClick={this.save} color="primary" variant="contained" className="btn btn-success">
                        Create
                    </Button>
                    <br/>
                    <label>{this.state.message}</label>
                </div>
            </Typography>
        );
    }
}