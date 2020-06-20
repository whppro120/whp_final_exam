/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { View, Text, Button, Modal, ViewPagerAndroid, Slider ,Animated,StyleSheet,Image, ImageBackground,Easing,FlatList} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ViewPager from '@react-native-community/viewpager';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { withSafeAreaInsets } from 'react-native-safe-area-context';



const music = ["A-Lin - 有一种悲伤.mp3","	胡彦斌 _ Jony J - 返老还童.mp3","汪苏泷 - 不服 (Live).mp3","	孙燕姿 - 开始懂了 (Live).mp3","	冰块先生 - 11862.mp3"]
const url = "http://123.56.28.23/music/"
const bcki_url = "http://123.56.28.23/photo/2.jpg"
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
var p = 0
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:true,
    };
  }



  hide = ()=>{
    this.setState({visible:false})
  }

  render() {
    const { user, pwd, fadeAnim} = this.state;
    return (
      
      <NavigationContainer >
        <Modal visible={this.state.visible}>
          <ViewPager style={{flex:1}} initialPage={0}>
            <View key="1">
            <ImageBackground style={{flex:1}}
              source={{uri: 'http://123.56.28.23/photo/10.jpg'}}>
         
         
            </ImageBackground>
            </View>
            <View key="2">
            <ImageBackground style={{flex:1}}
              source={{uri: 'http://123.56.28.23/photo/11.jpg'}}>
              
         
            </ImageBackground>
            <Text style={{backgroundColor:'black',color:'white',textAlign:'center',fontSize:25}} onPress={this.hide}>退出</Text>
            </View>
          </ViewPager>
        </Modal>
        <Drawer.Navigator>
          <Drawer.Screen name = "主页" component = {Main}></Drawer.Screen>
          <Drawer.Screen name = "成员" component = {Setting}></Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

class Main extends React.Component{
  render(){
    return<Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'List') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        } else if (route.name === 'FAQ'){
          iconName = focused ? 'ios-heart-dislike':'ios-heart-empty'
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="List" component={List}/>
      <Tab.Screen name="FAQ" component={FAQ}/>
    </Tab.Navigator>

  }
}

class Setting extends React.Component{
  render(){
     return(
      <View>
        <Text style={{fontSize:40,textAlign:'center',marginTop:50}}>
       
       四大天王
       </Text>
        <View><Image style={{marginTop:30, width:400,height:250}} source={{uri:'http://123.56.28.23/photo/7.jpg'}}/></View>
        <Text style={{fontSize:20,marginTop:15}}>
       
        崔云瑞          王小阳          马丹阳          王浩鹏
        </Text>
  
      </View>
      

     )  
   
  }
}
class Home extends React.Component{
  render(){
     return(
        <ImageBackground style={{flex:1}}
        source={{uri: 'http://123.56.28.23/photo/6.jpg'}}>
         
         <MusicPage></MusicPage>
        </ImageBackground>
          
      

     )  
   
  }

  
}

class List extends React.Component{
  render(){
     return(
      
      <Flat></Flat>

     )  
   
  }
}
class FAQ extends React.Component{
  render(){
     return(
      <ImageBackground style={{flex:1,width:400,height:700}}
        source={{uri: 'http://123.56.28.23/photo/9.jpg'}}>
        <Text style={{fontSize:30,textAlign:'center',marginTop:50}}>要什么FAQ用就完事了</Text> 
         
     </ImageBackground>

     )  
   
  }
}


class MusicPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
 
      paused:true,
      source:{uri:url+music[p]},
      w_time:0,
      current_time:0,
      player:null,
      bounceValue: new Animated.Value(1), 
      rotateValue: new Animated.Value(0),

    }
  }

  componentDidMount(){
    this.startAnimation()
  }

  playCtrl =()=>{
    let paused = this.state.paused
    this.setState({
      paused:!paused
    })
    
  }


  next =()=>{

    p<4 ? p++:p=0;
    this.setState({
      source:{uri:url+music[p]}
    })
  }

  prev =()=>{

    p>0 ? p--:p=0;
    this.setState({
      source:{uri:url+music[p]}
    })
    
  }

  loadHandler =({duration}) => {
    this.setState({w_time:duration})
 
  }

  progressHandler =({currentTime})=>{
    this.setState({current_time:currentTime})
  }

  seekHandler =(value)=>{
    this.player.seek(value)
  }

  endHandler =()=>{
    p<4 ? p++:p=0;
    this.setState({
      source:{uri:url+music[p]}
    })
  }

  startAnimation() {
    this.state.bounceValue.setValue(1);

    this.state.rotateValue.setValue(0);
    Animated.parallel([
        
        Animated.spring(this.state.bounceValue, {
            toValue: 1,      
            friction: 20,    
        }),
        Animated.timing(this.state.rotateValue, {
            toValue: 1,  
            duration: 15000,  
            easing: Easing.out(Easing.linear),
        }),
        
    ]).start(()=>this.startAnimation());
}

  render(){
    return(
      
      
     
      <View style={{ flex:1, justifyContent:'flex-end'}}>
        <View style={styles.container}>
             
             <Animated.Image source={{uri:'http://123.56.28.23/photo/4.jpg'}}
                             style={{width:200,
                             height: 200,borderRadius:100, 
                             transform: [
                             
                             {scale: this.state.bounceValue},
                             

                             {rotateZ: this.state.rotateValue.interpolate({
                             inputRange: [0,1],
                             outputRange: ['0deg', '360deg'],
                             })},
                  ]}}>
             </Animated.Image>

     </View>
        <Video 
        ref={ref=>this.player=ref}
        source={this.state.source} paused={this.state.paused}
        onLoad={this.loadHandler}
        onProgress={this.progressHandler}
        progressUpdateInterval={2000}
        onEnd={this.endHandler}
        />
        
        <Text style={{textAlign:'center',marginBottom:20}}>{music[p]}</Text>
        <Slider style={{height:20}} minimumValue={0} maximumValue={this.state.w_time} value={this.state.current_time}
        onSlidingComplete={this.seekHandler}
        />


        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <FontAwesome name="step-backward" style={{marginLeft:10,} } size={40}  onPress={this.prev}/>
        <FontAwesome name="play" style={{marginLeft:10,} } size={40} onPress={this.playCtrl}/>
        <FontAwesome name="step-forward" style={{marginRight:10,} } size={40}  onPress={this.next}/>
        </View>
        
      </View>
    )

  }
}


