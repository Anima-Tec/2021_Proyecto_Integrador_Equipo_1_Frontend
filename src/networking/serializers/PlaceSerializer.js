/* eslint-disable linebreak-style */
class PlaceSerializer {
  static deSerializePlace(data, assessment) {
    return {
      id: data.id,
      address: data.address,
      assessment,
    };
  }

  static deSerializePlaceReport(data) {
    return {
      id: data.id,
      date_ago: data.date_ago,
      type_report: data.type_report,
      description: data.description,
      assessment: data.assessment,
      address: data.address,
      username: data.username,
      photo: data.photo,
    };
  }
}

export default PlaceSerializer;
