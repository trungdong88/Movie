import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {VictoryAxis, VictoryChart, VictoryPie} from 'victory-native';

const TabViewGenres = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tab1', title: 'Movie Genres'},
    {key: 'tab2', title: 'TV Show Genres'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      tabStyle={{width: 'auto'}}
      style={styles.tabBar}
      renderLabel={({route, focused}) => (
        <Text style={[styles.tabLabel, {color: focused ? '#F7BE13' : '#FFF'}]}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderScene = SceneMap({
    tab1: Tab,
    tab2: Tab,
  });

  return (
    <TabView
      style={{width: 300, height: 340}}
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
    />
  );
};

const Tab = () => (
  <View>
    <VictoryChart
      height={250}
      style={{
        parent: {
          marginLeft: -20,
          marginTop: -35,
          marginBottom: -30,
        },
      }}>
      <VictoryPie
        colorScale={['#3E28FF', '#FF4E4E', '#39FFD1']}
        data={[{y: 35}, {y: 40}, {y: 55}]}
      />
      <VictoryAxis crossAxis={false} />
    </VictoryChart>
    <ComponentGenres color="#3E28FF" name="Action" count={100} />
    <ComponentGenres color="#FF4E4E" name="Comedy" count={10} />
    <ComponentGenres color="#39FFD1" name="Horror" count={10} />
  </View>
);

const ComponentGenres = ({
  color,
  name,
  count,
}: {
  color: string;
  name: string;
  count: number;
}) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 12,
      transform: [{translateX: Dimensions.get('window').width / 4}],
    },
    color: {
      height: 20,
      width: 20,
      borderRadius: 5,
      backgroundColor: color,
      marginRight: 13,
    },
    text: {
      color: '#9DA0A8',
      fontSize: 14,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.color} />
      <Text style={styles.text}>
        {name} - {count} movie
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  tabIndicator: {
    backgroundColor: '#F7BE13',
    height: 3,
  },
  tabBar: {
    backgroundColor: '#15192D',
    padding: 0,
    margin: 0,
    marginLeft: 10,
  },
});

export default TabViewGenres;
