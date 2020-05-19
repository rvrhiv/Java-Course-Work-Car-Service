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

class WorksTable extends Component {
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
            modalShow: false,
            isAdmin: localStorage.getItem("roles") === "ROLE_ADMIN"
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
            dataField: "date_work",
            text: "Date of work",
            sort: true,
            editable: this.state.isAdmin,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: "master",
            text: "Master",
            sort: true,
            editable: this.state.isAdmin,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: "service",
            text: "Service",
            sort: true,
            editable: this.state.isAdmin,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: "car",
            text: "Car",
            sort: true,
            editable: this.state.isAdmin,
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
            //onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
            beforeSaveCell: this.handleBeforeSaveCell,
            //afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
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
        await this.setLoadedData("works");
    }

    async componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            await this.setLoadedData("works");
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
            //меняем поля-объекты на определенные поля этих объектов
            const workData = [];
            data.map(item => (
                workData.push({
                    id: item.id,
                    date_work: item.date_work,
                    car: item.car.num,
                    master: item.master.name,
                    service: item.service.name
                })
            ));
            this.setState({
                loadedData: workData
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
        let isValidEdit = true;
        // if (this.checkValidTableEdit(newValue, column.dataField)) {
        //     row[column.dataField] = newValue;
        //     updateData(this.props.whichTable, {
        //         id: row.id,
        //         name: row.name,
        //         cost_our: row.cost_our,
        //         cost_foreign: row.cost_foreign
        //     });
        //     isValidEdit = true;
        // }
        setTimeout(() => {
            done(isValidEdit);
        }, 0);
        return {async: true};
    }

    // checkValidTableEdit = (newValue, dataField) => {
    //     switch (dataField) {
    //         case "name":
    //             return (/^[a-zA-Zа-яА-Я0-9\s]{1,40}/.test(newValue));
    //         case "cost_foreign":
    //             return (/^[0-9]{1,10}/.test(newValue));
    //         case "cost_our":
    //             return (/^[0-9]{1,10}/.test(newValue));
    //         default:
    //             return false;
    //     }
    // }

    async handleClickDeleteButton() {
        if (this.rowObjectSelect !== null) {
            await deleteData("works", this.rowObjectSelect.id).then()
                .catch(() => console.log("deleted"));
            await this.setLoadedData("works");
        }
    }

    handleButtonsView = () => {
        switch (localStorage.getItem("roles")) {
            case "ROLE_USER":
                return (
                    <Button variant="primary" onClick={() => this.setState({modalShow: true})}>New Item</Button>
                );
            case "ROLE_ADMIN":
                return (<div>
                    <Button variant="primary" onClick={() => this.setState({modalShow: true})}>New Item</Button>{" "}
                    <Button variant="danger" onClick={this.handleClickDeleteButton}>Delete</Button>
                </div>);
            default:
                return "";
        }
    }

    render() {
        return (
            <div>
                <h1 className="h1 text-left">Works</h1>
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
                    whichTable="works"
                />
            </div>
        );
    }
}

export default WorksTable;