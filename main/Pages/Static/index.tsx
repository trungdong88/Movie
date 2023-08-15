import {Text} from '@rneui/themed';
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {LinearGradient, Stop} from 'react-native-svg';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from 'victory-native';
import jsonDataWatchedMovie from '../../Config/Stat/watchedMovie.json';
import jsonDataWatchedSeason from '../../Config/Stat/watchedSeason.json';
import TabViewGenres from './TabViewGenres';

const Static = () => {
  const dataWatchedMovie = jsonDataWatchedMovie.data;
  const dataWatchedSeason = jsonDataWatchedSeason.data;

  const Gradient = ({gradientColors}: {gradientColors: string[]}) => (
    <LinearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%">
      {gradientColors.map((color, index) => (
        <Stop
          key={index}
          offset={`${(index * 100) / (gradientColors.length - 1)}%`}
          stopColor={color}
        />
      ))}
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.note} />
          <Text style={styles.title}> STATICS </Text>
          <TouchableOpacity style={styles.select}>
            <Text style={select.text}> 2022 </Text>
            <Image
              source={require('../../Assets/Static/Select.png')}
              style={select.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styleStat.container}>
          <ImageBackground
            style={styleStat.background}
            source={require('../../Assets/Static/TotalWatched.png')}>
            <Text style={styleStat.title}>Total watched</Text>
            <Text style={styleStat.text}> 3000 </Text>
          </ImageBackground>
          <ImageBackground
            style={styleStat.background}
            source={require('../../Assets/Static/Genres.png')}>
            <Text style={styleStat.title}>Genres</Text>
            <Text style={styleStat.text}> 3000 </Text>
          </ImageBackground>
        </View>
        <View style={styleWatched.container}>
          <Text style={styleWatched.title}>Watched Movie</Text>
          <VictoryChart
            height={250}
            style={{
              parent: {
                marginLeft: -20,
                marginTop: -35,
              },
            }}>
            <Gradient gradientColors={['#134ED4', '#10B7BD']} />
            <VictoryBar
              barWidth={14}
              cornerRadius={{topLeft: 3, topRight: 3}}
              data={dataWatchedMovie}
              style={{
                data: {fill: 'url(#gradient)'},
              }}
              animate={{
                duration: 2000,
                onLoad: {duration: 1000},
              }}
            />
            <VictoryAxis
              crossAxis
              tickLabelComponent={
                <VictoryLabel style={{fill: '#9DA0A8', fontSize: 10}} />
              }
            />
          </VictoryChart>
        </View>
        <View style={styleWatched.container}>
          <Text style={styleWatched.title}>Watched Season</Text>
          <VictoryChart
            height={250}
            style={{
              parent: {
                marginLeft: -20,
                marginTop: -35,
              },
            }}>
            <Gradient gradientColors={['#A713D4', '#4504A7']} />
            <VictoryBar
              barWidth={14}
              cornerRadius={{topLeft: 3, topRight: 3}}
              data={dataWatchedSeason}
              style={{
                data: {fill: 'url(#gradient)'},
              }}
              animate={{
                duration: 2000,
                onLoad: {duration: 1000},
              }}
            />
            <VictoryAxis
              crossAxis
              tickLabelComponent={
                <VictoryLabel style={{fill: '#9DA0A8', fontSize: 10}} />
              }
            />
          </VictoryChart>
        </View>
        <View style={styleGenres.container}>
          <TabViewGenres />
        </View>
      </ScrollView>
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
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 15,
    color: '#fff',
  },
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  select: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    text: {
      fontSize: 16,
      fontWeight: '700',
      color: '#F7BE13',
    },
    icon: {
      marginLeft: 10,
      marginRight: 20,
    },
  },
});

const select = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F7BE13',
  },
  icon: {
    marginLeft: 10,
    marginRight: 20,
  },
});

const styleStat = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 25,
  },
  background: {
    width: 170,
    height: 90,
  },
  title: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 15,
    marginLeft: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 20,
    marginTop: 10,
  },
});

const styleWatched = StyleSheet.create({
  container: {
    backgroundColor: '#15192D',
    borderRadius: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 20,
    paddingTop: 20,
  },
});

const styleGenres = StyleSheet.create({
  container: {
    backgroundColor: '#15192D',
    borderRadius: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default Static;
