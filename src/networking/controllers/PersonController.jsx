/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable quote-props */
import axios from 'axios';
import { generateURL } from '../Routes';
import TokenService from '../TokenService';
import PersonSerializer from '../serializers/PersonSerializer';
import Person from '../../models/Person';

class PersonController {
  static async getPerson() {
    const data = TokenService.getUser();
    const response = await axios.get(generateURL(`/person/${data.data.userId}`),
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
    const deSerializedPerson = await response.data.data.map(
      (person) => new Person(PersonSerializer.deSerializePerson(person)),
    );
    return deSerializedPerson;
  }
}

export default PersonController;
