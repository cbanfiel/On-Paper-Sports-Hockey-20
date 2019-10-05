import React from 'react';
import { ScrollView, View, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { sortedRoster, draftClass, saveDraftClass, manageSaveName } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
import PositionFilter from '../components/PositionFilter';

var {height, width} = Dimensions.get('window');

export default class DraftClassMenu extends React.Component {

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
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data)
        });
      }

    state = {
        saveName : '',
        class: draftClass,
        modalVisible: false,
        modalPlayer: null
    }

    setModalVisible(visible, player) {
        this.setState({ modalVisible: visible, modalPlayer: player });
      }

    checkDraftClassName = () =>{
        if(this.state.saveName.length >1){
            saveDraftClass(manageSaveName(this.state.saveName)), Actions.pop()
        }else{
            Alert.alert('Please enter a save name', 'to save a draft class file you must enter a valid save name');
        }
    }

    update = () =>{
        this.setState({class:draftClass});
    }

    constructor(props){
        super(props);
    
        const data = [];
        let arrayForFilter = [];
        this.setPositionFilter = this.setPositionFilter.bind(this);

    
        for(let i=0; i<this.state.class.roster.length; i++){
          data.push({
            type:'NORMAL',
            item: sortedRoster(this.state.class,'rating')[i]
          })
        }
        arrayForFilter = this.state.class.roster;
    
        this.state={
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
          modalPlayer: null,
          modalVisible:false,
          arrayForFilter: arrayForFilter
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
                    title={player.positionString + ' #' + player.number + ' ' + player.name}
                     leftAvatar={player.faceSrc }
                    subtitle={'Rating: ' + player.rating}
                    onPress={() => Actions.playerprofile({selectedPlayer : player, update:this.update})}
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
                <TeamHeader selectedTeam={draftClass} ></TeamHeader>
                <View>
                <Input containerStyle = {{backgroundColor:'rgba(255,255,255,0)', padding: 15}} onChangeText={value => this.setState({ saveName: value })} placeholder={'Enter a save name'} placeholderTextColor={'rgb(80,80,80)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro', textAlign:'center' }} >{this.state.saveName}</Input>
                <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title="Save Draft Class" onPress={() => {this.checkDraftClassName()}}></Button>
                </View>

<PositionFilter roster={this.state.arrayForFilter} setPositionFilter={this.setPositionFilter}></PositionFilter>

<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>
                

            </Background>
        )
    }
}

