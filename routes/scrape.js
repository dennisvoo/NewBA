const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");

router.get("/", (req, res) => {
  request(
    "https://www.basketball-reference.com/friv/mvp.html",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let mvpTeams = [];
        let teams = [];

        $(".table_outer_container tbody tr").each((i, el) => {
          teams.push(
            $(el)
              .find("td:nth-child(3)")
              .text()
          );
        });

        teams = [...new Set(teams)];
        teams.forEach(team => {
          const teamObj = { mvpTeam: team };
          mvpTeams.push(teamObj);
        });

        return res.json(mvpTeams);
      }
    }
  );
});

module.exports = router;
