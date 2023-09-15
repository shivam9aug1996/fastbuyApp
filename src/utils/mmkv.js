import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
  id: `user-local-storage`,
  encryptionKey: 'hunter2'
})