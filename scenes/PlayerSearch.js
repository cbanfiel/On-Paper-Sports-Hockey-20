import React from 'react';
import { ScrollView, Dimensions, View, TouchableOpacity, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster, teams, availableFreeAgents } from '../data/script';
import ListItem from '../components/ListItem';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
import { Input, Icon } from 'react-native-elements';
import PlayerCardModal from '../components/PlayerCardModal';
import PositionFilter from '../components/PositionFilter';


var {height, width} = Dimensions.get('window');

let allPlayers = [];

export default class PlayerSearch extends React.Component {

  setPositionFilter(arr){
    const data = [];
    const empty = [];

    for(let i=0; i<arr.length; i++){
      data.push({
        type:'NORMAL',
        item: arr[i]
      })
    }

    this.setState({
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
        filteredList: arr
    });
  }

//   statsView(player) {
//     let str;
//     if (this.props.season) {
//       if(player.seasonThreePointersAtt>0){
//         return "MPG: " + (Math.round(player.minutesPlayed/player.statsHistory.length*10)/10) + " PPG: " + (Math.round((player.seasonPoints / player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((((player.seasonTwoPointersMade / player.seasonTwoPointersAtt) + (player.seasonThreePointersMade/player.seasonThreePointersAtt))/2) * 100)
//          + " 3P% " + Math.floor((player.seasonThreePointersMade / player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((player.seasonFreeThrowsMade / player.seasonFreeThrowsAttempted) * 100) + ' RPG: ' + (Math.round((player.seasonRebounds / player.statsHistory.length) * 10) / 10) 
//       }else{
//         return "MPG: " + (Math.round(player.minutesPlayed/player.statsHistory.length*10)/10) + " PPG: " + (Math.round((player.seasonPoints / player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((player.seasonTwoPointersMade / player.seasonTwoPointersAtt) * 100)
//          + " 3P% " + Math.floor((player.seasonThreePointersMade / player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((player.seasonFreeThrowsMade / player.seasonFreeThrowsAttempted) * 100) + ' RPG: ' + (Math.round((player.seasonRebounds / player.statsHistory.length) * 10) / 10) 
//       }


//     }
//     else {
//       return "PTS: " + player.points + " FG% " + Math.floor((player.twoPointersMade / player.twoPointersAtt) * 100)
//          + " 3P% " + Math.floor((player.threePointersMade / player.threePointersAtt) * 100) + " FT% " + Math.floor((player.freeThrowsMade / player.freeThrowsAttempted) * 100) + ' REB: ' + player.rebounds;
//     }
//   }

setModalVisible(visible, player) {
  this.setState({ modalVisible: visible, modalPlayer: player });
}

  search(value){
    const data = [];
      let playerList = [];
    for(let i=0; i<allPlayers.length; i++){
        if(allPlayers[i].name.toUpperCase().includes(value.toUpperCase())){
            playerList.push(allPlayers[i]);
        }
    }

    for(let i=0; i<playerList.length; i++){
        data.push({
          type:'NORMAL',
          item: playerList[i]
        })
      }

      this.setState({
        list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
        order: data,
        modalPlayer: null,
        modalVisible: false
      })

  }


  constructor(props){
    super(props);

    const data = [];

    let arrayForFilter = [];
    this.setPositionFilter = this.setPositionFilter.bind(this);
    allPlayers = [];

    for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams[i].roster.length; j++) {
        allPlayers.push(teams[i].roster[j]);
    }
}

    for(let i=0; i<availableFreeAgents.roster.length; i++){
        allPlayers.push(availableFreeAgents.roster[i]);
    }

    allPlayers.sort(function(a,b){
      if (a.rating < b.rating) {
        return 1;
    }
    if (a.rating > b.rating) {
        return -1;
    }
    return 0;
    })

    
    for(let i=0; i<allPlayers.length; i++){
      arrayForFilter.push(allPlayers[i])
      data.push({
        type:'NORMAL',
        item: allPlayers[i]
      })
    }

    this.state={
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
      order: data,
      arrayForFilter : arrayForFilter
    };
  
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
              subtitle={'Rating: ' + data.item.rating}
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
                                    width: '90%',
                                    height: '75%', backgroundColor: 'rgba(255,255,255,.97)', alignSelf: 'center', borderRadius: 25
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


    <Input containerStyle = {{backgroundColor:'rgba(255,255,255,0)', padding: 15}} onChangeText={value => {this.search(value)}} placeholder={'Enter player name'} placeholderTextColor={'rgb(80,80,80)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro', textAlign:'center' }} ></Input>

    <PositionFilter roster={this.state.arrayForFilter} setPositionFilter={this.setPositionFilter}></PositionFilter>

<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>


      </Background>





    )
  }
}