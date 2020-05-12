import React from 'react';
import { ScrollView, Dimensions, View, TouchableOpacity, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster, teams, availableFreeAgents, franchise } from '../data/script';
import ListItem from '../components/ListItem';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
import { Input, Icon } from 'react-native-elements';
import PositionFilter from '../components/PositionFilter';


var {height, width} = Dimensions.get('window');

let allPlayers = [];

export default class OffseasonSignings extends React.Component {

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
      })

  }


  constructor(props){
    super(props);

    const data = [];

    let arrayForFilter = [];
    this.setPositionFilter = this.setPositionFilter.bind(this);
    allPlayers = [];

    franchise.offSeasonSignings.forEach(signing =>  allPlayers.push(signing.player))

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
            >
            </ListItem>
    )
  }
  render() {
    return (
      <Background>
    <Input containerStyle = {{backgroundColor:'rgba(255,255,255,0)', padding: 15}} onChangeText={value => {this.search(value)}} placeholder={'Enter player name'} placeholderTextColor={'rgb(80,80,80)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro', textAlign:'center' }} ></Input>
    <PositionFilter roster={this.state.arrayForFilter} setPositionFilter={this.setPositionFilter}></PositionFilter>
<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>
      </Background>
    )
  }
}