import React, {Component} from "react";
import TopBar from "./TopBar";
import Menu from "./Menu";
import PageContent from "./PageContent";
import "bootswatch/dist/litera/bootstrap.css"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.buttonMenuClick = this.buttonMenuClick.bind(this);
        this.state = {
            whichButton: sessionStorage.getItem("whichButton")
        }
    }

    componentDidMount() {
        sessionStorage.setItem("whichButton", "cars");
    }

    buttonMenuClick(buttonName) {
        if (buttonName !== this.state.whichButton) {
            this.setState({
                whichButton: buttonName
            })
            sessionStorage.setItem("whichButton", buttonName);
        }
    }

    render() {
        return (
            <div>
                <TopBar />

                <div style={{background: 'none'}} className="mt-5 container-lg">
                    <Row>
                        <Col md="3" sm="3" style={{background: 'none'}}>
                            <h3 style={{textAlign: 'center'}}>Select a table</h3>
                            <Menu buttonMenuClick={this.buttonMenuClick} activeButton={sessionStorage.getItem("whichButton")}/>
                        </Col>
                        <Col md="8" sm="8">
                            <PageContent whichContent={sessionStorage.getItem("whichButton")}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default MainPage;