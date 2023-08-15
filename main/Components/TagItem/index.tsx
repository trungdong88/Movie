import {Text} from '@rneui/themed';
import Trash from 'main/Components/Trash';
import Tag from 'main/Model/Realm/Tag';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {Path, Svg} from 'react-native-svg';

const TagItem = ({
  handlePress,
  tagItem,
}: {
  handlePress: Function;
  tagItem: Tag;
}) => {
  const style = StyleSheet.create({
    container: {
      marginRight: 25,
    },
    name: {
      color: tagItem.color,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 22,
      marginLeft: 35,
      marginTop: '4%',
    },
  });

  const stylesTagItem = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginLeft: 25,
    },
  });

  return (
    <View style={style.container}>
      <Swipeable
        renderRightActions={() => Trash({handlePress, id: tagItem._id})}
        containerStyle={{marginBottom: 15}}>
        <View style={stylesTagItem.container}>
          <Svg width="342" height="53" viewBox="0 0 342 53" fill="none">
            <Path
              opacity="0.15"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.1589 0C19.9222 0 16.8858 1.5665 15.0098 4.20404L2.38466 21.9549C-0.20918 25.6018 -0.0641758 30.528 2.73968 34.0161L14.9977 49.2652C16.8959 51.6265 19.7621 53 22.7918 53H332C337.523 53 342 48.5229 342 43V10C342 4.47715 337.523 0 332 0H23.1589ZM14.9999 31C17.2091 31 18.9999 29.2091 18.9999 27C18.9999 24.7909 17.2091 23 14.9999 23C12.7908 23 10.9999 24.7909 10.9999 27C10.9999 29.2091 12.7908 31 14.9999 31Z"
              fill={tagItem.color}
            />
            <Text style={style.name}>#{tagItem.name}</Text>
          </Svg>
        </View>
      </Swipeable>
    </View>
  );
};

export default TagItem;
