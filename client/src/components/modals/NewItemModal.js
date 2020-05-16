import React from "react";
import Modal from "react-bootstrap/Modal";
import FormCarsTable from "../forms/FormCarsTable";

function NewItemModal(props) {
    const {whichTable, ...rest} = props;

    return (
        <Modal
            {...rest}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Create new Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormCarsTable onHide={props.onHide} whichTable={whichTable}/>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default NewItemModal;