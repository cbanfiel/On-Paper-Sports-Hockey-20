import React from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster, returnSeasonStatsListView } from '../data/script';
import ListItem from '../components/ListItem';

export default class PlayerStatsHistory extends React.Component {

  
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
              title={"CURRENT : " + returnSeasonStatsListView(this.props.player) }
              leftAvatar={this.props.player.teamLogoSrc}
            >
            </ListItem>
        </ScrollView>
      </Background>





    )
  }
}