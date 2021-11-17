/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable quote-props */
import axios from 'axios';
import { generateURL } from '../Routes';
import TokenService from '../TokenService';
import PlaceSerializer from '../serializers/PlaceSerializer';
import Place from '../../models/Place';
import PlaceReport from '../../models/PlaceReport';

class PlaceController {
  static async getPlace(address) {
    const data = TokenService.getUser();
    const response = await axios.get(generateURL(`/place/${address}`),
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
    const deSerializedReports = new Place(
      PlaceSerializer.deSerializePlace(
        response.data.data.place,
        response.data.data.assessment,
        response.data.data.quantity,
      ),
    );
    return deSerializedReports;
  }

  static async getPlaceReports(address) {
    const data = TokenService.getUser();
    const response = await axios.get(generateURL(`/place/reports/${address}`),
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      });
    const deSerializedReports = await response.data.data.map(
      (report) => new PlaceReport(PlaceSerializer.deSerializePlaceReport(report)),
    );
    return deSerializedReports;
  }
}

export default PlaceController;
