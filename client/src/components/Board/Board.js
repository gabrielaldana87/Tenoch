import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Search from '../Search/Search';
import List from '../List/List';
import './Board.scss';
import { fetchBoard } from '../../actions/board';

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      lists:[],
      boardTitle: null,
      boardColor: null,
      boardId: null
    };
  }
  ;
  componentDidMount () {
   this.timerID =    setInterval(() => {
    let { dispatch, path } = this.props;
    dispatch(fetchBoard(path));
      }, 60000 );
  }
  ;
  componentDidUpdate (prevProps) {
    let { path, dispatch } = this.props;
    if (prevProps.path !== this.props.path ) {
      fetch(`./data/${path}.json`)
        .then(res => res.json())
        .then(boards => this.setState( boards ))
    }
  }
  ;
  componentWillUnmount () {
    clearInterval( this.timerID );
  }
  ;
  render () {
    const
      { lists, boardTitle, boardId, boardColor, path } = this.props;
    return (
      <>
        <Search path={ path }/>
        <div className={classnames('board', boardColor)}>
          <title>{boardTitle}</title>
          <div className='lists-wrapper'>
            <div className='lists'>
               {lists.map((list, index) => (
                <List
                  facility={path.substr(1,path.length)}
                  list={list}
                  boardId={boardId}
                  index={index}
                  key={list._id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='board-underlay'></div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    lists: state.board.data.lists,
    boardTitle: state.board.data.title,
    boardColor: state.board.data.color,
    boardId: state.board.data._id
  }
};

export default withRouter(connect(mapStateToProps)(Board));