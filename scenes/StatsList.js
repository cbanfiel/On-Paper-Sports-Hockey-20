import React from 'react';
import { ScrollView, Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import {Icon, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster, allPlayers, returnStatsListView, returnSeasonStatsListView } from '../data/script';
import ListItem from '../components/ListItem';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
import PlayerCardModal from '../components/PlayerCardModal';
import StatFilter from '../components/StatFilter';


var {height, width} = Dimensions.get('window');

export default class StatsList extends React.Component {


  statsView(player) {
    let str;
    if (this.props.season) {
        return "GOALS: " + player.seasonGoals + " SHOTS: " + player.seasonShots + " ASSISTS: " + player.seasonAssists + " SAVE%: " + Math.round((player.seasonSaves/ (player.seasonSaves + player.seasonGoalsAllowed))*1000)/10;  
    }
    else {
      return "GOALS: " + player.goals + " SHOTS: " + player.shots + " ASSISTS: " + player.assists + " SAVE%: " + Math.round((player.saves/ (player.saves + player.goalsAllowed))*1000)/10;  
    }
  }

  setStatFilter(arr){
    const data = [];
    const empty = [];

    for(let i=0; i<arr.length; i++){
      data.push({
        type:'NORMAL',
        item: arr[i]
      })
    }

    this.setState({
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data)
    });
  }

  setModalVisible(visible, player) {
    this.setState({ modalVisible: visible, modalPlayer: player });
}


  constructor(props){
    super(props);

    const data = [];

    for(let i=0; i<this.props.selectedTeam.roster.length; i++){
      if(i>=150){
        break;
      }
      data.push({
        type:'NORMAL',
        item: sortedRoster(this.props.selectedTeam, 'ppg')[i]
      })
    }

    this.state={
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
      order: data,
      modalPlayer: null,
      modalVisible: false
    };

    this.setStatFilter = this.setStatFilter.bind(this);
  
    this.layoutProvider = new LayoutProvider((i) => {
      return this.state.list.getDataForIndex(i).type
    }, (type, dim) => {
      switch(type){
        case 'NORMAL':
          dim.width = width;
          dim.height = 70;
          break;
        default :
          dim.width=0;
          dim.height=0;
          break
      }
    })
  }

  rowRenderer = (type,data) => {
    return(
            <ListItem 
              title={data.item.positionString + ' #' + data.item.number + ' ' + data.item.name}
              leftAvatar={data.item.faceSrc}
              subtitle={this.props.season? returnSeasonStatsListView(data.item): returnStatsListView(data.item)}
              rightAvatar={data.item.teamLogoSrc}
              onPress={() => Actions.playerprofile({selectedPlayer: data.item})}
              onLongPress={() => this.setModalVisible(true, data.item)}
            >
            </ListItem>
    )
  }




  render() {
    return (
      <Background>

        
{
                    this.state.modalPlayer != null ? (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: '95%',
                                    height: '75%', backgroundColor: 'rgba(255,255,255,1)', alignSelf: 'center', 
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}
                                        style={{ alignSelf: 'flex-end', padding: 15 }}>
                                        <Icon name="close" ></Icon>
                                    </TouchableOpacity>
                                    <PlayerCardModal modalPlayer = {this.state.modalPlayer}></PlayerCardModal>
                                   </View>
                            </View>
                        </Modal>
                    ) : null
                }
<StatFilter selectedTeam={this.props.selectedTeam} setStatFilter={this.setStatFilter}></StatFilter>

<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>


      </Background>





    )
  }
}