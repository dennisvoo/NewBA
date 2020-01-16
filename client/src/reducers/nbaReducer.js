import {
  GET_GAMES,
  GET_STANDINGS,
  GET_TEAMS,
  GET_MVP_TEAMS
} from "../actions/types";

const initialState = {
  games: [],
  east: [],
  west: [],
  teams: [],
  mvpTeams: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload
      };
    case GET_STANDINGS:
      return {
        ...state,
        east: action.payload.east,
        west: action.payload.west
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload
      };
    case GET_MVP_TEAMS:
      return {
        ...state,
        mvpTeams: action.payload
      };
    default:
      return state;
  }
}
