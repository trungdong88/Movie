import {Text} from '@rneui/themed';
import SpaceItem from 'main/Components/SpaceItem';
import {watchItems} from 'main/Config/Space/watchItems';
import {SyncedRealmContext} from 'main/Model/Realm/RealmConfig';
import Space from 'main/Model/Realm/Space';
import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = ({navigation}: any) => {
  const {useRealm, useQuery} = SyncedRealmContext;
  const realm = useRealm();
  const query: Realm.Results<Space> = useQuery('Space');
  const spaceItems: Space[] = Array.from(query);

  const eventRightAction = (id: string) => {
    try {
      for (let i = 0; i < spaceItems.length; i++) {
        if (spaceItems[i]._id === id) {
          realm.write(() => {
            realm.delete(spaceItems[i]);
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={stylesWatchList.container}>
        <View style={styles.header}>
          <View style={styles.note} />
          <Text style={styles.title}> WATCH LIST </Text>
        </View>
        <FlatList
          numColumns={2}
          key={'WatchList'}
          style={stylesWatchList.itemContainer}
          data={watchItems}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                if (item.id === 2) {
                  navigation.navigate('UpComing');
                }
                else if (item.id === 1){
                  navigation.navigate('Watched');
                }
              }}>
              <ImageBackground
                style={stylesWatchList.itemBackground}
                source={item.uriBackground}
                resizeMode="cover">
                <View style={stylesWatchList.itemIconWrap}>
                  <Image source={item.uriIcon} />
                </View>
                <Text style={stylesWatchList.itemText}> {item.title} </Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={stylesPersonalSpace.container}>
        <View style={styles.header}>
          <View style={styles.note} />
          <Text style={styles.title}> PERSONAL SPACE </Text>
        </View>
      </View>
      {spaceItems.length === 0 ? (
        <View style={stylesPersonalSpace.itemContainer}>
          <Image
            source={require('../../Assets/SpaceEmpty/img1.png')}
            style={stylesEmptySpace.image}
          />
          <Text style={stylesEmptySpace.text1}>No space</Text>
          <Text style={stylesEmptySpace.text2}>Create your own space</Text>
        </View>
      ) : (
        <SafeAreaView style={stylesPersonalSpace.itemContainer}>
          <ScrollView style={{height: '100%'}}>
            {spaceItems.map(value => (
              <SpaceItem
                navigation={navigation}
                key={value._id}
                spaceItems={value}
                eventRightAction={eventRightAction}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: '#F7BE13',
    width: 5,
    height: 32,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 15,
    color: '#fff',
  },
  container: {
    flex: 1,
  },
});

const stylesWatchList = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  itemContainer: {
    marginLeft: 3,
  },
  itemBackground: {
    width: 140,
    height: 140,
    marginLeft: 32,
  },
  itemText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 11,
    marginLeft: 11,
  },
  itemIconWrap: {
    backgroundColor: '#fff',
    height: 48,
    width: 48,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    marginLeft: 11,
  },
});

const stylesPersonalSpace = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 25,
    flex: 1,
  },
});

const stylesEmptySpace = StyleSheet.create({
  image: {
    marginTop: 30,
  },
  text1: {
    width: '100%',
    fontSize: 20,
    fontFamily: '700',
    textAlign: 'center',
    paddingTop: 8,
    color: '#fff',
  },
  text2: {
    width: '100%',
    fontSize: 16,
    fontFamily: '400',
    textAlign: 'center',
    paddingTop: 6,
    color: '#9DA0A8',
  },
});

export default Home;
