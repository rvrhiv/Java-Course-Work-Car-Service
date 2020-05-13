import React, {Component} from "react";

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
    }

    handleClickButton(event) {
        this.props.buttonMenuClick(event.target.name)
    }

    render() {
        return (
            <div>
                {menuOptions.map((option) => (
                    <button
                        key={option.name}
                        name={option.name}
                        onClick={this.handleClickButton}
                    >
                        {option.value}
                    </button>
                ))}
            </div>
        );
    }
}

export default Menu;