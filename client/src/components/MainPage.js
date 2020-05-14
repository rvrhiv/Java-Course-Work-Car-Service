import React, {Component} from "react";
import TopBar from "./TopBar";
import Menu from "./Menu";
import PageContent from "./PageContent";
import "bootstrap/dist/css/bootstrap.css";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.buttonMenuClick = this.buttonMenuClick.bind(this);
        this.state = {
            whichButton: 'cars'
        }
    }

    buttonMenuClick(buttonName) {
        this.setState({
            whichButton: buttonName
        })
    }

    render() {
        return (
            <div>
                <TopBar />

                <div style={{background: 'none'}} className="mt-5 container-lg">
                    <Row>
                        <Col md="3" sm="3" style={{background: '#fff87a'}}>
                            <h3 style={{textAlign: 'center'}}>Select a table</h3>
                            <Menu buttonMenuClick={this.buttonMenuClick} activeButton={this.state.whichButton}/>
                        </Col>
                        <Col md="8" sm="8">
                            <PageContent whichContent={this.state.whichButton}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default MainPage;