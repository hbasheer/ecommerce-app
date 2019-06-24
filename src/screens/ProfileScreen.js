import React, { Component } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import {
  Container,
  Accordion,
  View,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Right,
  Button,
  Form,
  Input,
  Icon,
  Item,
  Label,
  Content,
  Textarea
} from "native-base";
import { Mutation, Query } from "react-apollo";
import { UpdateAccountMutation } from ".././Mutation"
import { MeQuery } from ".././Query"
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      mobile: "",
      address: "",
      isFirstRender: true,
      success: false
    };
  }
  static navigationOptions = {
    title: 'الملف الشخصي',
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  _updateField = (user) => {
    if (user && this.state.isFirstRender) {
      this.setState({
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        isFirstRender: false,
        hasError: false,
        errors: []
      })
    }
  }

  updateComplete = () => {
    this.setState({
      success: true
    })
  };

  render() {
    return (
      <Query 
        fetchPolicy={"no-cache"}
        query={MeQuery} 
        onCompleted={data => this._updateField(data.me)} 
        >
        {({ loading, error, data }) => {
          if (loading) {
              return  <ActivityIndicator size="large" color="#0000ff" />
          }
          if (error) {
            return <Text>{error}</Text>;
          }
        return(
          <Mutation mutation={UpdateAccountMutation} >
            {(updateAccount, { loading, error }) => (
              <Container style={{ backgroundColor: "white" }}>
                <Content>
                  <Content padder>
                    { this.state.success && 
                      <View style={styles.successInfo}>
                        <Text style={{textAlign: 'center'}}>تم تحديث بيانات الملف الشخصي بنجاح</Text>
                      </View>  }
                    <Card>
                      <Form>
                        <CardItem>
                          <Body>
                            <Item floatingLabel>
                              <Icon active name='md-person' />
                              <Label>الاسم الكامل</Label>
                              <Input
                                value={this.state.fullname}
                                onChangeText={text => {
                                  this.setState({
                                    fullname: text
                                  });
                                }}
                              />
                            </Item>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Item floatingLabel>
                              <Icon active name='md-mail' />
                              <Label>البريد الالكتروني</Label>
                              <Input
                                value={this.state.email}
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
                              <Icon active name='md-phone-portrait' />
                              <Label>رقم الجوال</Label>
                              <Input
                                value={this.state.mobile}
                                keyboardType="number-pad"
                                onChangeText={text => {
                                  this.setState({
                                    mobile: text
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
                              <Label>العنوان</Label>
                              <Input
                                value={this.state.address}
                                onChangeText={text => {
                                  this.setState({
                                    address: text
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
                        <View style={{textAlign: 'center', marginTop: 20}}>
                          <ActivityIndicator size="large" color="#0000ff"  />
                        </View>  }
                      <CardItem>
                        <Content>
                          <Button
                            block
                            onPress={() => {
                              {
                                updateAccount({
                                  variables: {
                                    email: this.state.email,
                                    fullname: this.state.fullname,
                                    mobile: Number(this.state.mobile),
                                    address: this.state.address
                                  }
                                })
                                .then(res => this.updateComplete())
                                .catch(err => this.setState({hasError: true, errors: err.graphQLErrors, success: false}))
                              }
                            }}
                          >
                            <Text>تحديث</Text>
                          </Button>
                        </Content>
                      </CardItem>
                    </Card>
                  </Content>
                </Content>
              </Container>
            )}

          </Mutation >
        )
      }}
      </Query>
    );
  }
}


const styles= {
  successInfo: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    Color: "#155724",
    textAlign: 'center',
    marginBottom: 20,
    padding: 10,
  },

}