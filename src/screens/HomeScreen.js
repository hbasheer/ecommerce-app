import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";


import { MonoText } from '../components/StyledText';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "الرئيسية",
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>العرض #1</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                 تفاصيل العرض تكون موجودة هنا
                </Text> 
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>10000 IQD</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>العرض #2</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                 تفاصيل العرض تكون موجودة هنا
                </Text> 
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>25000 IQD</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
