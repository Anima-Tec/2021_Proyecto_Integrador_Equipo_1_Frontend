/* eslint-disable linebreak-style */
class PlaceSerializer {
  static deSerializePlace(data, assessment, quantity) {
    return {
      id: data.id,
      address: data.address,
      name: data.name,
      assessment,
      quantity,
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
