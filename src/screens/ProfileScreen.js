import React, { Component } from "react";
import { Dimensions, Image } from "react-native";
let { height } = Dimensions.get("window");
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

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: ""
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

  render() {
    let { image } = this.state;
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Content>
          <Content padder>
            <Card>
              <Form>
                <CardItem>
                  <Body>
                    <Item floatingLabel>
                      <Icon active name='md-person' />
                      <Label>Jhon Deo</Label>
                      <Input
                        text={this.state.name}
                        onChangeText={text => {
                          this.setState({
                            name: text
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
                      <Label>Jhon@TrueRuse.com</Label>
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
                      <Icon active name='md-phone-portrait' />
                      <Label>+91-9000900099</Label>
                      <Input
                        text={this.state.mobile}
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
                      <Label>**********</Label>
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
                <CardItem>
                  <Content>
                    <Button
                      block
                      onPress={() => {
                        console.log("msg -->", this.props);
                        alert(this.props.msg);
                      }}
                    >
                      <Text>Save</Text>
                    </Button>
                  </Content>
                </CardItem>
              </Form>
            </Card>
          </Content>
        </Content>
      </Container>
    );
  }
}