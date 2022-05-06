import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const item = await AsyncStorage.getItem(`auth:${this.namespace}`);
    return item ? JSON.parse(item) : "";
  }

  setAccessToken(accessToken) {
    AsyncStorage.setItem(`auth:${this.namespace}`, JSON.stringify(accessToken));
  }

  removeAccessToken() {
    AsyncStorage.removeItem(`auth:${this.namespace}`);
  }
}

export default AuthStorage;
