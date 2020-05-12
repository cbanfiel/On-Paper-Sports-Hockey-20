import React from "react";
import { ScrollView } from "react-native";
import Background from "../components/background";
import Matchup from "../components/Matchup";
import { teams } from "../data/script";

const OtherGames = ({ day }) => {

    getGames = () => {
        teams.sort(function(a, b) {
            if (a.seed > b.seed) {
                return 1;
            }
            if (a.seed < b.seed) {
                return -1;
            }
            return 0;
        })

        let games = [];
        let teamsDone = []

        for( let i=0; i<teams.length; i++){
          let team = teams[i]
          if(!teamsDone.includes(team)){
            games.push({
              team
            })
            teamsDone.push(team);
            teamsDone.push(team.schedule[day-1])
          }
        }

        return games;
    }


  return (
    <Background>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {getGames().map((game, i) => (
            <Matchup
              key={i}
              leftTeam={game.team}
              rightTeam={game.team.schedule[day-1]}
              day={day-1}
            />
        )
        )}
      </ScrollView>
    </Background>
  );
};

export default OtherGames;
