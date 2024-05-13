import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import RootNavigator from './src/navigators/rootNavigators';
import {Provider} from 'react-redux';
import {store} from '@/redux/store';
import {AlertNotificationRoot} from 'react-native-alert-notification';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <AlertNotificationRoot theme="dark">
          <StatusBar
            animated={true}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <RootNavigator />
        </AlertNotificationRoot>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
