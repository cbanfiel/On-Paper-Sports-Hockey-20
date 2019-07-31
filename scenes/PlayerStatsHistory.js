import React from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster, returnStatsView } from '../data/script';
import ListItem from '../components/ListItem';

export default class PlayerStatsHistory extends React.Component {

  getStats(){
    let history=''
    if (this.props.player.seasonThreePointersAtt > 0) {
      history = "PTS: " + (Math.round((this.props.player.seasonPoints / this.props.player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((((this.props.player.seasonTwoPointersMade / this.props.player.seasonTwoPointersAtt) + (this.props.player.seasonThreePointersMade / this.props.player.seasonThreePointersAtt)) / 2) * 100)
          + " 3P% " + Math.floor((this.props.player.seasonThreePointersMade / this.props.player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((this.props.player.seasonFreeThrowsMade / this.props.player.seasonFreeThrowsAttempted) * 100) + ' REB: ' + (Math.round((this.props.player.seasonRebounds / this.props.player.statsHistory.length) * 10) / 10)
  } else {
      history = "PTS: " + (Math.round((this.props.player.seasonPoints / this.props.player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((this.props.player.seasonTwoPointersMade / this.props.player.seasonTwoPointersAtt) * 100)
          + " 3P% " + Math.floor((this.props.player.seasonThreePointersMade / this.props.player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((this.props.player.seasonFreeThrowsMade / this.props.player.seasonFreeThrowsAttempted) * 100) + ' REB: ' + (Math.round((this.props.player.seasonRebounds / this.props.player.statsHistory.length) * 10) / 10)
  }
  return history;
  }
  
  render() {
    return (
      <Background>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

          {this.props.player.previousSeasonsStats.map((year, i) => (
            <ListItem 
              title={"YEAR " + (i+1) + ": " + year.data}
              key={i}
              leftAvatar={year.team}
            >
            </ListItem>



          ))}

          <ListItem 
              title={"CURRENT : " + this.getStats() }
              leftAvatar={this.props.player.teamLogoSrc}
            >
            </ListItem>
        </ScrollView>
      </Background>





    )
  }
}