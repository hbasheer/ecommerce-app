import React, { Component } from 'react';
import { Container, Content, View, Left, Right, Text, Button, Icon, Item, Input } from 'native-base';
import { TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { Mutation } from "react-apollo";
import { ResetPasswordMutation } from "../../Query"

// Our custom files and classes import
import Colors from '../../constants/Colors';
//import Text from '../../components/Text';
import Navbar from '../../components/Navbar';

export default class ResetPassword extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        hasError: false,
        errors: [],
        info: ''
      };
  }
  static navigationOptions = {
    title: 'استعادة كلمة المرور',
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  reset_password = result => {
    this.setState({info: result.data.resetPassword.info })
  };

  render() {
    return(
    <Mutation mutation={ResetPasswordMutation} >
      {(ResetPassword, { loading, error }) => (
        <Container style={styles.container}>
          <Content contentContainerStyle={styles.content}>
            <View style={styles.intro}>
              <Text style={styles.title}> أهلا بك </Text>
              <Text style={styles.details}>ادخل بريدرك الالكترومي لنرسل لك تعليمات استعادة كلمة المرور </Text>
            </View>
            <Item>
                <Input placeholder='البريد الالكتروني' onChangeText={(text) => this.setState({email: text})} placeholderTextColor="#687373" />
                <Icon active name='ios-person' style={styles.icon}  />
            </Item>

            { this.state.info &&  !loading ? <Text style={{color: "#006621", textAlign: 'center', marginTop: 10}}>{this.state.info}</Text>
              :null
            }

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
                  ResetPassword({
                    variables: {
                      email: this.state.email,
                    }
                  })
                  .then(res => this.reset_password(res))
                  .catch(err => this.setState({hasError: true, errors: err.graphQLErrors}))
                }

              } style={styles.button}>
                <Icon active name='md-log-in' right />
                <Text>استعادة</Text>
              </Button>
            </View>
            <View style={styles.marginTop}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={styles.link}>حساب جديد</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
                 <Text style={styles.link}>تسجيل دخول</Text>
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
   backgroundColor: Colors.navbarBackgroundColor,
   marginTop: 20, 
   backgroundColor: '#2f95dc'
 },
 link: {
  marginBottom: 10, 
  color: '#2f95dc'
}

};