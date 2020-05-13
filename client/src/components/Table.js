import React, {Component} from "react";

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>Table name: {this.props.whichTable}</div>
                <table>
                    <tr>
                        <Raw />
                    </tr>
                </table>
            </div>
        );
    }
}

class Raw extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <td>HI</td>
                <td>WORLD!</td>
            </React.Fragment>
        );
    }
}

export default Table;