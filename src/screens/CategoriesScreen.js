import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  Image,
  TouchableOpacity
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { Query } from "react-apollo";
import { CategoriesQuery} from ".././Query";

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'التصنيفات',
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Query query={CategoriesQuery} >
          {({ loading, error, data }) => {
            if (loading) {
                return  <ActivityIndicator size="large" color="#0000ff" />
            }
            if (error) {
              return <Text>{error}</Text>;
            }
            return(
              <FlatGrid
                itemDimension={130}
                items={data.categories}
                renderItem={({ item, index }) => (
                  <TouchableOpacity 
                   
                    onPress={() => this.props.navigation.navigate('Category', {item}
                    )}
                  >
                    <View style={{ width: "100%", height: 150, flexDirection: 'row' }}>
                      <Image
                        style={styles.categoryImage}
                        source={{ uri: item.imageUrl }}
                      />
                      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignSelf: 'flex-end' }}>
                        <Text style={styles.categoryName}>{item.arName}</Text>
                        <Text style={styles.categorySlug}>{item.slug}</Text>
                      </View>
                    </View>


                  </TouchableOpacity>
                )}
              />
            )

          }}
        </Query>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: '#fff',
  },
    header: {
    fontSize: 12,
  },
  categoryName: {
    color: 'white', 
    fontSize: 20, 
    margin: 6, 
    textAlign: 'left'
  },
  categorySlug: { 
    color: 'white', 
    margin: 6, 
    textAlign: 'left' 
  },
  categoryImage: {
    height: 150,
    width: "100%",
    position: 'absolute'
  }
});
