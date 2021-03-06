/* eslint-disable linebreak-style */
/* eslint-disable quote-props */
import axios from 'axios';
import { generateURL } from '../Routes';
import TokenService from '../TokenService';

class SessionController {
  static login(username, password) {
    return axios.post(generateURL('/login'), {
      username,
      password,
    }).then((res) => {
      TokenService.setUser(res.data);
    });
  }

  // eslint-disable-next-line camelcase
  static async Signup(name, surname, username, birth_date, email, password, password_confirmation) {
    return axios.post(generateURL('/register'), {
      name,
      surname,
      birth_date,
      username,
      email,
      password,
      password_confirmation,
    }, {
      headers: { Accept: 'application/json' },
    }).then((res) => {
      TokenService.setUser(res.data);
    });
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
