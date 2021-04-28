import React from 'react'
import {View,Text,Dimensions,Image, Alert,Linking,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import Axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataTable } from 'react-native-paper';
import SliderHeader from './slider_header'
import base_url from './base_url'
import AwesomeButton from "react-native-really-awesome-button";
import AsyncStorage from '@react-native-async-storage/async-storage'


class ViewVendor extends React.Component{


    state = {
        vendor:[],
        location_box:'',
        search_box:''
      }
    
      getLocation = async()=>{
        const location_async = await AsyncStorage.getItem('location')
        
        console.log(location_async)
        this.setState({location_box:location_async})
      }

      
      componentDidMount(){


       Axios.get(base_url+'view_vendor?vendor_id='+this.props.route.params.id)
       .then(res=>{
         this.setState({vendor:res.data.vendor})
       })

       this.props.navigation.addListener('focus',()=>{
       this.getLocation()

        Axios.get(base_url+'view_vendor?vendor_id='+this.props.route.params.id)
        .then(res=>{
          this.setState({vendor:res.data.vendor})
        })
      })


      }

    render(){
        return (
            <View>
               {/* Search Boxes Header Start */}
         <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',marginTop:10}}>


         <TouchableOpacity style={styles.LocationSearchStyle} onPress={()=>this.props.navigation.navigate('Choose City')}>
            <Icon name='map-marker' size={23} style={{left:Dimensions.get('window').width*2/61,top:5}}/>
            
            <Text style={{padding:10,left:8}}>{this.state.location_box?this.state.location_box:'Choose City'}</Text>
    

            </TouchableOpacity>


      <AwesomeButton
            height={40}
            style={{marginLeft:75}}
            width={Dimensions.get('window').width*2/11}
            backgroundShadow={null}
            onPress={()=>{
            AsyncStorage.removeItem('user')
            this.props.navigation.reset({
              index:0,
              routes:[{name:'getStart'}],
            
          });
            }}
            backgroundColor='#D3D3D3'
            backgroundDarker='#D3D3D3'
            >
    <Text style={{fontSize:15,color:'white',}}>Logout</Text>

</AwesomeButton>



</View>



    <View style={styles.ItemSearchStyle}>
    <TouchableOpacity onPress={()=>{
                 if(this.state.search_box.length>0 && this.state.location_box.length > 0){
                  this.props.navigation.navigate('search_in_another',{item_name:this.state.search_box,location:this.state.location_box})
                  
                 }else{
                  
                   Alert.alert("Please Fill the fields Properly")
                 }
                }}>
<Icon name='search' size={23} style={{left:10,top:5}}/>
</TouchableOpacity>
<TextInput
onChangeText={(val)=>this.setState({search_box:val})}
placeholder="Item Name"
underlineColorAndroid="transparent"
style={{ paddingLeft:20,}}
/>
</View>




{/* Search Boxes Header End */}
             <SliderHeader navigation={this.props.navigation}/>

             
             <View   style={{width:Dimensions.get('window').width*2/2.1,borderColor:'gray',borderWidth:1,borderRadius:5,marginTop:50,alignSelf:'center',}}>
             <DataTable style={{width:'100%'}}>
                        <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title onPress={()=>Linking.openURL(`tel:${this.state.vendor.phone_no}`)}>Phone no</DataTable.Title>
                        <DataTable.Title>Adress</DataTable.Title>
                       

                        <DataTable.Title >Price</DataTable.Title>
                       
                        </DataTable.Header>
                         
                        <DataTable.Row>
                            
                        <DataTable.Cell  >{this.state.vendor.name}</DataTable.Cell>
                    
                        <DataTable.Cell onPress={()=>Linking.openURL(`tel:${this.state.vendor.phone_no}`)}>{this.state.vendor.phone_no}</DataTable.Cell>
                        <DataTable.Cell >{this.state.vendor.city_name}</DataTable.Cell>
                        
                        <DataTable.Cell >{this.state.vendor.price}</DataTable.Cell>




                      
                        </DataTable.Row>
                        
   

  
                        </DataTable>
           </View>
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
  },


  LocationSearchStyle: {
      flexDirection: 'row',
      
      width:Dimensions.get('window').width*2/3.7,
      backgroundColor: '#D3D3D3',
      borderWidth: 0.5,
      borderColor: '#D3D3D3',
      height: 40,
      borderRadius: 5,
      margin: 10,
    },
 
});
export default ViewVendor