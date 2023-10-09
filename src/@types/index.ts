import { BiometryType } from "react-native-biometrics";

export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface AuthenticationPassword {
  authenticationType: BiometryType | 'Unavailable';
  password: string;
  iv: string;
}