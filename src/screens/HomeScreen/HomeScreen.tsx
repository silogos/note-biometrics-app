import React from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useHome from './useHome';

function HomeScreen({}): JSX.Element {
  const {
    registered,
    biometryType,
    password,
    setPassword,
    handleRegisterBiometric,
    handleLoginBiometric,
    handleRegisterPassword,
    handleLoginPassword,
  } = useHome();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{registered ? 'UNLOCK' : 'REGISTER'}</Text>

      {!!biometryType && biometryType !== 'Unavailable' ? (
        <Pressable
          style={({ pressed }) => [
            styles.buttonBiometric,
            { backgroundColor: pressed ? '#CCC' : '#FFF' },
          ]}
          onPress={registered ? handleLoginBiometric : handleRegisterBiometric}>
          <Icon name="lock" size={30} />
        </Pressable>
      ) : null}

      {!!biometryType && biometryType === 'Unavailable' ? (
        <View style={styles.authPassword}>
          <View style={styles.wrapperPassword}>
            <TextInput
              style={styles.password}
              secureTextEntry={true}
              placeholder="Input your password here"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={
                password.length >= 5
                  ? registered
                    ? handleLoginPassword
                    : handleRegisterPassword
                  : undefined
              }
            />
            {!registered && password.length < 5 ? (
              <Text style={styles.passwordValidation}>
                Password must greater than 5 character
              </Text>
            ) : null}
          </View>
          <Button
            title="Submit"
            onPress={registered ? handleLoginPassword : handleRegisterPassword}
            disabled={password.length < 5}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  buttonBiometric: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  authPassword: {
    width: 350,
    maxWidth: '80%',
    gap: 20,
    alignItems: 'center',
  },
  wrapperPassword: {
    alignItems: 'center',
  },
  password: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  passwordValidation: {
    fontSize: 12,
    color: 'red',
  },

  listContainer: { paddingTop: 20, paddingBottom: 70 },
  buttonAdd: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: '#007ee5',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  buttonAddText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    lineHeight: 35,
    verticalAlign: 'middle',
  },
});

export default HomeScreen;
