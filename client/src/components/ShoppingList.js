import React from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import Item from './Item';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};
  
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? "lightgreen" : "grey",

  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 1000
});
  
class ShoppingList extends React.Component {
    state = {
        items: []
    }
    componentDidMount(){
        this.props.getItems();
    }

    static getDerivedStateFromProps(props, state) {
        const newItems = props.item.items || []
        if (newItems.length !== state.items.length) {
            return {
                ...state,
                items: newItems
            }
        }
        return null;
    }

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    }

    render(){        

        const {items} = this.state;

        return(
            <Container>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                <ListGroup>
                                    <TransitionGroup className='shopping-list'>
                                        {items.map(( item, index ) => (
                                            <CSSTransition key={item._id} timeout={500} classNames='fade'>
                                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps} 
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <ListGroupItem>
                                                                <Item
                                                                    id={item._id}
                                                                    item={item.name}
                                                                />
                                                            </ListGroupItem>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            </CSSTransition>
                                        ))}
                                    </TransitionGroup>
                                </ListGroup>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Container>
        );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);