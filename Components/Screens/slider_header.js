import React from 'react'
import {View,Text,TextInput,StyleSheet,Dimensions, ScrollView,Image, FlatList, Alert, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'
import base_url from './base_url'
import Slider from './slider'
import Axios from 'axios'

class SliderHeader extends React.Component {
  state = {
   
    all_categories:[]
  }


  get_all_categories = async()=>{
    const user = await AsyncStorage.getItem('user')
    const parse  = JSON.parse(user)
    Axios.get(base_url+'get_all_categories_for_normal_users?user_default_location='+parse.user_cityname).then(res=>{
      this.setState({all_categories:res.data.all_categories})
      
    })
    
   
  }

 componentDidMount(){
 this.get_all_categories()
  }

    render(){
        return(
            <View style={{marginTop:10}}>

        


        {/* Slider Start */}

         
    <ScrollView 
    scrollEventThrottle={16}
    >

      <View style={{flex:1,backgroundColor:'white',paddingTop:20}}>
        <Text style={{fontSize:15,fontWeight:'bold',paddingHorizontal:20}}>Explore By Category </Text>

        <View style={{height:130,marginTop:20}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          
          {this.state.all_categories.map(item=>(<Slider key={item.vendor_category_id} navigation={this.props.navigation} imageUrl={base_url+'/static/category_images/'+item.picture} data={item}/>))}
           
          
          
         
         
        </ScrollView>
        </View>

      </View>
    </ScrollView>

        {/* Slider End */}

      <Text style={{fontSize:15,fontWeight:'bold',paddingHorizontal:20,top:20}}>Quick Shop </Text>
     



            </View>
        )
    }
}





  export default SliderHeader