import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import AddSpace from '../Pages/AddSpace';
import AddTag from 'main/Pages/AddTag';

const Add = ({setVisibleCreate}: {setVisibleCreate: Function}) => {
  const [isVisibleAddSpace, setVisibleAddSpace] = useState<boolean>(false);
  const [isVisibleAddTag, setVisibleAddTag] = useState<boolean>(false);

  return (
    <Pressable style={styles.container}>
      <ImageBackground
        source={require('../Assets/Navigator/BackgroundAdd.png')}
        borderRadius={20}
        style={styles.background}
        resizeMode="cover">
        <Text style={styles.text1}> Create new </Text>
        <View style={styles.row2}>
          <View style={styles.switchWrap}>
            <Pressable
              style={styles.imageWrap}
              onPress={() => setVisibleAddSpace(true)}>
              <Image
                source={require('../Assets/Navigator/create-new-icon-1.png')}
              />
            </Pressable>
            <Text style={styles.text2}> Space </Text>
          </View>
          <View style={styles.switchWrap}>
            <Pressable
              style={styles.imageWrap}
              onPress={() => setVisibleAddTag(true)}>
              <Image
                source={require('../Assets/Navigator/create-new-icon-2.png')}
              />
            </Pressable>
            <Text style={styles.text2}> Tag </Text>
          </View>
        </View>
      </ImageBackground>
      <Pressable
        style={stylesButton.buttonWrap}
        onPress={() => setVisibleCreate(false)}>
        <Image
          source={require('../Assets/Navigator/CombinedShape.png')}
          style={stylesButton.image}
        />
      </Pressable>
      {isVisibleAddSpace && (
        <AddSpace
          isVisibleAddSpace={isVisibleAddSpace}
          setVisibleAddSpace={setVisibleAddSpace}
        />
      )}
      {isVisibleAddTag && (
        <AddTag
          isVisibleAddTag={isVisibleAddTag}
          setVisibleAddTag={setVisibleAddTag}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
  },
  background: {
    height: 265,
    width: 344,
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 22,
    marginBottom: 20,
  },
  text2: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
    textAlign: 'center',
  },
  switchWrap: {
    marginHorizontal: 30,
  },
  imageWrap: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
});

const stylesButton = StyleSheet.create({
  buttonWrap: {
    position: 'absolute',
    bottom: 5,
    height: 56,
    width: 56,
    backgroundColor: '#961E3F',
    borderRadius: 100,
    left: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{translateX: -28}],
  },
  image: {
    transform: [{rotate: '45deg'}],
  },
});
export default Add;
