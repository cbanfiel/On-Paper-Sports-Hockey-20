import React from 'react';
import {ScrollView, Dimensions, Text, View, Modal, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { sortedRoster, availableFreeAgents, collegeMode, displaySalary, selectedTeam, CAPROOM, sendRecruitOffer } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
import {Icon} from 'react-native-elements';
import PlayerCardModal from '../components/PlayerCardModal';
import PositionFilter from '../components/PositionFilter';

var {height, width} = Dimensions.get('window');



export default class SignPlayerMenu extends React.Component {

  componentWillUnmount(){
    //updates a previous scenes state
    if(this.props.updateState != null){
        this.props.updateState();
    }
}

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


setModalVisible(visible, player) {
  this.setState({ modalVisible: visible, modalPlayer: player });
}

// getPositionString(position) {
//   let positionString = '';
//   if (position === 0) {
//     positionString = "QB";
//   } else if (position === 1) {
//     positionString = "RB";
//   } else if (position === 2) {
//     positionString = "FB";
//   } else if (position === 3) {
//     positionString = "WR";
//   } else if (position === 4) {
//     positionString = "TE";
//   } else if (position === 5) {
//     positionString = "LT";
//   } else if (position === 6) {
//     positionString = "LG";
//   } else if (position === 7) {
//     positionString = "C";
//   } else if (position === 8) {
//     positionString = "RG";
//   } else if (position === 9) {
//     positionString = "RT";
//   } else if (position === 10) {
//     positionString = "LE";
//   } else if (position === 11) {
//     positionString = "RE";
//   } else if (position === 12) {
//     positionString = "DT";
//   } else if (position === 13) {
//     positionString = "LOLB";
//   } else if (position === 14) {
//     positionString = "MLB";
//   } else if (position === 15) {
//     positionString = "ROLB";
//   } else if (position === 16) {
//     positionString = "CB";
//   } else if (position === 17) {
//     positionString = "FS";
//   } else if (position === 18) {
//     positionString = "SS";
//   } else if (position === 19) {
//     positionString = "K";
//   } else if (position === 20) {
//     positionString = "P";
//   }

//   return positionString;
// }

// rosterRequirements(){
//   selectedTeam.reorderLineup();
//   let arr = selectedTeam.checkRequirements();
//   let str = '';
//   for(let i=0; i<arr.length; i++){
//     if(str.length>1){
//       str+='\n';
//     }
//     str += this.getPositionString(arr[i].position) + ': ' + arr[i].amount ;
//   }

//   return str;
// }

manageOffer(ply){
  if(this.state.scholarships<1){
    return;
  }
  if(ply.signed){return;}

  sendRecruitOffer(ply, selectedTeam);
  selectedTeam.scholarshipsAvailable --;


  this.setState({scholarships: selectedTeam.scholarshipsAvailable});

  let data = [];

  if(this.state.filteredList != null){
    for(let i=0; i<this.state.filteredList.length; i++){
      data.push({
        type:'NORMAL',
        item: this.state.filteredList[i]
      })
    }
  }else{
  for(let i=0; i<selectedTeam.interestedProspects.roster.length; i++){
    data.push({
      type:'NORMAL',
      item: sortedRoster(selectedTeam.interestedProspects,'rating')[i]
    })
  }
}

  this.setState({
    list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data)
  })
}


    constructor(props){
        super(props);
    
        const data = [];
        let arrayForFilter = [];
        this.setPositionFilter = this.setPositionFilter.bind(this);
    
        if(this.props.collegeMode === true){
          arrayForFilter = selectedTeam.interestedProspects.roster;
          for(let i=0; i<selectedTeam.interestedProspects.roster.length; i++){
            data.push({
              type:'NORMAL',
              item: sortedRoster(selectedTeam.interestedProspects,'rating')[i]
            })
          }
        }else{
          arrayForFilter = availableFreeAgents.roster;
        for(let i=0; i<availableFreeAgents.roster.length; i++){
          data.push({
            type:'NORMAL',
            item: sortedRoster(availableFreeAgents,'rating')[i]
          })
        }
      }
    
        this.state={
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
          modalPlayer: null,
          modalVisible:false,
          offered: selectedTeam.offered,
          scholarships: selectedTeam.scholarshipsAvailable - selectedTeam.offered.length,
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
            let player = data.item;
            if(this.props.collegeMode === true){
              return(
                <ListItem
                onPress={() => {this.manageOffer(player)}}
                title={player.positionString + ' #' + player.number + ' ' + player.name}
                leftAvatar={player.faceSrc }
                subtitle={'Rating: ' + player.rating}
                rightAvatar={player.teamLogoSrc}
                rightTitle = {this.state.offered.includes(player) ? 'OFFERED' : ''}
                rightSubtitle = {player.signed? null : `Interest: ${player.interest}%`}
                onLongPress={() => this.setModalVisible(true, player)}
            />
            )
            }
        return(
            <ListItem
            onPress={() => {Actions.push('offercontractmenu', {selectedPlayer: player, back:this.props.back, playerpool:availableFreeAgents, update: this.forceUpdate, forced:this.props.forced} ) }}
            title={player.positionString + ' #' + player.number + ' ' + player.name}
            leftAvatar={player.faceSrc }
            subtitle={'Rating: ' + player.rating}
            rightTitle = {collegeMode? 'Recruiting: ' + displaySalary(player.salary, true)  : '$' +  displaySalary(player.salary, true)}
            onLongPress={() => this.setModalVisible(true, player)}
        />
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
            <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth:1 }}>
                    <CachedImage
                        style={{ resizeMode:'contain', height: 50 }}
                        uri= {selectedTeam.logoSrc }/>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20 }}>{selectedTeam.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20 }}>{this.props.collegeMode ? 'Scholarships Available: ' + this.state.scholarships :'Cap Space: $' + displaySalary((selectedTeam.salary - CAPROOM) *-1)}</Text>
                    {/* <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20 }}>{this.props.collegeMode ? 'Requirements: ' + this.rosterRequirements()  : null}</Text> */}


                </View>
                <PositionFilter roster={this.state.arrayForFilter} setPositionFilter={this.setPositionFilter}></PositionFilter>


<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>


      </Background>
        )
    }
}

