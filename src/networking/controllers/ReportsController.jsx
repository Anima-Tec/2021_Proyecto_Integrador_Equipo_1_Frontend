/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable quote-props */
import axios from 'axios';
import { generateURL } from '../Routes';
import TokenService from '../TokenServie';
import ReportSerializer from '../serializers/ReportSerializer';
import Report from '../../models/Report';
import ExtendedReport from '../../models/ExtendedReport';

class ReportsController {
  static async createReport(
    date, description, type_report, address, assessment,
  ) {
    const data = TokenService.getUser();
    const response = await axios.post(generateURL('/report'), {
      id_person: data.data.userId,
      date,
      description,
      type_report,
      address,
      assessment,
    },
    {
      headers: { Authorization: `Bearer ${data.data.token}` },
    });
    console.log(response);
  }

  static async getReports() {
    const data = TokenService.getUser();
    const response = await axios.get(generateURL('/reports'),
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
    const deSerializedReports = await response.data.data.map(
      (report) => new Report(ReportSerializer.deSerializeReports(report)),
    );
    return deSerializedReports;
  }

  static async getReport(id) {
    const data = TokenService.getUser();
    const response = await axios.get(generateURL(`/report/${id}`),
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
    const deSerializedReports = await response.data.data.map(
      (report) => new ExtendedReport(ReportSerializer.deSerializeReport(report)),
    );
    return deSerializedReports;
  }

  static async getMisReports(id) {
    const data = TokenService.getUser();
    const response = await axios.get(generateURL(`/person/reports/${id}`),
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
    const deSerializedReports = await response.data.data.map(
      (report) => new Report(ReportSerializer.deSerializeReports(report)),
    );
    return deSerializedReports;
  }
}

export default ReportsController;