class Flat extends Component {

  constructor(props){
      super(props)
      this.url="http://123.56.28.23:8080/singe/findAll"
      this.max=4
      this.state={data:[],albums:[]}
  }

  componentDidMount(){
      fetch(this.url,{method:"GET"})
      .then(resp=>resp.json())
      .then(albums=>{
          console.log(albums)
          this.setState({albums:albums})
      })
  }

  _del=id=>{
      
      fetch(this.url+"/"+id,{method:"DELETE"})
      .then(resp=>resp.json())
      .then(obj=>{
          let data=this.state.albums.splice(0)
          let index=data.findIndex(album=>album.id===id)
          console.log(index,id)
          data.splice(index,1)
          this.setState({albums:data})
      })

     
  }

  _renderItem=({item})=>{
      return (
          <View style={{height:155,justifyContent:"space-between",flexWrap:"wrap",flexDirection:'row',alignItems:"center",marginTop:5}} >
              <View><Image style={{width:150,height:150}} source={{uri:item.img}}/></View>
              <View style={{height:10}}><Text>{item.name}</Text></View>
              <View><Button style={{width:50,height:50,textAlign:"center",textAlignVertical:'center'}} onPress={()=>this._del(item.id)} title="删除"/></View>
              
          </View>
      )
  }
  _ItemSeparatorComponent=()=>{
      return <View style={{height:1,backgroundColor:"red"}}></View>
  }

  _refresh=()=>{
      let d=Math.floor(Math.random()*100+100)
      let data=this.state.data.splice(0)
      data.unshift(d)
      this.setState({data:data})
  }
  _reachEnd=()=>{
      let data=this.state.data.splice(0)
      data.push(++this.max)
      this.setState({data:data})
  }
  


  render() {
      return (
          <View>
              <FlatList
                  ListEmptyComponent={<Text>数据是空的</Text>}
                  keyExtractor={({item,index})=>index}
                  ItemSeparatorComponent={this._ItemSeparatorComponent}
                  data={this.state.albums} 
                  renderItem={this._renderItem}
                  
              />
          </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
  }
});

