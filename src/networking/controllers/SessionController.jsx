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

  // eslint-disable-next-line camelcase
  static async Signup(name, surname, username, birth_date, email, password, password_confirmation) {
    const response = await axios.post(generateURL('/register'), {
      name,
      surname,
      birth_date,
      username,
      email,
      password,
      password_confirmation,
    }, {
      headers: { Accept: 'application/json' },
    });
    TokenService.setUser(response.data);
  }

  static async logout() {
    const data = TokenService.getUser();
    await axios.post(generateURL('/logout'), {}, {
      headers: { Authorization: `Bearer ${data.data.token}` },
    });
    TokenService.removeUser();
  }
}

export default SessionController;
