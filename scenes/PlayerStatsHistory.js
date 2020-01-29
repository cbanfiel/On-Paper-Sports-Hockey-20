import React from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster, returnSeasonStatsListView } from '../data/script';
import StatListItem from '../components/StatListItem';


export default class PlayerStatsHistory extends React.Component {
  shouldDisplayCurrent(){
    if(this.props.player.previousSeasonsStats.length>0){
      if(this.props.player.previousSeasonsStats[this.props.player.previousSeasonsStats.length-1].data === returnSeasonStatsListView(this.props.player)){
        return false;
      }
    }
    return true;
  }
  

  
  render() {
    return (
      <Background>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

        {this.props.player.previousSeasonsStats.map((year, i) => (
            <StatListItem 
              teamName={"YEAR #" + (i+1)}
              stats={ year.data}
              key={i}
              teamLogoSrc={year.team}
              playerInfo = {this.props.player.positionString + ' #' + this.props.player.number + ' ' + this.props.player.name}
              faceSrc={this.props.player.faceSrc}
            >
            </StatListItem>



          ))}
 {
            this.shouldDisplayCurrent()?(
          <StatListItem 
              stats={returnSeasonStatsListView(this.props.player) }
              teamName={"CURRENT"}
              teamLogoSrc={this.props.player.teamLogoSrc}
              playerInfo = {this.props.player.positionString + ' #' + this.props.player.number + ' ' + this.props.player.name}
              faceSrc={this.props.player.faceSrc}
            >
            </StatListItem>) : null

}
        </ScrollView>
      </Background>





    )
  }
}