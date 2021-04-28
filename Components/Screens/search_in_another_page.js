import React from 'react'
import {View,Text,TextInput,StyleSheet,Dimensions, ScrollView,Image,Alert, TouchableOpacity} from 'react-native'
import SliderHeader from './slider_header'
import HomePagePosts from './home_page_posts'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base_url from './base_url'
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from "react-native-really-awesome-button";
import { DataTable } from 'react-native-paper';

let location = ''
let category_id = ''
class Search_in_another_page extends React.Component {

    state = {
   
        all_categories:[],
        search_box:'',
        location_box:'',
        want_to_search:false,
        searched_categories:[],
        dropdown_category_id:'',
        dropdown_vendors:[]
      }

      
    get_categories = ()=>{
        location = this.props.route.params.location
        this.setState({want_to_search:false})
        Axios.get(base_url+'get_all_category_by_search?location='+location+'&&item='+this.props.route.params.item_name)
        .then(res=>{
        
        this.setState({all_categories:res.data.all_categories})
       
        })
      }



      get_searched_categories = ()=>{
        location = this.state.location_box
        this.setState({want_to_search:true})
        Axios.get(base_url+'get_all_category_by_search?location='+location+'&&item='+this.state.search_box)
        .then(res=>{
        
        this.setState({searched_categories:res.data.all_categories})
       
        })
      }

      dropdown_vendors = (category_id) => {
        Axios.get(base_url+'dropdown_vendors?location='+this.props.route.params.location+'&&category_id='+category_id)
	  .then(res=>{
        console.log(res.data)
    this.setState({dropdown_vendors:res.data.all_vendors})
									 

	})
    }


    searched_item_dropdown = (category_id)=>{
      Axios.get(base_url+'dropdown_vendors?location='+this.state.location_box+'&&category_id='+category_id)
	  .then(res=>{
        console.log(res.data)
    this.setState({dropdown_vendors:res.data.all_vendors})
									 

	})
    }


    getLocation = async()=>{
      const location_async = await AsyncStorage.getItem('location')
      
      console.log(location_async)
      this.setState({location_box:location_async})
    }

    componentDidMount(){
      this.get_categories()

      this.props.navigation.addListener('focus', () => {
 
    
        this.getLocation()
       
      
    });

    
    }

    render(){
    if(!this.state.want_to_search){
    return(
  // When Didnt click on Search Button

  <ScrollView>

       
              {/* Search Boxes Header Start */}
              <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',marginTop:20}}>


              <TouchableOpacity style={styles.LocationSearchStyle} onPress={()=>this.props.navigation.navigate('Choose City')}>
            <Icon name='map-marker' size={23} style={{left:Dimensions.get('window').width*2/61,top:5}}/>
            
            <Text style={{padding:10,left:8}}>{this.state.location_box?this.state.location_box:'Choose City'}</Text>
           

                  
                        
            



            </TouchableOpacity>

            <AwesomeButton
                  height={40}
                  style={{marginLeft:Dimensions.get('window').width*2/11}}
                  width={Dimensions.get('window').width*2/10}
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
          this.setState({want_to_search:true})
          this.get_searched_categories()
          
          }else{
            this.setState({want_to_search:false})
            this.get_categories()
            Alert.alert("Please Fill the fields Properly")
          }


          

        }}>
      <Icon name='search' size={23} style={{left:Dimensions.get('window').width*2/61,top:5}}/>
      </TouchableOpacity>
      <TextInput

      placeholder="Item Name"
      underlineColorAndroid="transparent"
      style={{ paddingLeft:20,}}
      onChangeText = {(val) =>{
        this.setState({search_box:val})

        if(this.state.want_to_search && val.length < 1){
          this.setState({want_to_search:false})
          this.get_categories()
        }

      }}
      />
      </View>




{/* Search Boxes Header End */}





