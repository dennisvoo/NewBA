import axios from "axios";
import { GET_GAMES, GET_STANDINGS, GET_TEAMS, GET_MVP_TEAMS } from "./types";

const getToday = async () => {
  const proxyurl = "https://cors-proxy-dv.herokuapp.com/";
  const url = "http://data.nba.net/prod/v1/today.json";
  const res = await axios.get(proxyurl + url);
  return res.data.links.currentDate;
};

export const getGames = () => dispatch => {
  const proxyurl = "https://cors-proxy-dv.herokuapp.com/";
  getToday().then(data => {
    const url = "http://data.nba.net/prod/v1/" + data + "/scoreboard.json";
    axios.get(proxyurl + url).then(res =>
      dispatch({
        type: GET_GAMES,
        payload: res.data.games
      })
    );
  });
};

export const getStandings = () => dispatch => {
  const proxyurl = "https://cors-proxy-dv.herokuapp.com/";
  const url = "http://data.nba.net/prod/v1/current/standings_conference.json";
  axios.get(proxyurl + url).then(res =>
    dispatch({
      type: GET_STANDINGS,
      payload: res.data.league.standard.conference
    })
  );
};

const compare = (a, b) => {
  if (a.abbreviation > b.abbreviation) {
    return 1;
  } else {
    return -1;
  }
};

export const getTeams = () => dispatch => {
  const proxyurl = "https://cors-proxy-dv.herokuapp.com/";
  const url = "http://data.nba.net/prod/v1/2019/team_stats_rankings.json";
  axios.get(proxyurl + url).then(res =>
    dispatch({
      type: GET_TEAMS,
      payload: res.data.league.standard.regularSeason.teams
        .slice(8, 38)
        .sort(compare)
    })
  );
};

export const getMVPTeams = () => dispatch => {
  axios.get("/scrape").then(res =>
    dispatch({
      type: GET_MVP_TEAMS,
      payload: res.data
    })
  );
};
