/* eslint-disable linebreak-style */
import axios from 'axios';
import { generateURL } from '../Routes';
import TokenService from '../TokenServie';

class SessionController {
  static async login(username, password) {
    const response = await axios.post(generateURL('/login'), {
      username,
      password,
    });
    TokenService.setUser(response.data);
  }

  static async Signup(name, surname, username, dateBirth, email, password) {
    const response = await axios.post(generateURL('/register'), {
      name,
      surname,
      username,
      dateBirth,
      email,
      password,
    });
    TokenService.setUser(response.data);
  }
}

export default SessionController;
