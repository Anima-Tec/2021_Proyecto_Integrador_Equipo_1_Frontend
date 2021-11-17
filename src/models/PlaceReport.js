/* eslint-disable linebreak-style */
class PlaceReport {
  constructor(data) {
    this.id = data.id;
    this.date_ago = data.date_ago;
    this.type_report = data.type_report;
    this.description = data.description;
    this.assessment = data.assessment;
    this.address = data.address;
    this.photo = data.photo;
    this.username = data.username;
  }
}
export default PlaceReport;
