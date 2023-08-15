import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ListTabScreen} from 'main/Config/TabScreen';
import TabAdd from 'main/Navigator/TabAdd';
import {typeTabScreen} from 'main/Type/TabScreen';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}: any) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        title: '',
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.25,
          elevation: 2,
          height: 70,
          backgroundColor: '#15192D',
        },
      }}
      sceneContainerStyle={{
        backgroundColor: '#000',
      }}>
      <Tab.Screen
        key={0}
        name={ListTabScreen[0].name}
        component={ListTabScreen[0].componentScreen}
        options={{
          tabBarIcon: ({focused}: any) => (
            <RenderTabIcon isFocus={focused} props={ListTabScreen[0]} />
          ),
        }}
      />
      <Tab.Screen
        key={1}
        name={ListTabScreen[1].name}
        component={ListTabScreen[1].componentScreen}
        options={{
          tabBarIcon: ({focused}: any) => (
            <RenderTabIcon isFocus={focused} props={ListTabScreen[1]} />
          ),
        }}
      />

      <Tab.Screen
        key={100}
        name={'Main'}
        options={{
          tabBarIcon: () => <RenderTabIconAdd navigation={navigation} />,
        }}>
        {() => <TabNavigator />}
      </Tab.Screen>
      <Tab.Screen
        key={2}
        name={ListTabScreen[2].name}
        component={ListTabScreen[2].componentScreen}
        options={{
          tabBarIcon: ({focused}: any) => (
            <RenderTabIcon isFocus={focused} props={ListTabScreen[2]} />
          ),
        }}
      />
      <Tab.Screen
        key={3}
        name={ListTabScreen[3].name}
        component={ListTabScreen[3].componentScreen}
        options={{
          tabBarIcon: ({focused}: any) => (
            <RenderTabIcon isFocus={focused} props={ListTabScreen[3]} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RenderTabIconAdd = (navigation: any) => {
  const [visibleCreate, setVisibleCreate] = React.useState<boolean>(false);
  return visibleCreate ? (
    <TabAdd setVisibleCreate={setVisibleCreate} />
  ) : (
    <Pressable
      style={styleAdd.container}
      onPress={() => setVisibleCreate(true)}>
      <Image source={require('../Assets/Navigator/CombinedShape.png')} />
    </Pressable>
  );
};

const RenderTabIcon = ({
  props,
  isFocus,
}: {
  props: typeTabScreen;
  isFocus: boolean;
}) => {
  return isFocus ? (
    <View style={[styles.activeWrap]}>
      <Image
        source={require('../Assets/Navigator/navigation.png')}
        style={{
          position: 'absolute',
          top: -25,
        }}
      />
      <Image source={props.sourceActive} />
    </View>
  ) : (
    <View>
      <Image source={props.source} />
    </View>
  );
};

const styleAdd = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    height: 56,
    width: 56,
    backgroundColor: '#F7BE13',
    borderRadius: 100,
  },
});

const styles = StyleSheet.create({
  activeWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText: {},
});

export default TabNavigator;
