import React, { } from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { Text } from '@rneui/themed';
import MoviedDay from './MovieDay';
import { SyncedRealmContext } from 'main/Model/Realm/RealmConfig';

const Watched = (props) => {
const { useQuery,useRealm } = SyncedRealmContext;
const realm = useRealm();
//sort date decrease
const query:any = useQuery('LineItem').filtered("watchedAt != nil ").sorted([["watchedAt", true]]);

//the same viewed date
const mergedData = query.reduce((acc, obj) => {
const foundObj = acc.find(item => {
    return JSON.stringify(item.children[0].watchedAt) === JSON.stringify(obj.watchedAt)
  });
  if (foundObj) {
    foundObj.children.push(obj);
  } else { 
    acc.push({ children: [obj] });
  }
  return acc;
}, []);

return (
  <SafeAreaView style={{
    flex: 1,
    backgroundColor: "#090B14"
  }}>
  <View style={styles.top}>
    <TouchableOpacity
      style={styles.revert}
      onPress={() => {
      props.navigation.goBack();
      }}>
    <Image source={require('../../Assets/ImgWatched/Back.png')} />
      </TouchableOpacity>
      <View>
      <Text style={styles.title}>Watched</Text>
      </View>
      </View>
      <FlatList
      data={mergedData}
      renderItem={({item})=><MoviedDay 
      data={item.children}
      handleDelete={(id) => {
        realm.write(() => {
          console.log('Delete succesful!!!')
          item.children.watchedAt = null;
          for(let i=0; i<item.children.length;i++)
          {
            if(item.children[i].id === id)
            {
              item.children[i].watchedAt = null;  
            }
          }
          })
      }}
      />}>
      </FlatList>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    top: {
        width: "100%",
        height: 55,
    },
    revert: {
        position: "absolute",
        top: 17,
        left: 20
    },
    title: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 25,
        fontWeight: '700',
        position: "absolute",
        top: 11,
        left: 155
    },
    name: {
        color: '#FFFF',
        fontSize: 18,
    },
    date: {
        color: '#FFFF',
        fontSize: 15,
        
    },
    day : {
        color : '#F7BE13',
        fontSize : 40,
        fontWeight : '700',
        fontFamily: "Open Sans", 
        },
    button: {
        height: 50,
        width: 50,
        backgroundColor: '#15192D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 15,
    },
    buttonDelete: {
        height: 53,
        width: 51,
        backgroundColor: '#15192D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal : 10,
        marginVertical : 30,
      },
})

export default Watched








