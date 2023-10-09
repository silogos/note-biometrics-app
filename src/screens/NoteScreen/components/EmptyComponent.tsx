import React from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IEmptyComponent {
  onPressAdd: () => void;
}

function EmptyComponent({ onPressAdd }: IEmptyComponent): JSX.Element {
  return (
    <View style={styles.container}>
      <Icon name="find-in-page" size={100} color={'#CCC'} />
      <Text style={styles.messageText}>You haven't taken notes!</Text>

      <Button title="Add Note" onPress={onPressAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 20,
    gap: 15,
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EmptyComponent;
