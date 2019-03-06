import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Content, View, Left, Right, Text, Button, Icon, Item, Input } from 'native-base';

// Our custom files and classes import
import Colors from '../../constants/Colors';
//import Text from '../../components/Text';

export default class Signup extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        name: '',
        username: '',
        password: '',
        rePassword: '',
        hasError: false,
        errorText: ''
      };
  }
  static navigationOptions = {
    title: 'حساب جديد',
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
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Content contentContainerStyle={{padding: 20}}>
            <View style={{marginBottom: 35, width: '100%'}}>
              <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: Colors.navbarBackgroundColor}}>إنشاء حساب جديد </Text>
              <Text style={{fontSize: 18, textAlign: 'center', width: '100%', color: '#687373'}}>فضلا أنشأ حساب جديد لتتمكن من المتابعة</Text>
            </View>
            <Item>
                <Input placeholder='البريد الالكتروني' onChangeText={(text) => this.setState({email: text})} keyboardType="email-address" placeholderTextColor="#687373" />
                <Icon active name='md-mail' style={{color: '#687373'}} />
            </Item>
            <Item>
                <Input placeholder='الاسم الكامل' onChangeText={(text) => this.setState({name: text})} placeholderTextColor="#687373" />
                <Icon active name='md-person' style={{color: '#687373'}} />
            </Item>
            <Item>
                <Input placeholder='رقم الجوال' onChangeText={(text) => this.setState({username: text})} placeholderTextColor="#687373" />
                <Icon active name='md-phone-portrait' style={{color: '#687373'}} />
            </Item>
            <Item>
                <Input placeholder='كلمة المرور' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#687373" />
                <Icon active name='md-lock' style={{color: '#687373'}} />
            </Item>
            <Item>
                <Input placeholder='تأكيد كلمة المرور' onChangeText={(text) => this.setState({rePassword: text})} secureTextEntry={true} placeholderTextColor="#687373" />
                <Icon active name='md-lock' style={{color: '#687373'}} />
            </Item>
            {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
            <View style={{alignItems: 'center'}}>
              <Button block onPress={() => this.signup()} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20, backgroundColor: '#2f95dc'}}>
                <Icon active name='md-log-in' right />
                <Text>سجل دخول</Text>
              </Button>
              <Button block onPress={() => this.signup()} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20, backgroundColor: '#2f95dc'}}>
                <Icon active name='logo-facebook' />
                <Text>سجل عبر الفيسبوك</Text>
              </Button>
            </View>
          </Content>
        </ScrollView>
      </Container>
    );
  }

  signup() {
    if(this.state.email===""||this.state.name===""||this.state.username===""||this.state.password===""||this.state.rePassword==="") {
      this.setState({hasError: true, errorText: 'Please fill all fields !'});
      return;
    }
    if(!this.verifyEmail(this.state.email)) {
      this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
      return;
    }
    if(this.state.username.length < 3) {
      this.setState({hasError: true, errorText: 'Passwords must contains at least 3 characters !'});
      return;
    }
    if(this.state.password.length < 6) {
      this.setState({hasError: true, errorText: 'Passwords must contains at least 6 characters !'});
      return;
    }
    if(this.state.password !== this.state.rePassword) {
      this.setState({hasError: true, errorText: 'Passwords does not match !'});
      return;
    }
    this.setState({hasError: false});
    Actions.home();
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }


}