import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormCarsTable from "../forms/FormCarsTable";

function NewItemModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Create new Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormCarsTable onHide={props.onHide}/>
            </Modal.Body>
            <Modal.Footer>
                {/*<Button variant="danger" onClick={props.onHide}>Cancel</Button>{' '}*/}
                {/*<Button variant="primary" type="submit" form="form-cars-table">Add</Button>*/}
            </Modal.Footer>
        </Modal>
    );
}

export default NewItemModal;