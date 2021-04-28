import React from 'react'
import {View,Text,TextInput,StyleSheet,Dimensions, ScrollView,Image,Alert, TouchableOpacity,ActivityIndicator} from 'react-native'
import SliderHeader from './slider_header'
import HomePagePosts from './home_page_posts'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base_url from './base_url'
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from "react-native-really-awesome-button";


let location = ''

class Home extends React.Component {
  state = {
   
    all_categories:[],
    search_box:'',
    location_box:'',
    want_to_search:false,
    searched_categories:[],
    is_loading:true,
    error:'',
    show_error_msg:false
  }


  get_all_categories = async()=>{
    const user = await AsyncStorage.getItem('user')
    const parse  = JSON.parse(user)
    Axios.get(base_url+'get_all_categories_for_normal_users?user_default_location='+parse.user_cityname).then(res=>{
      this.setState({all_categories:res.data.all_categories,is_loading:false});
      console.log('World'+res.data)
      
    })
    .catch(err=>{
      if(err){
        this.setState({error:'Something Went Wront Please Try Again',show_error_msg:true})

      }else{
        this.setState({error:'',show_error_msg:false})
      }
    })
    
   
  }

  getLocation = async()=>{
    const location_async = await AsyncStorage.getItem('location')
    
    console.log(location_async)
    this.setState({location_box:location_async})
  }

  get_categories_by_search = ()=>{
    location = this.state.location_box
   
    Axios.get(base_url+'get_all_category_by_search?location='+location+'&&item='+this.state.search_box)
    .then(res=>{
    
    this.setState({searched_categories:res.data.all_categories})
   
    })
    
  }
 

  

 componentDidMount(){
 this.get_all_categories()
 
this.props.navigation.addListener('focus', () => {
 
    
    this.getLocation()
   
  
});






 }



    render(){
       if(!this.state.is_loading){
        return (
            <View>






              <ScrollView  >

                
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
                 this.get_categories_by_search(this.state.location_box, this.state.search_box)
                 
                }else{
                  this.setState({want_to_search:false})
                  this.get_all_categories()
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
                this.get_all_categories()
              }
            
            }}
            />
            </View>




{/* Search Boxes Header End */}


              <SliderHeader navigation={this.props.navigation}/>

              

             {!this.state.want_to_search?
               this.state.all_categories.map(data=>(
                <HomePagePosts key={data.vendor_category_id} navigation={this.props.navigation} searched_items={false} imageUrl={base_url+'/static/category_images/'+data.picture} data={data}/>

               ))

             :
             this.state.searched_categories.map(item=>(
              <HomePagePosts key={item.vendor_category_id} navigation={this.props.navigation} searched_items={true} imageUrl={base_url+'/static/category_images/'+item.picture} items={item} location={location} />

             ))
             }
            


             <Text style={{marginBottom:20}}> </Text>
              </ScrollView>
            </View>
        )
      }else{
        return(
          <View style={{marginTop:50}}>
          {this.state.show_error_msg?<ActivityIndicator size="large" color="#D3D3D3" />:null}
          {this.state.error?
          
          <View style={{marginTop:30,alignSelf:'center'}}>

{this.state.show_error_msg? <Text style={{fontSize:15,fontWeight:'bold'}}>{this.state.error}</Text>:null}
{this.state.show_error_msg? 
            <TouchableOpacity style={{marginTop:20,alignSelf:'center'}} onPress={()=>{

              this.setState({show_error_msg:false});
              setTimeout(()=>{

                this.get_all_categories()
                if(this.state.show_error_msg){
                  this.setState({show_error_msg:false});
                }else{
                  this.setState({show_error_msg:true});
                }

              },600)
              
              }}>
            <Icon name='refresh' color='#D3D3D3' size={40}/>
            </TouchableOpacity>
            :null}


          </View>
          :null}
          </View>
         
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

export default Home