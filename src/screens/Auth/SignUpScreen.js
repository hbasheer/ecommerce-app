import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native';
import { Container, Body, Content, View, Left, Right, Text, Button, Icon, Form, Item, Label, Input, Card, CardItem } from 'native-base';
import { Mutation } from "react-apollo";
import { SignUpMutation } from "../../Mutation"
// Our custom files and classes import
import Colors from '../../constants/Colors';
//import Text from '../../components/Text';

export default class Signup extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        fullname: '',
        password: '',
        rePassword: '',
        mobile: 0,
        address: '',
        terms: false,
        hasError: false,
        errorText: '',
        errors: []
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

  singup = result => {
    AsyncStorage.setItem("TOKEN", result.data.signup.user.token)
    this.props.navigation.navigate('HomeStack')
  };

  render() {
    return(
      <Mutation mutation={SignUpMutation} >
        {(SignUp, { loading, error }) => (
          <Container style={{backgroundColor: '#fdfdfd'}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <Content contentContainerStyle={{padding: 20}}>
                <View style={{width: '100%'}}>
                  <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: Colors.navbarBackgroundColor}}>إنشاء حساب جديد </Text>
                  <Text style={{fontSize: 18, textAlign: 'center', width: '100%', color: '#687373'}}>فضلا أنشأ حساب جديد لتتمكن من المتابعة</Text>
                </View>
                  <Form>
                    <CardItem>
                      <Body>
                        <Item floatingLabel>
                            <Label>البريد الالكتروني</Label>
                            <Input style={styles.input}
                              text={this.state.email}
                              onChangeText={text => {
                                this.setState({
                                  email: text
                                });
                              }}
                            />
                            <Icon active name='md-mail' />
                        </Item>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Item floatingLabel>
                            <Label>الاسم الكامل</Label>
                            <Input style={styles.input}
                              text={this.state.fullname}
                              onChangeText={text => {
                                this.setState({
                                  fullname: text
                                });
                              }}
                            />
                            <Icon active name='md-person' />
                        </Item>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Item floatingLabel>
                            <Label>كلمة المرور</Label>
                            <Input style={styles.input}
                              secureTextEntry={true}
                              text={this.state.password}
                              onChangeText={text => {
                                this.setState({
                                  password: text
                                });
                              }}
                            />
                            <Icon active name='md-lock' />
                        </Item>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Item floatingLabel>
                            <Label>تأكيد كلمة المرور</Label>
                            <Input style={styles.input}
                              secureTextEntry={true}
                              text={this.state.rePassword}
                              onChangeText={text => {
                                this.setState({
                                  rePassword: text
                                });
                              }}
                            />
                            <Icon active name='md-lock' />
                        </Item>
                      </Body>
                    </CardItem>
                  </Form>
                {this.state.hasError && this.state.errors &&  !loading? this.state.errors.map(({ message }, i) => (<Text key={i} style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{message}</Text>))
                  :null
                }
                { loading && 
                  <View style={styles.marginTop}>
                    <ActivityIndicator size="large" color="#0000ff"  />
                  </View>  }
                <View style={{alignItems: 'center'}}>
                  <Button block onPress={() => {
                    SignUp({
                        variables: {
                          email: this.state.email,
                          password: this.state.password,
                          passwordConfirmation: this.state.rePassword,
                          mobile: this.state.mobile,
                          address: this.state.address,
                          terms: this.state.terms,
                          fullname: this.state.fullname
                        }
                      })
                      .then(res => this.login(res))
                      .catch(err => this.setState({hasError: true, errors: err.graphQLErrors}))
                    }
                    
                  } style={styles.button}>
                    <Icon active name='md-log-in' right />
                    <Text>سجل دخول</Text>
                  </Button>
                </View>
              </Content>
            </ScrollView>
          </Container>
        )}
      </Mutation>
    );
  }

  signup_validation()  {
    if(this.state.email===""||this.state.name===""||this.state.username===""||this.state.password===""||this.state.rePassword==="") {
      this.setState({hasError: true, errorText: 'يرجى ملء الحقول'});
      return;
    }
    if(!this.verifyEmail(this.state.email)) {
      this.setState({hasError: true, errorText: 'يرجى ادخال بريد الكتروني صحيح'});
      return;
    }
    if(this.state.username.length < 4) {
      this.setState({hasError: true, errorText: 'اسم المستخدم يجب ان يكون 4 احرف على الاقل'});
      return;
    }
    if(this.state.password.length < 6) {
      this.setState({hasError: true, errorText: 'كلمة المرور يجب ان تكون 6 احرف على الاقل'});
      return;
    }
    if(this.state.password !== this.state.rePassword) {
      this.setState({hasError: true, errorText: 'كلمة المرور غير متطابقة'});
      return;
    }
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

}

const styles= {
  container: {
    backgroundColor: '#fdfdfd'
  },
  content: {
    padding: 20
  },
  intro: {
    marginBottom: 35, 
    width: '100%'
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    width: '100%', 
    color: Colors.navbarBackgroundColor
  },
  details:{
    fontSize: 18, 
    textAlign: 'center', 
    width: '100%'
  },
  icon: {
    color: "#687373"
  },
  marginTop: {
    textAlign: 'center',
    marginTop: 20
  },
  button: {
   marginTop: 20, 
   backgroundColor: '#2f95dc'
 },
 link: {
  marginBottom: 10, 
  color: '#2f95dc'
 },
 input: {
  textAlign: 'right',
 }

};