import React from 'react'
import Axios from 'axios'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import {View,Image,Text,TouchableOpacity,TextInput,Keyboard} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './home'
import Login from './login'
import Register from './register'
import ForgotPassword from './forgot_password'
import GetStart from './getStart'
import ViewVendor from './view_vendor'
import ViewCategoryByUserDefaultLocation from './view_category_by_user_default_location'
import Loading from './Loading'
import ViewCategoryofSearchedItems from './view_category_of_searched_item'
import Search_in_another_page from './search_in_another_page'
import ChooseCity from './choose_city'
const HomeStack = createStackNavigator()
const AuthStack = createStackNavigator()






class Routes extends React.Component{
    state = {
        is_logged_in: false,
        is_loading:true
    }


    CheckUserLoggedIn = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
       
        if(parse == null){
            this.setState({is_logged_in:false})
        }else{
            this.setState({is_logged_in:true,})
        }
      }


      componentDidMount(){
        setTimeout(()=>{
            this.setState({is_loading:false})
        },1200)
        this.CheckUserLoggedIn()

         
      }


    AuthStackScreens= ()=>(
        <AuthStack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
            <AuthStack.Screen name='GetStart' component={GetStart} options={{headerShown:false}}/>

            <AuthStack.Screen name='Login' component={Login}  options={{headerTransparent:true,headerTintColor:'#D3D3D3'}}/>
            <AuthStack.Screen name='Register'  component={Register} options={{headerTransparent:true,headerTintColor:'#D3D3D3'}}/>
            <AuthStack.Screen name='Forgot Password'  component={ForgotPassword} options={{headerTransparent:true,headerTintColor:'#D3D3D3'}}/>
            
            <HomeStack.Screen name='home' component={this.HomeStackScreen} options={{headerShown:false}}/>
            
        </AuthStack.Navigator>
    )
     
    HomeStackScreen = ()=>(
        <HomeStack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}>
            <HomeStack.Screen name='Home' component={Home}/>
            <HomeStack.Screen name='Vendor' component={ViewVendor}/>
            <HomeStack.Screen name='view_category_by_user_default_location' component={ViewCategoryByUserDefaultLocation} options={{headerTitle: 'Category'}}/>
            <HomeStack.Screen name='view_category_of_searched_items' component={ViewCategoryofSearchedItems} options={{headerTitle: 'Category'}}/>
            <HomeStack.Screen name='Choose City' component={ChooseCity}/>
            
            <HomeStack.Screen name='search_in_another' component={Search_in_another_page} options={{headerTitle: 'Search'}}/>


            <AuthStack.Screen name='getStart' component={this.AuthStackScreens} options={{headerShown:false}}/>

           
            

        </HomeStack.Navigator>
    )


    render() {
        if(!this.state.is_loading){

        return (
            <NavigationContainer >
             {this.state.is_logged_in?
              <HomeStack.Navigator  >
              <HomeStack.Screen name='LoggedInScreens' component={this.HomeStackScreen} options={{headerShown:false}}/>
            </HomeStack.Navigator>

          :
        <AuthStack.Navigator  >
            <AuthStack.Screen name='UnAuth' component={this.AuthStackScreens} options={{headerShown:false}}/>
           
            
        </AuthStack.Navigator>
            
            }
            </NavigationContainer>
        )
    }else{
        return <Loading />
    }

    }
}

export default Routes