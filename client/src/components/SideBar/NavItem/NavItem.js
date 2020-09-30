import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
// import menuItems from '../menuItems'
import './NavItem.scss';

const styles = {
  list: {
  },
  links: {
    textDecoration:'none',
    clear: 'both',
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  menuHeader: {
    paddingLeft: '0px'
  }
};

const Icon = props => {
  let icon = `c-light-blue-500m ${ props.i.icon }`;
    return props.i.icon ?  (
      <span className='icon-holder'><i className={ icon }></i></span>
    ) : null
}
;
class NavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  ;
  handleClick (item) {
    this.setState( prevState => (
    { [ item ]: !prevState[ item ]}
    ));
  }
  ;
  handler (children) {
    const
      { classes } = this.props,
      { state } = this
    ;
    return children.map( subOption => {
      if ( !subOption.children ) {
        return (
          <div key={ subOption.name }>
            <ListItem
              style={{paddingLeft: '25px'}}
              button
              key={ subOption.name }
            >
              <Icon
                i={ subOption }
              />
              <Link
                to={ subOption.url }
                className={ classes.links }
              >
                <ListItemText
                  inset
                  primary={ subOption.name }
                />
              </Link>
            </ListItem>
          </div>
        );
      }
      return (
        <div key={ subOption.name }>
          <ListItem
            style={{paddingLeft: '25px'}}
            button
            onClick={ () => this.handleClick(subOption.name)}
          >
            <Icon
              i={ subOption }
            />
            <ListItemText
              inset
              primary={ subOption.name }
            />
            { state[ subOption.name ] ?
            <ExpandLess style={{fill:'#72777a'}}/> :
            <ExpandMore style={{fill:'#72777a'}}/>
            }
          </ListItem>
          <Collapse
            in={ state[subOption.name] }
            timeout='auto'
            unmountOnExit
          >
            { this.handler (subOption.children )}
          </Collapse>
        </div>
      )
    });
  }
  ;
  render () {
    const { classes, drawerOpen, menuItems } = this.props;
    return ( <li className='nav-item mT-30 active'>
        { this.handler( menuItems ) }
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuItems: state.authentication.user.adGroup.data
  }
};

export default withStyles(styles)(connect(mapStateToProps)(NavItem));