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
      photo: data.photo,
    };
  }

  static deSerializeReport(data) {
    return {
      id: data.id,
      date: data.date,
      type_report: data.type_report,
      description: data.description,
      assessment: data.assessment,
      address: data.address,
      username: data.username,
      photo: data.photo,
    };
  }
}

export default ReportSerializer;
