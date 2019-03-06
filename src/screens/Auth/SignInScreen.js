import React, { Component } from 'react';
import { Container, Content, View, Left, Right, Text, Button, Icon, Item, Input } from 'native-base';
import {TouchableOpacity} from 'react-native';

// Our custom files and classes import
import Colors from '../../constants/Colors';
//import Text from '../../components/Text';
import Navbar from '../../components/Navbar';

export default class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        hasError: false,
        errorText: ''
      };
  }
  static navigationOptions = {
    title: 'تسجيل دخول',
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Content contentContainerStyle={{padding: 20}}>
          <View style={{marginBottom: 35, width: '100%'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: Colors.navbarBackgroundColor}}> أهلا بك </Text>
            <Text style={{fontSize: 18, textAlign: 'center', width: '100%'}}>فضلا سجل دخول لكي تتمكن من المتابعة </Text>
          </View>
          <Item>
              <Input placeholder='البريد الالكتروني' onChangeText={(text) => this.setState({username: text})} placeholderTextColor="#687373" />
              <Icon active name='ios-person' style={{color: "#687373"}}  />
          </Item>
          <Item>
              <Input placeholder='كلمة المرور' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#687373" />
              <Icon active name='ios-lock' style={{color: "#687373"}} />
          </Item>
          {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
          <View style={{textAlign: 'center'}}>
            <Button block onPress={() => this.login()} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20, backgroundColor: '#2f95dc'}}>
              <Icon active name='md-log-in' right />
              <Text>سجل دخول</Text>
            </Button>
            <Button block onPress={() => this.login()} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20, backgroundColor: '#2f95dc'}}>
              <Icon active name='logo-facebook' />
              <Text>سجل عبر الفيسبوك</Text>
            </Button>
          </View>
          <View style={{textAlign: 'center', marginTop: 20}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={{marginBottom: 10, color: '#2f95dc'}}>حساب جديد</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeStack')}>
               <Text>نسيت كلمة المرور ؟</Text>
            </TouchableOpacity>
          </View>
        </Content>
          
      </Container>
    );
  }

  login() {
    /*
      Remove this code and replace it with your service
      Username: this.state.username
      Password: this.state.password
    */
    this.setState({hasError: true, errorText: 'Invalid username or password !'});
  }

}