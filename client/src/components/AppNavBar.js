import React from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Container
} from 'reactstrap';

class AppNavBar extends React.Component {
    state = {
            isOpen: false
        }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        return (
        <div>
            <Navbar color='dark' dark expand='sm' className='mb-5'>
                <Container>
                    <NavbarBrand href='/'>ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                </Container> 
            </Navbar>
        </div>
        );
        
    }
}



export default AppNavBar