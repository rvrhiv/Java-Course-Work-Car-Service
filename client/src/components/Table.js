import React, {Component} from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import BootstrapTable from "react-bootstrap-table-next"


const products = [{
    id: '1',
    name: 'product1',
    price: '1000'
}, {
    id: '2',
    name: 'product2',
    price: '3000'
}, {
    id: '3',
    name: 'product3',
    price: '2000'
}, {
    id: '4',
    name: 'product4',
    price: '4000'
}];

const columns = [{
    dataField: 'id',
    text: 'Product ID'
}, {
    dataField: 'name',
    text: 'Product Name'
}, {
    dataField: 'price',
    text: 'Product Price'
}];

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>Table name: {this.props.whichTable}</div>
                <BootstrapTable
                    keyField='id'
                    data={ products }
                    columns={ columns }
                    bordered={false}
                    hover
                    bootstrap4
                />
            </div>
        );
    }
}

export default Table;