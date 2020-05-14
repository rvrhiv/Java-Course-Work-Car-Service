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
        this.handleClickButton = this.handleClickButton.bind(this);
        this.state = {
            activeButton : "cars"
        }
    }

    handleClickButton(event) {
        console.log(event)
        let name = event.target.name;
        this.props.buttonMenuClick(name)
        this.setState({
            activeButton : name
        })
    }

    render() {
        return (
            <div>
                <Nav
                    variant="pills"
                    defaultActiveKey={"/" + this.state.activeButton}
                    activeKey={"/" + this.state.activeButton}
                    onSelect={(selectedKey) => console.log(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="cars">Cars</Nav.Link>
                    </Nav.Item>
                    {/*{menuOptions.map((option) => (*/}
                    {/*    <NavItem key={option.name} name={option.name}>{option.value}</NavItem>*/}
                    {/*))}*/}
                </Nav>
            </div>
        );
    }
}

export default Menu;