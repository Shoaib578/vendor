import React from 'react'
import {View,Text,Dimensions,Image,TouchableOpacity,StyleSheet,TextInput} from 'react-native'
import Axios from 'axios'
import base_url from './base_url'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SliderHeader from './slider_header'
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from "react-native-really-awesome-button";




class ViewCategoryOfSearchedItem extends React.Component {

    state = {
        all_vendors: [],
        category_info:[],
        search_box:'',
        location_box:'',
      }
     
      getVendors_and_CategoryInfo = ()=> {
      

        Axios.get(base_url+'view_searched_category?category_id='+this.props.route.params.id+'&&location='+this.props.route.params.location)
        .then(res=>{
         
          this.setState({all_vendors:res.data.all_vendors,category_info:res.data.category})
          
        })
      }

      getLocation = async()=>{
        const location_async = await AsyncStorage.getItem('location')
        
        console.log(location_async)
        this.setState({location_box:location_async})
      }

      componentDidMount(){
       
      this.getVendors_and_CategoryInfo()
      
      this.props.navigation.addListener('focus',()=>{
        this.getVendors_and_CategoryInfo()

         this.getLocation()

      })


      }

    render(){

       
        return(
            <ScrollView>

               {/* Search Boxes Header Start */}
                      <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',marginTop:20}}>


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
              onChangeText= {(val)=>this.setState({search_box:val})}
              placeholder="Item Name"
              underlineColorAndroid="transparent"
              style={{ paddingLeft:20,}}
              />
              </View>




{/* Search Boxes Header End */}


                
          

          {this.state.category_info.map(data=>(<View style={{width:Dimensions.get('window').width*2/2.2,borderColor:'gray',borderWidth:1,borderRadius:5,marginTop:50,left:20}}>
                <View style={{flexDirection:'row',padding:20}}>
                
                <Image source={{uri:base_url+'/static/category_images/'+data.picture}} style={{width:100,height:100,}}/>
                

                <Text style={{marginTop:20,marginLeft:20,fontWeight:'bold'}}>{data.category}</Text>
                <View style={{marginTop:50,right:40,flexDirection:'row'}}>
                <Image source={require('../assets/images/vendor.png')} style={{width:30,height:30}}/>
                <Text style={{left:13,top:4,fontWeight:'bold'}}>{data.vendors_count} {data.vendors_count>1?'Vendors':'Vendor'}</Text>



                


          

                </View>

                
                </View>
                </View>))}


                


                {/* Vendors */}


                {this.state.all_vendors.length>0?<View   style={{width:Dimensions.get('window').width*2/2.2,borderColor:'gray',borderWidth:1,borderRadius:5,marginTop:30,alignSelf:'center',}}>
                            <DataTable >
                        <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title numeric>Price</DataTable.Title>
                       
                        </DataTable.Header>

                         {this.state.all_vendors.map(item=>(<TouchableOpacity onPress={()=>this.props.navigation.navigate('Vendor',{id:item.vendor_id})}>
                        <DataTable.Row>
                            
                        <DataTable.Cell  >{item.name}</DataTable.Cell>
                       

                       

                        <DataTable.Cell numeric>{item.price}</DataTable.Cell>
                      
                        </DataTable.Row>
                        </TouchableOpacity>))}
   

  
                        </DataTable>
                     </View>:<Text style={{fontWeight:'bold',textAlign:'center',marginTop:50}}>There are no Vendors</Text>}
               <Text style={{marginTop:70}}> </Text>
            </ScrollView>
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

export default ViewCategoryOfSearchedItem