import React, {Component} from "react";
import Table from "./Table";

class PageContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Table whichTable={this.props.whichContent}/>
            </div>
        );
    }
}

export default PageContent;