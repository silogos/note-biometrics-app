import { StackActions, useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';
import Aes from 'react-native-aes-crypto'

const rnBiometrics = new ReactNativeBiometrics();

function useHome() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [biometryType, setBiometryType] = useState<
    BiometryType | 'Unavailable'
  >();

  const checkRegistered = useCallback(async () => {
    try {
      // throw new Error('awe')
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        setRegistered(true);
        const credential = JSON.parse(credentials.password);
        setBiometryType(credential?.authenticationType)
      } else {
        setBiometryType(available ? biometryType : 'Unavailable');
      }
    } catch (error) {
      console.log({ error });
      setRegistered(false);
      setBiometryType('Unavailable');
    }
  }, []);

  const handleRegisterBiometric = useCallback(async () => {
    try {
      const prompt = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate',
      });
      if (!prompt.success) throw new Error('User cancelled biometric prompt');

      const { publicKey } = await rnBiometrics.createKeys();

      const credential = {
        authenticationType: biometryType,
        password: await Aes.pbkdf2(publicKey, '12345', 5000, 256, 'sha512'),
        iv: await Aes.randomKey(16)
      }

      await Keychain.setGenericPassword('authentication', JSON.stringify(credential));
      navigation.dispatch(StackActions.replace('Note'));
    } catch (error) {
      console.log({ error });
    }
  }, [biometryType]);

  const handleLoginBiometric = useCallback(async () => {
    try {
      const prompt = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate',
      });
      if (!prompt.success) throw new Error('User cancelled biometric prompt');

      navigation.dispatch(StackActions.replace('Note'));
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const handleRegisterPassword = useCallback(async () => {
    try {
      const credential = {
        authenticationType: biometryType,
        password: await Aes.pbkdf2(password, '12345', 5000, 256, 'sha512'),
        iv: await Aes.randomKey(16)
      }
      await Keychain.setGenericPassword('authentication', JSON.stringify(credential));
      navigation.dispatch(StackActions.replace('Note'));
    } catch (error) {
      console.log({ error });
    }
  }, [password, biometryType]);

  const handleLoginPassword = useCallback(async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) return;

      const passwordSalt = await Aes.pbkdf2(password, '12345', 5000, 256, 'sha512');
      const credential = JSON.parse(credentials.password);

      if (passwordSalt === credential.password) navigation.dispatch(StackActions.replace('Note'));
    } catch (error) {
      console.log({ error });
    }
  }, [password]);

  useEffect(() => {
    checkRegistered();
  }, []);

  return {
    registered,
    biometryType,
    password,
    setPassword,
    handleRegisterBiometric,
    handleLoginBiometric,
    handleRegisterPassword,
    handleLoginPassword
  }
}

export default useHome;
