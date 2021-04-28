import React from 'react'
import Axios from 'axios'
import {View,Text,Dimensions,Keyboard,TouchableWithoutFeedback,TextInput,ScrollView,Alert} from 'react-native'

import base_url from './base_url'
import AwesomeButton from "react-native-really-awesome-button";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

class ForgotPassword extends React.Component {
    state ={
        email:'',
        new_password:'',
        check_email: false,

        //error states
        email_error_state:'',
        password_error_state:''
    }


    validate_email = ()=>{
        let email_error = ''
        let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email_regex.test(this.state.email) == false){
            email_error = 'Invalid Email'
        }

        if(email_error){
            this.setState({email_error_state:email_error})
            return false
        }

        return true
    }

    validate_password = ()=>{
        let password_error = ''
 
         if(this.state.new_password.length<8){
             password_error = 'Password Must Be at least 8 characters'
         }
 
         if(password_error){
             this.setState({password_error_state:password_error})
             return false
         }
 
         return true
     }

    render() {
        return (
             <DismissKeyboard>
                <ScrollView>
            <View style={{flex:1,alignItems:'center',
            alignContent:'center'}}>
             

         

             {!this.state.check_email?
             <View>
           <TextInput placeholder='Email' placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:this.state.email_error_state?'red':'#D3D3D3',borderWidth:.5,marginTop:200,padding:15,color:'white',backgroundColor:this.state.email_error_state?'red':'#D3D3D3',fontSize:15,position:'relative'}} onChangeText={(val)=>this.setState({email:val})} value={this.state.email}/>

           {this.state.email_error_state?<Text style={{color:'red',fontSize:15,fontWeight:'bold',textAlign:'center'}}>{this.state.email_error_state}</Text>:null}
           </View>
           :
           <View>
           <TextInput placeholder='Password' secureTextEntry placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:this.state.password_error_state?'red':'#D3D3D3',borderWidth:.5,marginTop:200,padding:15,color:'white',backgroundColor:this.state.email_error_state?'red':'#D3D3D3',fontSize:15,position:'relative'}} onChangeText={(val)=>this.setState({email:val})} value={this.state.email}/>

           {this.state.password_error_state?<Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.password_error_state}</Text>:null}
           </View>
           
           
           }


           {!this.state.check_email?
           
        
           <AwesomeButton
           height={50}
           style={{marginTop:40}}
           width={Dimensions.get('window').width*2/2.8}
           backgroundShadow={null}
           onPress={()=>{
            let is_validate = this.validate_email()
            if(is_validate){
                this.setState({email_error_state:''})
                let formData = new FormData()
                formData.append('email',this.state.email)
                formData.append('check_password','false')
                formData.append('check_email','true')
 
                Axios.post(base_url+'forgot_password',formData)
                .then(res=>{
                    
                    if(res.data.msg == 'found'){
                        this.setState({check_email:true})
                    }else{
                        Alert.alert(res.data.msg)
                    }
                })
                .catch(err=>{
                 Alert.alert('Somethind Went Wrong')
             })
            }
           }}
           backgroundColor='#D3D3D3'
           backgroundDarker='#D3D3D3'
           >
           <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Check</Text>
        </AwesomeButton>
        :
        
        <AwesomeButton
        height={50}
        style={{top:50}}
        width={Dimensions.get('window').width*2/2.8}
        backgroundShadow={null}
        onPress={()=>{
            let is_validate =this.validate_password()

            if(is_validate){
              this.setState({password_error_state:''})
              let formData = new FormData()
              formData.append('email',this.state.email)
              formData.append('check_password','true')
              formData.append('check_email','false')
              formData.append('password',this.state.new_password)
  
              Axios.post(base_url+'forgot_password',formData)
                 .then(res=>{
                    Alert.alert(res.data.msg)
                    if(res.data.msg == 'Your Password Sucessfully Reset'){
                        this.props.navigation.navigate('GetStart')
                    }
                     
                 })
                 .catch(err=>{
                  Alert.alert('Something Went Wrong')
                  })
  
            }
        }}
        backgroundColor='#D3D3D3'
        backgroundDarker='#D3D3D3'
        >
        <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Reset</Text>
     </AwesomeButton>
        
        }
           </View>

           </ScrollView>
           </DismissKeyboard>
        )
    }
}


export default ForgotPassword