import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import {addData} from "../../actions/AddData";

class FormCarsTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            validated: false
        }
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            const car = {
                num: form.elements.num.value,
                color: form.elements.color.value,
                mark: form.elements.mark.value,
                is_foreign: form.elements.is_foreign.checked
            }
            addData(this.props.whichTable, car)
                .then()
                .catch(message => console.log(message));
        }
        this.setState({
            validated: true
        })
    }

    render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="color"
                            pattern="^[#]?[a-zA-Zа-яА-Я0-9\s]{1,40}"
                            placeholder="Color"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">All right!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required! Maximum length 40 characters.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
                        <Form.Label>Car Number</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="num"
                            pattern="^[a-zA-Z0-9-]{1,40}"
                            placeholder="Car Number"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">All right!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Label>Mark</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="mark"
                            pattern="^[a-zA-Zа-яА-Я0-9\s]{1,40}"
                            placeholder="Mark"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">All right!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required! Maximum length 40 characters.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Group className="ml-1">
                    <Form.Check
                        type="switch"
                        name="is_foreign"
                        id="custom-switch"
                        label="Is foreign?"
                    />
                </Form.Group>
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

export default FormCarsTable;