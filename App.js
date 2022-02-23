/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar, StyleSheet, Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import PropTypes from 'prop-types';
import axios from 'axios';

/* Metro Linter Start */

let reloading = false;

const { scriptURL } = NativeModules.SourceCode;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

function Section({ children, title }) {
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: 'white',
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: 'white',
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
};

const MetroLinterComponent = () => {
  const [eslintError, setEslintError] = useState(null);

  // eslint-disable-next-line no-undef
  if (__DEV__ && !reloading) {
    reloading = true;
    axios.get(`http://${hostname}:3022`).then(() => {
      if (eslintError) {
        setEslintError(null);
        setTimeout(() => {
          reloading = false;
        }, 100);
      }
    }).catch((error) => {
      if (error && error.response && error.response.data) {
        if (error.response.data !== eslintError) {
          setEslintError(error.response.data);
          setTimeout(() => {
            reloading = false;
          }, 100);
        }
      } else if (eslintError) {
        setEslintError(null);
        setTimeout(() => {
          reloading = false;
        }, 100);
      }
    });
  }

  if (eslintError) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#ab003c',
          position: 'absolute',
          zIndex: 1,
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <StatusBar barStyle="light-content" />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <Section title="Evil linter">
            You have eslint errors: you have to solve them or your app will not start!
            {'\n'}
            {eslintError}
          </Section>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return <View />;
};

/* Metro Linter End */

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View flex={1}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <Header />
        </ScrollView>
      </SafeAreaView>
      <MetroLinterComponent />
    </View>
  );
}

export default App;
