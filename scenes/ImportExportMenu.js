import React from 'react';
import { StyleSheet, ScrollView, Text, Clipboard } from 'react-native';
import { Card, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import { loadRosters, resetFranchise, resetSliders, saveData, loadData, removeTeams, exportRosterJson, getDataFromLink, loadRosterJson, importTeamJson, exportDraftClassJson, importDraftClassJson } from '../data/script';


export default class ImportExportMenu extends React.Component {

  state = {
    rosterText:'',
    loadedRosterJsonData:'',
    loadedTeamJsonData:'',
    loadedDraftClassJson : ''
  }


  writeToClipboard = async (text) => {
    await Clipboard.setString(text);
    alert('Roster Data Copied to Clipboard...');
  };

  render() {
    return (

      <Background>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

        

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {getDataFromLink(this.state.loadedRosterJsonData, 'roster'), Actions.popTo('mainmenu')}}>

<Card
  containerStyle={{
    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'black',
    alignSelf:'center'
  }}
>

<Input onChangeText={value => this.setState({ loadedRosterJsonData: value })} placeholder={'Paste Link Here'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Import Link To Raw Roster JSON File</Text>
</Card>
</TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {this.writeToClipboard(exportRosterJson()), Actions.popTo('mainmenu')}}>

            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'black',
                alignSelf:'center'
              }}
            >
            
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Export Roster JSON Data To Clipboard</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {getDataFromLink(this.state.loadedTeamJsonData, 'team'), Actions.popTo('mainmenu')}}>
<Card
  containerStyle={{
    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'black',
    alignSelf:'center'
  }}
>

<Input onChangeText={value => this.setState({ loadedTeamJsonData : value })} placeholder={'Paste Team Data Here'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Import Link To Raw Team JSON File</Text>
</Card>
</TouchableOpacity>

<TouchableOpacity style={{ width: '100%' }} onPress={() => {getDataFromLink(this.state.loadedDraftClassJson, 'draftclass'), Actions.popTo('mainmenu')}}>

<Card
  containerStyle={{
    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'black',
    alignSelf:'center'
  }}
>

<Input onChangeText={value => this.setState({ loadedDraftClassJson: value })} placeholder={'Paste Roster Data Here'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Import Link To Raw Draft Class JSON File</Text>
</Card>
</TouchableOpacity>

<TouchableOpacity style={{ width: '100%' }} onPress={() => {this.writeToClipboard(exportDraftClassJson()), Actions.popTo('mainmenu')}}>

<Card
  containerStyle={{
    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'black',
    alignSelf:'center'
  }}
>

  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Export Draft Class JSON Data To Clipboard</Text>
</Card>
</TouchableOpacity>

         
        </ScrollView>
      </Background>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
