import {Text} from '@rneui/themed';
import dayjs from 'dayjs';
import {Base_URL_GET_IMAGE} from 'main/Config/env';
import {typeLineItem} from 'main/Type/LineItem';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const LineItem = ({
  item,
  handleAddLineItem,
}: {
  item: typeLineItem;
  handleAddLineItem: Function;
}) => {
  return (
    <View style={styleItem.container} key={item.id}>
      <ImageBackground
        source={{uri: `${Base_URL_GET_IMAGE}/w500/${item.poster_path}`}}
        style={styleItem.background}
        resizeMode="cover"
      />
      <View style={styleItem.textContainer}>
        <Text style={styleItem.textType}>
          {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
        </Text>
        <Text style={styleItem.textName}>{item.name}</Text>
        <Text style={styleItem.textDate}>
          {dayjs(item?.release_date).format('MMM DD, YYYY')}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleAddLineItem()}
        style={styleButton.container}>
        <Image source={require('../../Assets/Plus.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styleItem = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 105,
    marginLeft: 19,
    marginRight: 25,
    marginBottom: 16,
    backgroundColor: '#10121B',
    borderRadius: 18,
  },
  background: {
    borderRadius: 50,
    height: '100%',
    width: 75,
  },
  textContainer: {
    marginLeft: 15,
  },
  textType: {
    color: '#9DA0A8',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 5,
  },
  textName: {
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 5,
  },
  textDate: {
    color: '#9DA0A8',
    fontSize: 13,
    fontWeight: '400',
  },
});

const styleButton = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E02F99',
    position: 'absolute',
    right: -18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LineItem;
