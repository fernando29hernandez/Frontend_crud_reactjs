import React, { Component } from "react";
import RegistroService from "../services/api.service";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from '@material-ui/core';
import AddRegistro from "./add.component";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default class List extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveRegistro = this.setActiveRegistro.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onChangeage = this.onChangeage.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.onChangecountry = this.onChangecountry.bind(this);
        this.onChangecity = this.onChangecity.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);
        this.updateRegistro = this.updateRegistro.bind(this);
        this.deleteRegistro = this.deleteRegistro.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
        this.viewRegistro = this.viewRegistro.bind(this);
        this.closecurrent = this.closecurrent.bind(this);
        this.state = {
            registros: [],
            currentRegistro: null,
            currentIndex: -1,
            message: "",
            value: 0,

        };
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    componentDidMount() {
        this.obtenerregistros();
    }

    obtenerregistros() {
        RegistroService.getAll()
            .then(response => {
                this.setState({
                    registros: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    refreshList() {
        this.obtenerregistros();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveRegistro(registro, index) {
        this.setState({
            currentRegistro: registro,
            currentIndex: index
        });
        this.handleChangeIndex(1)
    }
    viewRegistro(registro, index) {
        this.setState({
            currentRegistro: registro,
            currentIndex: index
        });
    }
    closecurrent() {
        this.setState({
            currentRegistro: null,
            currentIndex: -1
        });
    }
    onChangename(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentRegistro: {
                    ...prevState.currentRegistro,
                    name: name
                }
            };
        });
    }

    onChangegender(e) {
        const gender = e.target.value;

        this.setState(prevState => ({
            currentRegistro: {
                ...prevState.currentRegistro,
                gender: gender
            }
        }));
    }
    onChangeage(e) {
        const age = e.target.value;

        this.setState(prevState => ({
            currentRegistro: {
                ...prevState.currentRegistro,
                age: age
            }
        }));
    }
    onChangeaddress(e) {
        const address = e.target.value;

        this.setState(prevState => ({
            currentRegistro: {
                ...prevState.currentRegistro,
                address: address
            }
        }));
    }
    onChangecountry(e) {
        const country = e.target.value;

        this.setState(prevState => ({
            currentRegistro: {
                ...prevState.currentRegistro,
                country: country
            }
        }));
    }
    onChangecity(e) {
        const city = e.target.value;

        this.setState(function (prevState) {
            return {
                currentRegistro: {
                    ...prevState.currentRegistro,
                    city: city
                }
            };
        });
    }
    onChangestatus(e) {
        const status = e.target.value;

        this.setState(prevState => ({
            currentRegistro: {
                ...prevState.currentRegistro,
                status: status
            }
        }));
    }
    updateRegistro() {
        RegistroService.update(
            this.state.currentRegistro._id,
            this.state.currentRegistro
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "El registro se ha actualizado!"
                });
            })
            .catch(e => {
                console.log(e);
            });
        this.handleChangeIndex(0)
        this.obtenerregistros();
        this.refreshList();
    }

    deleteRegistro(id) {
        RegistroService.delete(id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/registros')
            })
            .catch(e => {
                console.log(e);
            });
        this.obtenerregistros();
        this.refreshList();
        this.setState({
            message: "El registro se ha eliminado!"
        });
    }

    render() {
        const { registros, currentRegistro, currentIndex } = this.state;

        return (

            <AppBar position="static" color="default">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Listado" {...a11yProps(0)} />


                    <Tab label="Formulario"{...a11yProps(1)} />
                </Tabs>
                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabPanel value={this.state.value} index={0}>
                    <label>{this.state.message}</label>
                        <Typography variant="body2" component={'div'}>
                            <div className="list row">

                                <div className="col-md-8">
                                    <TableContainer component={Paper}>
                                        <Table size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Id</TableCell>
                                                    <TableCell align="right">Name</TableCell>
                                                    <TableCell align="right">Age</TableCell>
                                                    <TableCell align="right">Gender</TableCell>
                                                    <TableCell align="right">Address</TableCell>
                                                    <TableCell align="right">Country</TableCell>
                                                    <TableCell align="right">City</TableCell>
                                                    <TableCell align="right">Acciones</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {registros.map((row, index) => (
                                                    <TableRow key={row._id}>
                                                        <TableCell component="th" scope="row">
                                                            {row._id}
                                                        </TableCell>
                                                        <TableCell align="right">{row.name}</TableCell>
                                                        <TableCell align="right">{row.age}</TableCell>
                                                        <TableCell align="right">{row.gender}</TableCell>
                                                        <TableCell align="right">{row.address}</TableCell>
                                                        <TableCell align="right">{row.country}</TableCell>
                                                        <TableCell align="right">{row.city}</TableCell>
                                                        <TableCell align="right">
                                                            <ButtonGroup orientation="horizontal">
                                                                <Button
                                                                    type="submit"
                                                                    className="badge badge-success"
                                                                    onClick={() => this.setActiveRegistro(row, index)}
                                                                    variant="contained" color="default"
                                                                >
                                                                    Update
                                                                </Button>
                                                                <Button
                                                                    type="submit"
                                                                    className="badge badge-success"
                                                                    onClick={() => this.deleteRegistro(row._id)}
                                                                    variant="contained" color="secondary"
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button
                                                                    type="submit"
                                                                    className="badge badge-success"
                                                                    onClick={() => this.viewRegistro(row, index)}
                                                                    variant="contained" color="primary"
                                                                >
                                                                    View
                                                                </Button>
                                                            </ButtonGroup>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className="col-md-4">
                                    {currentRegistro ? (

                                        <div>
                                            <DeleteIcon color="secondary" />
                                            <Button
                                                type="submit"
                                                className="badge badge-success"
                                                onClick={() => this.closecurrent()}
                                                color="secondary"
                                            >
                                                Close
                                         </Button>
                                            <h4>Detalles Registro</h4>
                                            <div>
                                                <label>
                                                    <strong>Name:</strong>
                                                </label>{" "}
                                                {currentRegistro.name}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Gender:</strong>
                                                </label>{" "}
                                                {currentRegistro.gender}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Age:</strong>
                                                </label>{" "}
                                                {currentRegistro.age}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Address:</strong>
                                                </label>{" "}
                                                {currentRegistro.address}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Country:</strong>
                                                </label>{" "}
                                                {currentRegistro.country}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>City:</strong>
                                                </label>{" "}
                                                {currentRegistro.city}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Status:</strong>
                                                </label>{" "}
                                                {currentRegistro.status}
                                            </div>
                                        </div>
                                    ) : (
                                            <div>
                                                <br />
                                                <label>Please click on a Registro...</label>
                                            </div>
                                        )}
                                </div>

                            </div>
                        </Typography>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1} >

                        <div className="content">
                            {currentRegistro ? (
                                <div className="edit-form">
                                    <h4>Actualizar Registro</h4>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="Name">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={currentRegistro.name}
                                                onChange={this.onChangename}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Gender</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="gender"
                                                value={currentRegistro.gender}
                                                onChange={this.onChangegender}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Age</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="age"
                                                value={currentRegistro.age}
                                                onChange={this.onChangeage}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                value={currentRegistro.address}
                                                onChange={this.onChangeaddress}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="country"
                                                value={currentRegistro.country}
                                                onChange={this.onChangecountry}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                value={currentRegistro.city}
                                                onChange={this.onChangecity}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="status"
                                                value={currentRegistro.status}
                                                onChange={this.onChangestatus}
                                            />
                                        </div>
                                    </form>
                                    <Button
                                        type="submit"
                                        className="badge badge-success"
                                        onClick={this.updateRegistro}
                                        variant="contained" color="default"
                                    >
                                        Update
                                        </Button>
                                   
                                </div>
                            ) : (

                                    <AddRegistro />

                                )}
                        </div>

                    </TabPanel>
                </SwipeableViews>
            </AppBar>

        );

    }

}