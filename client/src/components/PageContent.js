import React, {Component} from "react";
import Table from "./Table";

class PageContent extends Component {
    constructor(props) {
        super(props);
        this.drawContent = this.drawContent.bind(this);
    }

    drawContent() {
        switch (this.props.whichContent) {
            case 'cars':
        }
    }

    render() {
        return (
            <div>{this.props.whichContent}</div>
        );
    }
}

export default PageContent;