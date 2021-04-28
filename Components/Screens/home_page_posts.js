import React from 'react'
import {View,Text,Dimensions,Image, Alert, TouchableOpacity} from 'react-native'
import Axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import base_url from './base_url'

let category_id = ''
let searched_item_id = ''


class HomePagePosts extends React.Component {
    state = {
        dropdown_category_id:'',
        dropdown_vendors:[],
        searched_item_dropdown_id:'',
        searched_item_dropdown_vendors:[]
    }

    dropdown_vendors = async(category_id)=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
		Axios.get(base_url+'dropdown_vendors?location='+parse.user_cityname+'&&category_id='+category_id)
        .then(res=>{
            this.setState({dropdown_vendors:res.data.all_vendors})
            
        })
    
    }



    searched_item_dropdown_vendors = (category_id) => {
        Axios.get(base_url+'dropdown_vendors?location='+this.props.location+'&&category_id='+category_id)
	.then(res=>{
        console.log(res.data)
    this.setState({searched_item_dropdown_vendors:res.data.all_vendors})
									 

	})
    }
    
    render(){
        if(this.props.searched_items == false){
        return (
           
            <View style={{width:Dimensions.get('window').width*2/2.2,borderColor:'gray',borderWidth:1,borderRadius:5,marginTop:50,left:20}}>
                <View style={{flexDirection:'row',padding:20}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('view_category_by_user_default_location',{id:this.props.data.vendor_category_id})}>
                <Image source={{uri:this.props.imageUrl}} style={{width:100,height:100,}}/>
                </TouchableOpacity>

                <Text style={{marginTop:20,marginLeft:20,fontWeight:'bold'}}>{this.props.data.category}</Text>
                <View style={{marginTop:50,right:40,flexDirection:'row'}}>
                <Image source={require('../assets/images/vendor.png')} style={{width:30,height:30}}/>
                <Text style={{left:13,top:4,fontWeight:'bold'}}>{this.props.data.home_page_vendors_count} {this.props.data.home_page_vendors_count>1?'Vendors':'Vendor'}</Text>



                <Icon name="chevron-circle-down" size={25} style={{left:Dimensions.get('window').width*2/10}} onPress={()=>{
                    if(this.state.dropdown_category_id){
                        this.setState({dropdown_category_id:''})
                        category_id = ''
                    }else{
                        this.setState({dropdown_category_id:this.props.data.vendor_category_id})
                        category_id = this.props.data.vendor_category_id
                        this.dropdown_vendors(category_id)

                    }
                }}/>


          

                </View>

                
                </View>
                
                {this.state.dropdown_category_id == this.props.data.vendor_category_id?<View style={{padding:10}}>
                 {this.state.dropdown_vendors.length>0?<View>
                 {this.state.dropdown_vendors.map(item=>(
                     <View  key={item.vendor_id} style={{width:'80%',borderColor:'gray',borderWidth:1,borderRadius:5,marginTop:10,alignSelf:'center',}}>
                            <DataTable >
                        <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title numeric>Price</DataTable.Title>
                       
                        </DataTable.Header>
                         <TouchableOpacity onPress={()=>this.props.navigation.navigate('Vendor',{id:item.vendor_id})}>
                        <DataTable.Row>
                            
                        <DataTable.Cell  >{item.name}</DataTable.Cell>
                       

                       

                        <DataTable.Cell numeric>{item.price}</DataTable.Cell>
                      
                        </DataTable.Row>
                        </TouchableOpacity>
   

  
                        </DataTable>
                     </View>
                 ))}
                </View>:<Text style={{fontWeight:'bold',textAlign:'center'}}>There are no vendors to show you</Text>}
                </View>:null}
                
            </View>
            
        )
    }else{
        return(
            <View style={{width:Dimensions.get('window').width*2/2.2,borderColor:'gray',borderWidth:1,borderRadius:5,marginTop:50,left:20}}>

            <View style={{flexDirection:'row',padding:20}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('view_category_of_searched_items',{id:this.props.items.vendor_category_id,location:this.props.location})}>
                <Image source={{uri:this.props.imageUrl}} style={{width:100,height:100,}}/>
                </TouchableOpacity>

                <Text style={{marginTop:20,marginLeft:20,fontWeight:'bold'}}>{this.props.items.category}</Text>
                <View style={{marginTop:50,right:40,flexDirection:'row'}}>
                <Image source={require('../assets/images/vendor.png')} style={{width:30,height:30}}/>
                <Text style={{left:13,top:4,fontWeight:'bold'}}>{this.props.items.search_page_vendors_count} {this.props.items.search_page_vendors_count>1?'Vendors':'Vendor'}</Text>



                <Icon name="chevron-circle-down" size={25} style={{left:Dimensions.get('window').width*2/10}} onPress={()=>{
                    if(this.state.searched_item_dropdown_id){
                        this.setState({searched_item_dropdown_id:''})
                        searched_item_id = ''
                    }else{
                        this.setState({searched_item_dropdown_id:this.props.items.vendor_category_id})
                        searched_item_id = this.props.items.vendor_category_id
                        this.searched_item_dropdown_vendors(searched_item_id)

                    }
                }}/>


          

                </View>

                
                </View>

                {this.state.searched_item_dropdown_id == this.props.items.vendor_category_id?<View style={{padding:10}}>
                 {this.state.searched_item_dropdown_vendors.length>0?<View>
                 {this.state.searched_item_dropdown_vendors.map(item=>(
                     <View  key={item.vendor_id} style={{width:'80%',borderColor:'gray',borderWidth:1,borderRadius:5,marginTop:10,alignSelf:'center',}}>
                            <DataTable >
                        <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title numeric>Price</DataTable.Title>
                       
                        </DataTable.Header>
                         <TouchableOpacity onPress={()=>this.props.navigation.navigate('Vendor',{id:item.vendor_id})}>
                        <DataTable.Row>
                            
                        <DataTable.Cell  >{item.name}</DataTable.Cell>
                       

                       

                        <DataTable.Cell numeric>{item.price}</DataTable.Cell>
                      
                        </DataTable.Row>
                        </TouchableOpacity>
   

  
                        </DataTable>
                     </View>
                 ))}
                </View>:<Text style={{fontWeight:'bold',textAlign:'center'}}>There are no vendors to show you</Text>}
                </View>:null}

                </View>
        )
    }
    }
}


export default HomePagePosts