import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { Query } from "react-apollo";
import { CategoriesQuery} from ".././query";

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Query query={CategoriesQuery}>
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
                style={styles.gridView}
                renderItem={({ item, index }) => (
                  <View style={[styles.categoryContainer]}>
                    <Image
                      style={styles.categoryImage}
                      source={{uri: 'https://xerabazar.store/assets/intro-0353ee5115e0800c4df7dd74e903695a286a93aa9b91fc42a3aa107829dfe1ff.jpg'}}
                    />
                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.categoryName}>{item.arName}</Text>
                    </View>

                  </View>
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
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#fff',
  },
    header: {
    fontSize: 12,
  },
  gridView: {
    flex: 1,
  },
  categoryContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 150,
  },
  categoryName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  categoryImage: {
    height: 150,
  }
});
