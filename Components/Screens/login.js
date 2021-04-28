import React from 'react'
import Axios from 'axios'
import {View,Text,Dimensions,Keyboard,TouchableWithoutFeedback,TextInput,ScrollView,Alert, TouchableOpacity} from 'react-native'
import AwesomeButton from "react-native-really-awesome-button";
import AsyncStorage from '@react-native-async-storage/async-storage'
import base_url from './base_url'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );


class Login extends React.Component {
    state = {
        email:'',
        password:'',
      
        //Errors
        email_error_state:'',
        password_error_state:'',
        
    }

     //<--------Start Validation----------->

 validate = () =>{
    let email_error = ''
  
    let password_error = ''
  
    let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email_regex.test(this.state.email) == false){
        email_error = 'Invalid Email'
    }

   
    if(this.state.password.length<8){
        password_error = 'Password Must Be at least 8 characters'
    }

   
    if(email_error  || password_error ){
        this.setState({email_error_state: email_error, password_error_state: password_error})
        return false
    }

    return true


}

//<--------End Validation----------->


//<-------Login---------->

login = async()=>{
    let is_validate = this.validate()
    if(is_validate){
     this.setState({email_error_state:'',password_error_state:''})
       let formData = new FormData()
       formData.append('email',this.state.email)
       formData.append('password',this.state.password)
       await Axios.post(base_url+'login',formData)
       .then(res=>{
           
           if(res.data.msg == 'you are successfully logged in'){
              AsyncStorage.setItem('user',JSON.stringify(res.data.user))
            this.props.navigation.reset({
                index:0,
                routes:[{name:'home'}],
               
            });
           }else{
               Alert.alert('Wrong Email or Password')
           }
       })
       .catch(err=>{
           Alert.alert('Something Went Wrong')
       })
    }
}


    render() {

        
        return (
             <DismissKeyboard>
                <ScrollView>
            <View style={{flex:1,alignItems:'center',
            alignContent:'center'}}>
             

         


           <TextInput placeholder='Email' placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:this.state.email_error_state?'red':'#D3D3D3',borderWidth:.5,marginTop:200,padding:15,color:'white',backgroundColor:this.state.email_error_state?'red':'#D3D3D3',fontSize:15,position:'relative'}} onChangeText={(val)=>this.setState({email:val})} value={this.state.email}/>

           {this.state.email_error_state?<Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.email_error_state}</Text>:null}

           <TextInput placeholder='Password' secureTextEntry  placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:this.state.phone_no_error_state?'red':'#D3D3D3',borderWidth:.5,marginTop:this.state.email_error_state?20:40,padding:15,color:'white',backgroundColor:this.state.password_error_state?'red':'#D3D3D3',fontSize:15,position:'relative'}} onChangeText={(val)=>this.setState({password:val})} value={this.state.password}/>

            {this.state.password_error_state?<Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.password_error_state}</Text>:null}

            <AwesomeButton
                        height={50}
                        style={{marginTop:30}}
                        width={Dimensions.get('window').width*2/2.8}
                        backgroundShadow={null}
                        onPress={this.login}
                        backgroundColor='#D3D3D3'
                        backgroundDarker='#D3D3D3'
                        >
                <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Login</Text>
            </AwesomeButton>

            <TouchableOpacity style={{marginTop:40}} onPress={()=>{
                this.props.navigation.navigate('Forgot Password')
            }}>
            <Text style={{fontWeight:'bold',fontSize:20,color:'#5DADE2',}}>Forgot Password</Text>
            </TouchableOpacity>

</View>
</ScrollView>
</DismissKeyboard>
        )
    }
}


export default Login