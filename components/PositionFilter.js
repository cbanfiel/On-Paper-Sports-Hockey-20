import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CachedImage from './CachedImage';
import { POS_QB, POS_HB, POS_DT, POS_LOLB, POS_ROLB, POS_CB, POS_K, POS_P, POS_WR, POS_TE, POS_LT, POS_RT, POS_SS, POS_LE, POS_C, POS_LW, POS_RW, POS_D, POS_G } from '../data/script';

var {height, width} = Dimensions.get('window');



export default class PositionFilter extends React.Component {

    state={
        roster:this.props.roster,
    }

    setFilter(filter, filter2){
        if(filter2 == null){
            filter2 = filter;
        }

        let filteredArray = [];
        if(filter === 'all'){
            this.props.setPositionFilter(this.props.roster, this.props.team);
            return;
        }

        if(filter === 'picks'){
            this.props.setPositionFilter(this.props.draftPicks, this.props.team);
            return;
        }



            for(let i=0; i<this.props.roster.length; i++){
                let ply = this.props.roster[i];
                if(ply.position >= filter && ply.position<= filter2){
                    filteredArray.push(ply);
                }
            }

      
        
        this.props.setPositionFilter(filteredArray, this.props.team);
    }

    render() {
        return (
                <View style={{ backgroundColor: 'rgba(255,255,255,0)', height:50, width:width, flexDirection:'row', justifyContent:'center', alignItems:'center', display:'flex'}}>
                    <TouchableOpacity  onPress={() => this.setFilter('all')} style={{flex:1}}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>ALL</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => this.setFilter(POS_C)} style={{flex:1}}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>C</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter(POS_LW)}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>LW</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter(POS_RW)}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>RW</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter(POS_D)}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>D</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter(POS_G)}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>G</Text>
                        </View>
                    </TouchableOpacity>
{
    this.props.draftPicks != null?(

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('picks')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>PICKS</Text>
                        </View>
                    </TouchableOpacity>
    ): null

}

                    </View>
               
        )
    }
}

