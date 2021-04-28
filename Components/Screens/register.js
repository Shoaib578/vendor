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


class Register extends React.Component {


    state = {
        email:'',
        password:'',
        phone_no:'',
        name:'',
       cityname:'',
        is_formsubmitted:false,
        //error states
  
        phone_no_error_state:'',
        email_error_state:'',
        password_error_state:'',
        name_error_state:'',
        cityname_error_state:''
  
        }


        validate = ()=>{
            let email_error = ''
            let password_error = ''
            let phone_no_error = ''
            let name_error = ''
            let cityname_error = ''
    
            let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let phone_number_regex = /^[+#*\(\)\[\]]*([0-9][ ext+-pw#*\(\)\[\]]*){6,45}$/

            if(email_regex.test(this.state.email) == false){
              email_error = 'Invalid Email'
             }
         
             
             if(phone_number_regex.test(this.state.phone_no) == false){
              phone_no_error ='Invalid Phone Number'
         
             }
         
             if(this.state.password.length<8){
                 password_error = 'Password Must Be at least 8 characters'
             }
    
             if(this.state.name.length<5){
              name_error ='Name Must Be at least 5 characters' 
             }
    
             if(this.state.cityname.length<4){
              cityname_error = 'Please enter Zip Code or City Name'
             }
    
    
             if(email_error || password_error || phone_no_error || name_error || cityname_error){
               this.setState({email_error_state:email_error,
                password_error_state:password_error,
                name_error_state:name_error,
                phone_no_error_state:phone_no_error,
                cityname_error_state:cityname_error,
    
    
              
              })
    
              return false
             }
    
             return true
          }

          


          register = ()=>{
            let is_validate =this.validate()
    
            if(is_validate){
              this.setState({
                email_error_state:'',
                password_error_state:'',
                name_error_state:'',
                phone_no_error_state:'',
                cityname_error_state:'',
              })
    
              let formData = new FormData()
              formData.append('email',this.state.email)
              formData.append('password',this.state.password)
              formData.append('phone_no',this.state.phone_no)
              formData.append('cityname',this.state.cityname)
              formData.append('name',this.state.name)
              Axios.post(base_url+'register',formData)
              .then(res=>{
               if(res.data.msg == 'You are Successfully Registered'){

                 this.setState({is_formsubmitted:true,email:'',password:'',name:'',phone_no:'',cityname:''})
                 Alert.alert(res.data.msg)
                 this.props.navigation.navigate('Login')
               }else{
                Alert.alert(res.data.msg)
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
             

         


           <TextInput placeholder='Name' placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:this.state.name_error_state?'red':'#D3D3D3',borderWidth:.5,marginTop:100,padding:15,color:'white',backgroundColor:this.state.name_error_state?'red':'#D3D3D3',fontSize:15,position:'relative'}} onChangeText={(val)=>this.setState({name:val})} value={this.state.name}/>

           {this.state.name_error_state?<Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.name_error_state}</Text>:null}

           <TextInput placeholder='Phone Number' keyboardType='numeric' defaultValue='+91'  placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:this.state.phone_no_error_state?'red':'#D3D3D3',borderWidth:.5,marginTop:this.state.name_error_state?20:40,padding:15,color:'white',backgroundColor:this.state.phone_no_error_state?'red':'#D3D3D3',fontSize:15,position:'relative'}} onChangeText={(val)=>this.setState({phone_no:val})} value={this.state.is_formsubmitted?this.state.phone_no:null}/>

            {this.state.phone_no_error_state?<Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.phone_no_error_state}</Text>:null}



            <TextInput placeholder='Email'    placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:this.state.email_error_state?'red':'#D3D3D3',borderWidth:.5,marginTop:this.state.password_error_state?20:40,padding:15,color:'white',backgroundColor:this.state.email_error_state?'red':'#D3D3D3',fontSize:15,position:'relative'}} onChangeText={(val)=>this.setState({email:val})} value={this.state.email}/>

            {this.state.email_error_state?<Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.email_error_state}</Text>:null}




            <TextInput placeholder='Password' secureTextEntry  placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:this.state.password_error_state?'red':'#D3D3D3',borderWidth:.5,marginTop:this.state.email_error_state?20:40,padding:15,color:'white',backgroundColor:this.state.password_error_state?'red':'#D3D3D3',fontSize:15,position:'relative'}} onChangeText={(val)=>this.setState({password:val})} value={this.state.password}/>

            {this.state.password_error_state?<Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.password_error_state}</Text>:null}



            <TextInput  placeholder='City Name'   placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:this.state.cityname_error_state?'red':'#D3D3D3',borderWidth:.5,marginTop:this.state.password_error_state?20:40,padding:15,color:'white',backgroundColor:this.state.zipcode_or_cityname_error_state?'red':'#D3D3D3',fontSize:15,position:'relative'}} onChangeText={(val)=>this.setState({cityname:val})} value={this.state.cityname}/>

            {this.state.cityname_error_state?<Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.cityname_error_state}</Text>:null}

            <AwesomeButton
                        height={50}
                        style={{top:50,marginBottom:100}}
                        width={Dimensions.get('window').width*2/2.8}
                        backgroundShadow={null}
                        onPress={this.register}
                        backgroundColor='#D3D3D3'
                        backgroundDarker='#D3D3D3'
                        >
                        <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Register</Text>
            </AwesomeButton>



            </View>
           </ScrollView>
           </DismissKeyboard>
          
            
        )
    }
}


export default Register