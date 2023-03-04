import React from 'react';
import Menu from './Menu';
import MenuButton from './MenuButton';

class MenuContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible:false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    handleMouseDown(e) {
        this.toggleMenu();

        console.log("Clicked");
        e.stopPropagation();
    }


    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }


    render() {
        return (
        <><MenuButton handleMouseDown={this.handleMouseDown} />
        <Menu handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>
        </>
        );
    }
}

export default MenuContainer;