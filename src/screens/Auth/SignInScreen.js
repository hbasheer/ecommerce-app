import React, { Component } from 'react';
import { Container, Body, Label, Content, View, Left, Right, Text, Button, Icon, Card, CardItem, Form, Item, Input } from 'native-base';
import { TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { Mutation } from "react-apollo";
import { SingInMutation } from "../../Mutation"

// Our custom files and classes import
import Colors from '../../constants/Colors';
//import Text from '../../components/Text';
import Navbar from '../../components/Navbar';

export default class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        hasError: false,
        errors: []
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

  login = result => {
    AsyncStorage.setItem("TOKEN", result.data.signin.user.token)
    this.props.navigation.navigate('HomeStack')
  };

  render() {
    return(
    <Mutation mutation={SingInMutation} >
      {(SignIn, { loading, error }) => (
        <Container style={styles.container}>
          <Content contentContainerStyle={styles.content}>
            <View style={styles.intro}>
              <Text style={styles.title}> أهلا بك </Text>
              <Text style={styles.details}>فضلا سجل دخول لكي تتمكن من المتابعة </Text>
            </View>
              <Form>
                <CardItem>
                  <Body>
                    <Item floatingLabel>
                        <Icon active name='md-mail' />
                        <Label>البريد الالكتروني</Label>
                        <Input
                          text={this.state.email}
                          onChangeText={text => {
                            this.setState({
                              email: text
                            });
                          }}
                        />
                    </Item>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <Item floatingLabel>
                        <Icon active name='ios-lock' />
                        <Label>كلمة المرور</Label>
                        <Input
                          secureTextEntry={true}
                          text={this.state.password}
                          onChangeText={text => {
                            this.setState({
                              password: text
                            });
                          }}
                        />
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
            <View style={{textAlign: 'center'}}>
              <Button block onPress={() => 
                {
                  SignIn({
                    variables: {
                      email: this.state.email,
                      password: this.state.password
                    }
                  })
                  .then(res => this.login(res))
                  .catch(err => this.setState({hasError: true, errors: err.graphQLErrors}))
                }

              } style={styles.button}>
                <Icon active name='md-log-in' right />
                <Text>سجل دخول</Text>
              </Button>
              <Button block style={{ marginTop: 20}}>
                <Icon active name='logo-facebook' />
                <Text>سجل عبر الفيسبوك</Text>
              </Button>
            </View>
            <View style={styles.marginTop}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.link}>حساب جديد</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={styles.link}>نسيت كلمة المرور ؟</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      )}
    </Mutation>
    );
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
 },
 link: {
  marginBottom: 10, 
  color: '#2f95dc'
 }

};