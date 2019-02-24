import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createGenericScreen, Router } from 'react-native-zen-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

let router;
const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    margin: 5
  },
  info: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderWidth: 1,
    borderColor: 'black',
    padding: 4


    // positionX: 0,
    // positionY: 0
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30
  },
  input: {
    borderWidth: 1,
    padding: 8,
    margin: 4,
    marginBottom: 12
  }
})

class FirstView extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0
    };
  }

  render() {
    return (
      <View onLayout={e => this.setState({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
        <View style={styles.info}>
          <Text>Width: {this.state.width}</Text>
          <Text>Height: {this.state.height}</Text>
        </View>
        <KeyboardAwareScrollView>
          <Text style={styles.header}>FirstView</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.pushHorizontal({ routeName: 'Second' })}
          >
            <Text style={{ textAlign: 'center' }}>Go to second screen</Text>
          </TouchableOpacity>

          {[...Array(30)].map((_, i) => (
            <TextInput
              key={i}
              style={styles.input}
              placeholder={String(i + 1)}
            />
          ))}
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const SecondView = () => {
  return (
    <View style={styles.container}>
      <View style={{ width: 3, height: 3, position: 'absolute', x: 0, y: 0, backgroundColor: 'orange' }} />
      <Text style={styles.header}>SecondView</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.popHorizontal()}
      >
        <Text style={{ textAlign: 'center' }}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}
const routes = {
  First: {
    screen: createGenericScreen({ content: FirstView })
  },
  Second: {
    screen: createGenericScreen({ content: SecondView })
  }
};

const routerConfig = {
  initialRouteName: 'First'
};

export default class App extends Component {
  render() {
    return (
      <Router
        ref={r => router = r}
        routes={routes}
        config={routerConfig}
        screenProps={{ test: 'test' }}
      />
    );
  }
}
