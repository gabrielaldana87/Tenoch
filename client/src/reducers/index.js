import { combineReducers } from 'redux';
import authentication from './authentication';
import board from './board';
import trail from './trail';
import filter from './filter';

export default combineReducers({
  authentication,
  board,
  trail,
  filter
});