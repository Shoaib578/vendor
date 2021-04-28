import React, { useRef, useEffect } from 'react';
import {View,Text,Image,Animated} from 'react-native'






const Loading = (props) => {


    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver:true,
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
  
  // You can then use your `FadeInView` in place of a `View` in your components:
  export default () => {
    return (
      <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
        <Loading>
        <Text style={{color:'#D3D3D3',fontSize:40,fontWeight:'bold'}}>Seller
                
                <Text style={{color:'#5DADE2',fontSize:35,fontWeight:'bold'}}>Lync</Text>
                </Text>
        </Loading>
      </View>
    )
  }





