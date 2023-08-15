import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider, createTheme} from '@rneui/themed';
import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SyncedRealmContext} from './Model/Realm/RealmConfig';
import TabNavigator from './Navigator/TabNavigator';
import DetailSpace from './Pages/DetailSpace';
import EditSpace from './Pages/EditSpace';
import SearchMovie from './Pages/SearchLineItem';
import Watched from './Pages/Watched';
import UpComing from './Pages/UpComing';
import DetailLineItem from './Pages/LineItem';
import LineItem from './Pages/LineItem';
import SecretPass from './screens/SecretPass';
const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#090B14',
  },
};

const uiTheme = createTheme({
  components: {
    Text: {
      style: {
        fontFamily: 'Open Sans',
        color: '#322E2A',
      },
    },
    Button: {
      titleStyle: {
        fontFamily: 'Open Sans',
        color: 'black',
      },
      buttonStyle: {
        backgroundColor: 'transparent',
      },
    },
  },
});

const {RealmProvider} = SyncedRealmContext;

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={uiTheme}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <NavigationContainer theme={MyTheme}>
              <RealmProvider>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen name="Home" component={TabNavigator} />
                  <Stack.Screen
                    name="DetailSpace"
                    component={DetailSpace}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="EditSpace"
                    component={EditSpace}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Watched"
                    component={Watched}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="UpComing"
                    component={UpComing}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="SearchMovie"
                    component={SearchMovie}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="DetailLineItem"
                    component={DetailLineItem}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="SecretPass"
                    component={SecretPass}
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack.Navigator>
              </RealmProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};
