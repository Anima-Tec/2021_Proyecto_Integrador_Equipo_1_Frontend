/* eslint-disable linebreak-style */
class ReportSerializer {
  static deSerializeReports(data) {
    return {
      id: data.id,
      date_ago: data.date_ago,
      type_report: data.type_report,
      description: data.description,
      assessment: data.assessment,
      address: data.address,
      photo_place: data.photo_place,
      photo_profile: data.photo_profile,
    };
  }

  static deSerializeReport(data) {
    return {
      id: data.id,
      date_ago: data.date_ago,
      type_report: data.type_report,
      description: data.description,
      assessment: data.assessment,
      address: data.address,
      username: data.username,
      photo_place: data.photo_place,
      photo_profile: data.photo_profile,
    };
  }
}

export default ReportSerializer;
