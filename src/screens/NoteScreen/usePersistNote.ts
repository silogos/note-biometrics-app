import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Aes from 'react-native-aes-crypto';
import * as Keychain from 'react-native-keychain';
import { AuthenticationPassword, Note } from '../../@types';
import { Buffer } from 'buffer'

interface IUsePersistNote { notes: Note[], setNotes: (notes: Note[]) => void }

function usePersistNote({ notes, setNotes }: IUsePersistNote) {
  const initialized = useRef<'stale' | 'progress' | 'done'>('stale');
  const [credential, setCredential] = useState<AuthenticationPassword>()

  const initializeNotes = useCallback(async () => {
    try {
      initialized.current = 'progress';
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) return;
      const credentialPassword = JSON.parse(credentials.password) as AuthenticationPassword;
      setCredential(credentialPassword)

      const noteStorage = await AsyncStorage.getItem('notes');
      if (!noteStorage) return;

      const decryptedNotes = await Aes.decrypt(noteStorage, credentialPassword.password, credentialPassword.iv, 'aes-256-cbc')
      const notes = await JSON.parse(decryptedNotes);

      setNotes(notes)
    } catch (error) {
      console.log({ error })
    } finally {
      setTimeout(() => {
        initialized.current = 'done';
      }, 0)
    }
  }, [])

  const updateNotes = useCallback(async () => {
    if (!credential) return;

    try {
      const data = JSON.stringify(notes);
      const encryptedData = await Aes.encrypt(data, credential.password, credential.iv, 'aes-256-cbc');
      await AsyncStorage.setItem('notes', encryptedData);
    } catch (error) {
      console.log({ error })
    }
  }, [notes, credential])


  useEffect(() => {
    if (initialized.current === 'stale') initializeNotes()
  }, []);

  useEffect(() => {
    if (initialized.current === 'done') updateNotes()
  }, [notes])

}

export default usePersistNote;
