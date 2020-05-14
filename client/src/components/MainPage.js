import React, {Component} from "react";
import TopBar from "./TopBar";
import Menu from "./Menu";
import PageContent from "./PageContent";
import "bootstrap/dist/css/bootstrap.css";

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
                <div className="container" style={{background: '#a6ff85'}}>
                    <div className="row">
                        <div className="col-md-3 col-sm-3" style={{background: '#fff87a'}}>
                            <h3>Select a table</h3>
                            <Menu buttonMenuClick={this.buttonMenuClick} activeButton={this.state.whichButton}/>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <PageContent whichContent={this.state.whichButton} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;