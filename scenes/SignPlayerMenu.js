import React from 'react';
import {ScrollView, Dimensions, Text, View, Modal, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { sortedRoster, availableFreeAgents, collegeMode, displaySalary, selectedTeam, CAPROOM } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
import {Icon} from 'react-native-elements';
import PlayerCardModal from '../components/PlayerCardModal';

var {height, width} = Dimensions.get('window');



export default class SignPlayerMenu extends React.Component {

  componentWillUnmount(){
    //updates a previous scenes state
    if(this.props.updateState != null){
        this.props.updateState();
    }
}


setModalVisible(visible, player) {
  this.setState({ modalVisible: visible, modalPlayer: player });
}


    constructor(props){
        super(props);
    
        const data = [];
    
        for(let i=0; i<availableFreeAgents.roster.length; i++){
          data.push({
            type:'NORMAL',
            item: sortedRoster(availableFreeAgents,'rating')[i]
          })
        }
    
        this.state={
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
          modalPlayer: null,
          modalVisible:false
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
        return(
            <ListItem
            onPress={() => {Actions.push('offercontractmenu', {selectedPlayer: player, back:this.props.back, playerpool:availableFreeAgents, update: this.forceUpdate, forced:this.props.forced} ) }}
            title={player.positionString + ' #' + player.number + ' ' + player.name}
            leftAvatar={player.faceSrc }
            subtitle={'Rating: ' + player.rating}
            rightTitle = {collegeMode? 'Recruiting: ' + displaySalary(player.salary)  : '$' +  displaySalary(player.salary)}
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
            <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth:1 }}>
                    <CachedImage
                        style={{ resizeMode:'contain', height: 50 }}
                        uri= {selectedTeam.logoSrc }/>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20 }}>{selectedTeam.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20 }}>{'Cap Space: $' + displaySalary((selectedTeam.salary - CAPROOM) *-1)}</Text>

                </View>


<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>


      </Background>
        )
    }
}

