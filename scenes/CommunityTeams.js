import React from 'react';
import { Alert, Dimensions, ActivityIndicator, View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import Background from '../components/background';
import Button from "../components/Button";
import ListItem from '../components/ListItem';
import { availableFreeAgents, Team, Player, teams, resetFranchise } from '../data/script';


var {height, width} = Dimensions.get('window');

let allPlayers = [];

const URL = 'https://onpapersports.com/roster/teams/hockey/'

export default class CommunityTeams extends React.Component {
  search(value){
    this.setState({loading: true});
    fetch(URL+value).then(res => res.json()).then(json => {
        const data = [];
        for(let i=0; i<json.teams.length; i++){
            let team = new Team(json.teams[i]);

            for(let ply of json.teams[i].roster){
                let player = new Player(ply);
                player.calculateRating();
                player.teamName = team.name;
                player.teamLogoSrc = team.logoSrc;
                team.roster.push(player);
            }

            team.rosterName = json.teams[i].rosterName;
            team.rosterCreator = json.teams[i].rosterCreator;
            team.reorderLineup();
            team.calculateRating();
            data.push({
              type:'NORMAL',
              item: team
            })
          }

          data.sort((a,b) => {
              if(a.item.rating > b.item.rating){
                  return -1;
              }
              if(a.item.rating < b.item.rating){
                return 1;
            }
            return 0;
          })

          this.setState({
            list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
            order: data,
            loading: false
          })
    }).catch(err => {console.log(err)
      this.setState({loading: false});
    })
  }

  copyToRoster(team){
      teams.push(team)
      resetFranchise();
      Alert.alert(team.name + ' copied to roster');
  }

  viewRoster(tm){
    Actions.rosterlist({selectedTeam: tm, back: 'communityteams'})
  }


  constructor(props){
    super(props);
    const data = [];
    this.state={
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
      order: data,
      search: ''
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
              title={data.item.name} 
              leftAvatar={data.item.logoSrc} 
              subtitle={'Rating: ' + data.item.rating}
              rightTitleStyle={{fontSize: 12}}
              rightSubtitleStyle={{fontSize: 12}}
              rightTitle={`${data.item.rosterName}`}
              rightSubtitle={`${data.item.rosterCreator}`}
              onPress={() => {this.viewRoster(data.item)}}
              onLongPress={() => {this.copyToRoster(data.item)}}
            >
            </ListItem>
    )
  }




  render() {
    return (
      <Background>

    <Input containerStyle = {{backgroundColor:'rgba(255,255,255,0)', padding: 15}} onChangeText={value => {this.setState({search: value})}} placeholder={'Enter team name'} placeholderTextColor={'rgb(80,80,80)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro', textAlign:'center' }} ></Input>
    <Button
            title={"Search"}
            color={"#333333"}
            style={{marginVertical:10}}
            textColor={"white"}
            onPress={() => {this.search(this.state.search)}}
          ></Button>
<View style={{flexDirection:'column', backgroundColor:'rgba(0,0,0,0)', paddingVertical:5, borderBottomWidth: 0.5}}>


  <Text style={{ textAlign: "center", fontSize: 14, color: 'black', fontFamily: 'advent-pro', margin: 5 }}>{'Press and hold to add a team to your current roster'}</Text>
  <Text style={{ textAlign: "center", fontSize: 14, color: 'black', fontFamily: 'advent-pro', margin: 5 }}>{'NOTE: You can edit players info/ratings before adding them to your roster but it will NOT affect the database, if a player is not added to your current roster the changes made in this screen will be lost'}</Text>

  </View>


{
  this.state.loading ? <View style={{height: '60%', alignItems:'center', justifyContent:'center'}}>
  <ActivityIndicator size={"large"}></ActivityIndicator>
</View>:
<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>

}



      </Background>





    )
  }
}