    <SliderHeader navigation={this.props.navigation}/>
     {this.state.all_categories.map(data=>(
        <View style={{width:Dimensions.get('window').width*2/2.2,borderColor:'gray',borderWidth:1,borderRadius:5,marginTop:50,left:20}}>
        <View style={{flexDirection:'row',padding:20}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('view_category_of_searched_items',{id:data.vendor_category_id,location:this.props.route.params.location})}>
        <Image source={{uri:base_url+'/static/category_images/'+data.picture}} style={{width:100,height:100,}}/>
        </TouchableOpacity>

        <Text style={{marginTop:20,marginLeft:20,fontWeight:'bold'}}>{data.category}</Text>
        <View style={{marginTop:50,right:40,flexDirection:'row'}}>
        <Image source={require('../assets/images/vendor.png')} style={{width:30,height:30}}/>
        <Text style={{left:13,top:4,fontWeight:'bold'}}>{data.search_page_vendors_count} {data.search_page_vendors_count>1?'Vendors':'Vendor'}</Text>



        <Icon name="chevron-circle-down" size={25} style={{left:Dimensions.get('window').width*2/10}} onPress={()=>{
            if(this.state.dropdown_category_id){
                this.setState({dropdown_category_id:''})
                category_id = ''
            }else{
                this.setState({dropdown_category_id:data.vendor_category_id})
                category_id = data.vendor_category_id
               
                this.dropdown_vendors(category_id)
            }
        }}/>


  

        </View>

        
        </View>

        {this.state.dropdown_category_id == data.vendor_category_id?<View style={{padding:10}}>
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
        
     ))}
<Text style={{marginTop:50}}> </Text>
</ScrollView>
     )
    }else{


  // When Click on Search Button
      return(
        <ScrollView>


          {/* Search Boxes Header Start */}
<View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',marginTop:20}}>


<View style={styles.LocationSearchStyle}>
<Icon name='map-marker' size={23} style={{left:Dimensions.get('window').width*2/61,top:5}}/>
<TextInput

placeholder="Zip Code or City Name"
underlineColorAndroid="transparent"
style={{ paddingLeft:20,}}
onChangeText={(val)=>this.setState({location_box:val})}
/>


    




</View>
<AwesomeButton
    height={40}
    style={{marginLeft:Dimensions.get('window').width*2/11}}
    width={Dimensions.get('window').width*2/10}
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
this.setState({want_to_search:true})
this.get_searched_categories()

}else{
this.setState({want_to_search:false})
this.get_categories()
Alert.alert("Please Fill the fields Properly")
}




}}>
<Icon name='search' size={23} style={{left:Dimensions.get('window').width*2/61,top:5}}/>
</TouchableOpacity>
<TextInput

placeholder="Item Name"
underlineColorAndroid="transparent"
style={{ paddingLeft:20,}}
onChangeText = {(val) =>{
this.setState({search_box:val})

if(this.state.want_to_search && val.length < 1){
this.setState({want_to_search:false})
this.get_categories()
}

}}
/>
</View>




{/* Search Boxes Header End */}

        

<View>

       






<SliderHeader navigation={this.props.navigation}/>

{this.state.searched_categories.map(data=>(
        <View style={{width:Dimensions.get('window').width*2/2.2,borderColor:'gray',borderWidth:1,borderRadius:5,marginTop:50,left:20}}>
        <View style={{flexDirection:'row',padding:20}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('view_category_of_searched_items',{id:data.vendor_category_id,location:this.props.route.params.location})}>
        <Image source={{uri:base_url+'/static/category_images/'+data.picture}} style={{width:100,height:100,}}/>
        </TouchableOpacity>

        <Text style={{marginTop:20,marginLeft:20,fontWeight:'bold'}}>{data.category}</Text>
        <View style={{marginTop:50,right:40,flexDirection:'row'}}>
        <Image source={require('../assets/images/vendor.png')} style={{width:30,height:30}}/>
        <Text style={{left:13,top:4,fontWeight:'bold'}}>{data.search_page_vendors_count} {data.search_page_vendors_count>1?'Vendors':'Vendor'}</Text>



        <Icon name="chevron-circle-down" size={25} style={{left:Dimensions.get('window').width*2/10}} onPress={()=>{
            if(this.state.dropdown_category_id){
                this.setState({dropdown_category_id:''})
                category_id = ''
            }else{
                this.setState({dropdown_category_id:data.vendor_category_id})
                category_id = data.vendor_category_id
               
                this.searched_item_dropdown(category_id)
            }
        }}/>


  

        </View>

        
        </View>
      
        {this.state.dropdown_category_id == data.vendor_category_id?<View style={{padding:10}}>
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


      
        
     ))}


            </View>
            <Text style={{marginTop:50}}> </Text>
        </ScrollView>
      )
    }
   
    
    
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

export default Search_in_another_page