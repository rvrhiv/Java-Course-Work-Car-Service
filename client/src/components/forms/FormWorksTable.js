import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import {addData} from "../../actions/AddData";
import {loadData} from "../../actions/LoadData";

class FormWorksTable extends React.Component{
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);

        this.state = {
            validated: false,
            cars: [],
            masters: [],
            services: []
        }
    }

    async componentDidMount() {
        await this.loadData();
        console.log("Mount!");
    }

    async loadData() {
        try {
            const carsData = [];
            await loadData("cars").then(array => {
                array.forEach(object => {
                    carsData.push(object);
                })
            });
            const mastersData = [];
            await loadData("masters").then(array => {
                array.forEach(object => {
                    mastersData.push(object);
                })
            });
            const servicesData = [];
            await loadData("services").then(array => {
                array.forEach(object => {
                    servicesData.push(object);
                })
            });
            this.setState({
                cars: carsData,
                masters: mastersData,
                services: servicesData
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            var selectedCar = null;
            this.state.cars.forEach((item) => {
                let index = form.elements.carsSelect.selectedIndex;
                if (item.id.toString() === form.elements.carsSelect[index].value) {
                    selectedCar = item;
                }
            });

            var selectedMaster = null;
            this.state.masters.forEach((item) => {
                let index = form.elements.mastersSelect.selectedIndex;
                if (item.id.toString() === form.elements.mastersSelect[index].value) {
                    selectedMaster = item;
                }
            });
            console.log(selectedMaster);

            var selectedService = null;
            this.state.services.forEach((item) => {
                let index = form.elements.servicesSelect.selectedIndex;
                if (item.id.toString() === form.elements.servicesSelect[index].value) {
                    selectedService = item;
                }
            });


            const work = {
                date_work: form.elements.date_work.value,
                car: selectedCar,
                master: selectedMaster,
                service: selectedService
            };

            addData(this.props.whitchTable, work)
                .then()
                .catch(message => console.log(message));
        }
        this.setState({
            validated: true
        })
    }

    render() {
        console.log(this.state.cars);
        console.log(this.state.masters);
        console.log(this.state.services);
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Work Date</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            name="date_work"
                        />
                        <Form.Control.Feedback type="valid">All right!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="carSelect">
                        <Form.Label>Car</Form.Label>
                        <Form.Control
                            as="select"
                            name="carsSelect"
                        >
                            {this.state.cars.map((item) => (
                                <option key={item.id} value={item.id}>{item.num}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="mastersSelect">
                        <Form.Label>Master</Form.Label>
                        <Form.Control
                            as="select"
                            name="mastersSelect"
                        >
                            {this.state.masters.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="servicesSelect">
                        <Form.Label>Service</Form.Label>
                        <Form.Control
                            as="select"
                            name="servicesSelect"
                        >
                            {this.state.services.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Navbar className="justify-content-end">
                    <NavItem className="ml-1">
                        <Button variant="danger" onClick={this.props.onHide}>Cancel</Button>
                    </NavItem>
                    <NavItem className="ml-1">
                        <Button type="submit" variant="primary">Submit form</Button>
                    </NavItem>
                </Navbar>
            </Form>
        );
    }
}

export default FormWorksTable;