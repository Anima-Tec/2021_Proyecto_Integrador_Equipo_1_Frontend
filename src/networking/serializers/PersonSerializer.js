/* eslint-disable linebreak-style */
class PersonSerializer {
  static deSerializePerson(data) {
    return {
      username: data.username,
      email: data.email,
      name: data.name,
      surname: data.surname,
      birth_date: data.birth_date,
      photo_profile: data.photo_profile,
    };
  }
}

export default PersonSerializer;
