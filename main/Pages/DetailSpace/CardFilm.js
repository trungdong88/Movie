import React from "react";
import settingFilm from "../../Assets/settingFilm.png"
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
const CardFilm = (props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.action}>
      <Image source={props.url} style={styles.imgFilm}></Image>
      <TouchableOpacity style={styles.setting}>
        <Image source={settingFilm} ></Image>
      </TouchableOpacity>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.nameFilm}>{props.name}</Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  card: {
    width: 106.67,
    marginLeft: 20,
    marginTop: 10,
    alignItems: "center"
  },
  imgFilm: {
    width: 106.67,
    height: 160,
    borderRadius: 20,
    
  },
  setting: {
    position: "absolute",
    top: 10,
    left: 84
  },
  nameFilm: {
    color: "#FFFFFF",
    textAlign: "center",
    width: "70%"
  },
})

export default CardFilm