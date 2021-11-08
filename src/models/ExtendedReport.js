/* eslint-disable linebreak-style */
class Report {
  constructor(data) {
    this.id = data.id;
    this.date_ago = data.date_ago;
    this.type_report = data.type_report;
    this.description = data.description;
    this.assessment = data.assessment;
    this.address = data.address;
    this.username = data.username;
    this.photo = data.photo;
  }
}
export default Report;
