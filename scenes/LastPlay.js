import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { conferences } from '../data/script';
import Background from '../components/background';
import PlayerProfile from './PlayerProfile';
import ListItem from '../components/ListItem';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';

var {height, width} = Dimensions.get('window');


export default class LastPlay extends React.Component {

    constructor(props){
        super(props);
    
        const data = [];
    
        for(let i=0; i<this.props.game.possResult.length; i++){
          data.push({
            type:'NORMAL',
            item: this.props.game.possResult[i]
          })
        }
    
        this.state={
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data)
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
            title={data.item.shooter.positionString + ' #' + data.item.shooter.number + ' ' + data.item.shooter.name} 
            subtitle={data.item.result}
            leftAvatar={ data.item.shooter.faceSrc }
            rightAvatar={ data.item.shooter.teamLogoSrc}
            rightSubtitleStyle={{ fontFamily: 'advent-pro' , width:'130%' , textAlign:'right'}}
            rightTitle={data.item.homeScore + '-' + data.item.awayScore}
            rightSubtitle={'QTR: ' +  data.item.quarter + ' TIME: ' + data.item.time}
            ></ListItem>
        )
      }

    render() {
        return (
            <Background>

            <RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>

            </Background>
        )
    }
}