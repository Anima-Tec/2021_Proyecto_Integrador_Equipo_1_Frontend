import axios from 'axios';
import { generateBackendURL } from '../Routes';
import TokenService from '../TokenServie';

class SessionController {
  static async login(username, password) {
    const response = await axios.post(generateBackendURL('/auth/signin'), {
      username,
      password,
    });
    TokenService.setUser(response.data);
  }

  static async Signup(name, surname, username, dateBirth, email, password) {
    const response = await axios.post(generateBackendURL('/auth/signup'), {
      name,
      surname,
      username,
      dateBirth,
      email,
      password,
    });
    console.log(response);
  }
}

export default SessionController;
