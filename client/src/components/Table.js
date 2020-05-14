import React, {Component} from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import cellEditFactory from 'react-bootstrap-table2-editor';

class Table extends Component {
    constructor(props) {
        super(props);
        this.handleEmptyTable = this.handleEmptyTable.bind(this);
        this.validatorColumns = this.validatorColumns.bind(this);
        this.products = [{
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
        }, {
            id: '5',
            name: 'product2',
            price: '3000'
        }, {
            id: '6',
            name: 'product3',
            price: '2000'
        }, {
            id: '7',
            name: 'product4',
            price: '4000'
        }, {
            id: '8',
            name: 'product2',
            price: '3000'
        }, {
            id: '9',
            name: 'product3',
            price: '2000'
        }, {
            id: '10',
            name: 'product4',
            price: '4000'
        }, {
            id: '11',
            name: 'product2',
            price: '3000'
        }, {
            id: '12',
            name: 'product3',
            price: '2000'
        }, {
            id: '13',
            name: 'product4',
            price: '4000'
        }, {
            id: '14',
            name: 'product2',
            price: '3000'
        }, {
            id: '15',
            name: 'product3',
            price: '2000'
        }, {
            id: '16',
            name: 'product4',
            price: '4000'
        }, {
            id: '17',
            name: 'product2',
            price: '3000'
        }, {
            id: '18',
            name: 'product3',
            price: '2000'
        }, {
            id: '19',
            name: 'product4',
            price: '4000'
        }, {
            id: '20',
            name: 'product2',
            price: '3000'
        }];

        this.columns = [{
            dataField: 'id',
            text: 'ID',
            sort: true,
            headerStyle: {
                outline: 'none',
                width: '10%'
            }
        }, {
            dataField: 'name',
            text: 'Product Name',
            sort: true,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: 'price',
            text: 'Product Price',
            sort:true,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }];

        this.pagination = paginationFactory({
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true,

        });

        this.cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: true,
            autoSelectText: true,
            onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
            beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
            afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
        });
    }

    handleEmptyTable() {
        return (<div>Table is Empty :(</div>);
    }

    validatorColumns(newValue, row, column) {
        if (newValue.toString().length >= 26) {
            return {
                valid: false,
                message: "Too many characters!"
            }
        }
        return true;
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: 'left'}}>{this.props.whichTable}</h1>
                <BootstrapTable
                    bootstrap4
                    keyField='id'
                    data={ this.products }
                    columns={ this.columns }
                    noDataIndication={this.handleEmptyTable}
                    bordered={false}
                    pagination={this.products.length <= 3 ? "" : this.pagination}
                    cellEdit={this.cellEdit}

                    hover
                />
            </div>
        );
    }
}

export default Table;