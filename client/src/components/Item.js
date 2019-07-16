import React from 'react';
import {
    Button, 
    Modal, 
    ModalBody, 
    ModalFooter
} from 'reactstrap';
import { deleteItem} from '../actions/itemActions';
import {connect} from 'react-redux';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }

        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    
    render() {

        return (
            <div className='item'>
                <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={this.toggle}
                >&times;</Button>
                <span>{this.props.item}</span>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="delete-modal">
                    <ModalBody>
                        <span> Are you sure to delete?</span>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onDeleteClick.bind(this, this.props.id)}>Sure</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { deleteItem })(Item);
