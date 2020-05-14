import React, {Component} from "react";
import Nav from "react-bootstrap/Nav";

const menuOptions = [
    {name: 'cars', value: "Cars"},
    {name: 'masters', value: "Masters"},
    {name: 'services', value: "Services"},
    {name: 'works', value: "Works"}
]

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.state = {
            activeButton : this.props.activeButton
        }
    }

    handleClickItem(selectedKey) {
        this.props.buttonMenuClick(selectedKey)
        this.setState({
            activeButton : selectedKey
        })
    }

    render() {
        return (
            <div>
                <Nav
                    fill
                    justify
                    variant="pills"
                    className="flex-column"
                    defaultActiveKey={this.state.activeButton}
                    activeKey={this.state.activeButton}
                    onSelect={this.handleClickItem}
                >
                    {menuOptions.map((option) => (
                        <Nav.Item>
                            <Nav.Link eventKey={option.name}>{option.value}</Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
        );
    }
}

export default Menu;