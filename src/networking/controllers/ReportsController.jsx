/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable quote-props */
import axios from 'axios';
import { generateURL } from '../Routes';
import TokenService from '../TokenService';
import ReportSerializer from '../serializers/ReportSerializer';
import Report from '../../models/Report';
import ExtendedReport from '../../models/ExtendedReport';

class ReportsController {
  static async createReport(
    date, description, type_report, name_place, address_place, assessment, photo,
  ) {
    const data = TokenService.getUser();
    const response = await axios.post(generateURL('/report'), {
      id_person: data.data.userId,
      date,
      description,
      type_report,
      name_place,
      address_place,
      assessment,
      photo,
    },
    {
      headers: { Authorization: `Bearer ${data.data.token}` },
    });
    return response;
  }

  static async getReports() {
    const data = TokenService.getUser();
    const response = await axios.get(generateURL('/reports'),
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
    console.log(response);
    const deSerializedReports = await response.data.data.map(
      (report) => new Report(ReportSerializer.deSerializeReports(report)),
    );
    return deSerializedReports;
  }

  static async getReport(id) {
    const data = await TokenService.getUser();
    if (data.data.typeUser === 'admin') {
      const response = await axios.get(generateURL(`/reportered/${id}`),
        {
          headers: { Authorization: `Bearer ${data.data.token}` },
        });
      console.log(response);
      const deSerializedReports = await response.data.data.map(
        (report) => new ExtendedReport(ReportSerializer.deSerializeReport(report)),
      );
      return deSerializedReports;
    }
    const response = await axios.get(generateURL(`/report/${id}`),
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
    console.log(response);
    const deSerializedReports = await response.data.data.map(
      (report) => new ExtendedReport(ReportSerializer.deSerializeReport(report)),
    );
    return deSerializedReports;
  }

  static async getReporteredReports() {
    const data = TokenService.getUser();
    const response = await axios.get(generateURL('/admin/view-reports'),
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
    const deSerializedReports = await response.data.data.map(
      (report) => new Report(ReportSerializer.deSerializeReports(report)),
    );
    console.log(deSerializedReports);
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

  static async reportReport(id) {
    const data = TokenService.getUser();
    await axios.post(generateURL('/person/report'),
      {
        id_report: id,
        id_person: data.data.userId,
      },
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
  }
}

export default ReportsController;
