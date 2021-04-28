import React from 'react';
import {View,Text, ScrollView,TouchableOpacity,Dimensions,TextInput,StyleSheet} from 'react-native'
import base_url from './base_url'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AwesomeButton from "react-native-really-awesome-button";

import Icon from 'react-native-vector-icons/FontAwesome';




class ChooseCity extends React.Component{
    state = {
        cities:[],
     
    }
 

    detect_user_default_location = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)

        
        this.setLocation(parse.user_cityname)
       
    }
    
   setLocation = (location)=>{
    console.log(location)
   AsyncStorage.setItem('location',location)
   this.props.navigation.goBack(null)
   }


   
    componentDidMount(){
        Axios.get(base_url+'get_cities?want_to_search='+'false')
        .then(res=>{
            this.setState({cities:res.data.cities})
            
        })
        .catch(res=>{
            console.log('Somethig Went wrong')
        })

      
    }
    render(){
        return(
            <View >
                <ScrollView >
                
                 <TouchableOpacity style={{width:Dimensions.get('window').width*2/4,borderColor:'#D3D3D3',borderWidth:1,borderRadius:15,marginTop:10,backgroundColor:'#D3D3D3',padding:5,left:20,top:5,flexDirection:'row'}} onPress={this.detect_user_default_location}>
                <Icon name='crosshairs' size={25} style={{color:'black',left:3}}/>
                <Text style={{padding:3,left:5}}>Detect my Location</Text>
                </TouchableOpacity>   





                <View style={styles.ItemSearchStyle}>
              <TouchableOpacity >
            <Icon name='search' size={23} style={{left:Dimensions.get('window').width*2/61,top:5}}/>
            </TouchableOpacity>
            <TextInput

            placeholder="Search for City name"
            underlineColorAndroid="transparent"
            style={{ paddingLeft:20,}}

            onChangeText= {(val)=>{
               
            if(val.length>0){
                
                Axios.get(base_url+'get_cities?want_to_search='+'true'+'&&'+'search_field='+val)
                .then(res=>{
                    this.setState({cities:res.data.cities})
                    
                })

            }else{
                Axios.get(base_url+'get_cities?want_to_search='+'false')
                .then(res=>{
                    this.setState({cities:res.data.cities})
                })

                console.log('asd')
            }
            }}
           
            />
            </View>

           

                 {this.state.cities.map(data=>(
                     <TouchableOpacity key={data.city_id} style={{alignSelf:'center',width:'80%',borderColor:'#D3D3D3',borderWidth:1,borderRadius:5,marginTop:30,backgroundColor:'#D3D3D3',padding:10}} onPress={()=>{
                        this.setLocation(data.city)
                        
                         
                         }}>
                     <Text style={{left:10}}>{data.city} {'>>'} {' '}{data.province}</Text>
                     </TouchableOpacity>
                 ))}

                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    
    ItemSearchStyle: {
      flexDirection: 'row',
     
     
      backgroundColor: '#D3D3D3',
      borderWidth: 0.5,
      borderColor: '#D3D3D3',
      height: 40,
      borderRadius: 5,
      margin: 10,
      width:'90%',
      alignSelf: 'center',
      top:20
    },
  
  

   
  });


export default ChooseCity