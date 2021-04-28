import React from 'react'
import {View,Text,Dimensions,Keyboard,TouchableWithoutFeedback,TextInput,ScrollView,Alert,TouchableOpacity} from 'react-native'
import AwesomeButton from "react-native-really-awesome-button";

class GetStart extends React.Component{
    render(){
        return (
            <View style={{flex:.9,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{color:'#D3D3D3',fontSize:30,fontWeight:'bold'}}>Seller
                
                <Text style={{color:'#5DADE2',fontSize:30,fontWeight:'bold'}}>Lync</Text>
                </Text>
                
               
                <AwesomeButton
                        height={50}
                        style={{marginTop:80}}
                        width={Dimensions.get('window').width*2/2.8}
                        backgroundShadow={null}
                        onPress={this.login}
                        backgroundColor='#D3D3D3'
                        backgroundDarker='#D3D3D3'
                        onPress={()=>{
                            this.props.navigation.navigate('Register')
                        }}
                        >
                <Text style={{fontSize:20,color:'white',fontWeight:'bold'}} >Get Start</Text>
            </AwesomeButton>
             
             <TouchableOpacity style={{marginTop:30}} onPress={()=>{
                 this.props.navigation.navigate('Login')
             }}>
             <Text style={{fontWeight:'bold',fontSize:20,color:'#5DADE2'}}>Already Have An Account</Text>
             </TouchableOpacity>

            </View>
        )
    }
}

export default GetStart