import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { communityRosters, getDataFromLink } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';

export default class CommunityRosters extends React.Component {

    componentWillUnmount(){
        if(this.props.update!=null){
          this.props.update();
        }
      }

    filterList(){

        if(this.props.filtered != null){
            let filtered = [];
            for(let i=0; i<communityRosters.length; i++){
                if(communityRosters[i].type === this.props.filtered){
                    filtered.push(communityRosters[i]);
                }
            }
            return filtered;
        }else{
            return communityRosters;
        }
    }

    state = {
        filteredList : this.filterList()
    }




    render() {
        return (
            <Background>

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth:1}}>
                    <Image
                        style={{ resizeMode:'contain', height: 50, alignSelf:'center', margin:5 }}
                        source={require('../assets/icon.png')} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20}}>{'Community Rosters'}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:14}}>{'Note: These are free rosters created by the community'}</Text>

                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    {
                        this.state.filteredList.length > 0 ?
                        
                        
                        this.state.filteredList.map((item, i) => (
                        <ListItem titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} subtitleStyle={{ fontFamily: 'advent-pro' }} containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }} 
                        onPress={() => {getDataFromLink(item.link, item.type, item.sliderType), this.props.filtered!= null? (Actions.pop()) : Actions.popTo('mainmenu')}}
                        title={item.name} 
                        rightTitleStyle={{fontFamily:'advent-pro'}}
                        rightTitle={item.type}
                        key={i} 
                        ></ListItem>
                    )): null
                    }
                </ScrollView>
            </Background>
        )
    }
}