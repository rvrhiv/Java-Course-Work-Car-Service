import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";

class TopBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar bg="light">
                    <Navbar.Brand>
                        Car Service
                    </Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}

export default TopBar;