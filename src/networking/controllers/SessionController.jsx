/* eslint-disable linebreak-style */
/* eslint-disable quote-props */
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
    }, {
      headers: {
        'Accept': 'application/json',
      },
    });
    TokenService.setUser(response.data);
  }
}

export default SessionController;
