import React, {Component} from "react";
import {loadData} from "../../actions/LoadData"
import {deleteData} from "../../actions/DeleteData";
import {updateData} from "../../actions/UpdateData";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import cellEditFactory from 'react-bootstrap-table2-editor';
import Button from "react-bootstrap/Button";
import NewItemModal from "../modals/NewItemModal";

class CarsTable extends Component {
    constructor(props) {
        super(props);
        this.handleEmptyTable = this.handleEmptyTable.bind(this);
        this.validatorColumns = this.validatorColumns.bind(this);
        this.handleBeforeSaveCell = this.handleBeforeSaveCell.bind(this);
        this.setLoadedData = this.setLoadedData.bind(this);
        this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);

        this.rowObjectSelect = null;

        this.state = {
            loadedData: [],
            modalShow: false
        }

        this.columns = [{
            dataField: 'id',
            text: 'ID',
            sort: true,
            headerStyle: {
                outline: 'none',
                width: '10%'
            }
        }, {
            dataField: "color",
            text: "Color",
            sort: true,
            editable: true,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: "_foreign",
            text: "Foreign",
            sort: true,
            editable: true,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: "mark",
            text: "Mark",
            sort: true,
            editable: true,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: "num",
            text: "Number",
            sort: true,
            editable: true,
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
            mode: 'dbclick',
            blurToSave: true,
            autoSelectText: true,
            editable: false,
            beforeSaveCell: this.handleBeforeSaveCell,
        });

        this.selectRow = {
            mode: "radio",
            clickToSelect: true,
            clickToEdit: true,
            hideSelectColumn: true,
            style: {background: 'rgb(68,157,255)'},
            selected: [],
            onSelect: (row, isSelect, rowIndex, e) => {
                if (isSelect) {
                    this.rowObjectSelect = row;
                }
            }
        }
    }

    async componentDidMount() {
        await this.setLoadedData("cars");
    }

    async componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            await this.setLoadedData("cars");
        }
        this.rowObjectSelect = null;
    }

    async setLoadedData(whichTable) {
        try {
            const data = [];
            await loadData(whichTable).then(array => {
                array.forEach(object => {
                    data.push(object);
                });
            });

            this.setState({
                loadedData: data
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleEmptyTable() {
        return (<div>Table is Empty :(</div>);
    }

    validatorColumns(newValue, row, column) {
        if (newValue.toString().length >= 40) {
            return {
                valid: false,
                message: "Too many characters!"
            }
        }
        return true;
    }

    handleBeforeSaveCell(oldValue, newValue, row, column, done) {
        let isValidEdit = false;
        if (this.checkValidTableEdit(newValue, column.dataField)) {
            row[column.dataField] = newValue;
            updateData("cars", {
                id: row.id,
                num: row.num,
                color: row.color,
                mark: row.mark,
                is_foreign: row._foreign
            }).then();
            isValidEdit = true;
        }
        setTimeout(() => {
            done(isValidEdit);
        }, 0);
        return {async: true};
    }

    checkValidTableEdit = (newValue, dataField) => {
        switch (dataField) {
            case "color":
                return (/^[#]?[a-zA-Zа-яА-Я0-9\s]{1,40}/.test(newValue));
            case "mark":
                return (/^[a-zA-Zа-яА-Я0-9\s]{1,40}/.test(newValue));
            case "num":
                return (/^[a-zA-Z0-9-]{1,40}/.test(newValue));
            case "_foreign":
                return (/(true|false)/.test(newValue));
            default:
                return false;
        }
    }

    async handleClickDeleteButton() {
        if (this.rowObjectSelect !== null) {
            await deleteData("cars", this.rowObjectSelect.id).then()
                .catch(() => console.log("deleted"));
            await this.setLoadedData("cars");
        }
    }

    handleButtonsView = () => {
        if (localStorage.getItem("roles") !== null) {
            return (<div>
                <Button variant="primary" onClick={() => this.setState({modalShow: true})}>New Item</Button>{" "}
                <Button variant="danger" onClick={this.handleClickDeleteButton}>Delete</Button>
            </div>);
        } else {
            return "";
        }
    }

    render() {
        return (
            <div>
                <h1 className="h1 text-left">Cars</h1>
                <BootstrapTable
                    bootstrap4
                    keyField='id'
                    data={this.state.loadedData}
                    columns={this.columns}
                    noDataIndication={this.handleEmptyTable}
                    bordered={false}
                    pagination={this.state.loadedData.length <= 10 ? null : this.pagination}
                    cellEdit={this.cellEdit}
                    selectRow={this.selectRow}
                    hover
                />
                {this.handleButtonsView()}

                <NewItemModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false})}
                    whichTable="cars"
                />
            </div>
        );
    }
}

export default CarsTable;