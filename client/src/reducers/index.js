import { combineReducers } from 'redux';
import authentication from './authentication';
import board from './board';
import trail from './trail';

export default combineReducers({
  authentication,
  board,
  trail
});