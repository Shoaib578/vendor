import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  
} from 'react-native';

export default class Slider extends React.Component {

    render() {
   
    return(
    
         <TouchableOpacity onPress={()=>this.props.navigation.navigate('view_category_by_user_default_location',{id:this.props.data.vendor_category_id})} style={{height:130,width:130,marginLeft:20,borderWidth:1,borderColor:'#D3D3D3',backgroundColor:'#D3D3D3',borderRadius:12,padding:22,}}>
            <View style={{flex:3}}>
           <Image source={{uri:this.props.imageUrl}} style={{flex:1,width:null,height:null,resizeMode:'cover',}}/>
            </View>

            <View style={{flex:1,paddingLeft:10,paddingTop:10}}>
              <Text style={{left:17,fontWeight:'bold'}}>{this.props.data.category}</Text>
            </View>

          </TouchableOpacity>
  
    )
}

}
