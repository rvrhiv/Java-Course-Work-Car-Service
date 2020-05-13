import React, {Component} from "react";
import TopBar from "./TopBar";
import Menu from "./Menu";
import PageContent from "./PageContent";

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
        console.log(buttonName + " from MainPage")
    }

    render() {
        return (
            <div>
                <TopBar />
                <Menu buttonMenuClick={this.buttonMenuClick} />
                <PageContent whichContent={this.state.whichButton} />
            </div>
        );
    }
}

export default MainPage;