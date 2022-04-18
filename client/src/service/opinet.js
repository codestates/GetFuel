import axios from 'axios';

class Opinet {
  constructor() {
    this.opinet = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/opinet`,
    });
  }
  async aroundStationGasoline(x, y) {
    const respons = await this.opinet.get(`/around`,
      {
        params: { x, y, prodcd: 'B027', radius: 2000 },
      }
    );
    return respons.data;
  }

  async aroundStationDiesel(x, y) {
    const respons = await this.opinet.get(`/around`,
      {
        params: { x, y, prodcd: 'D047', radius: 2000 },
      }
    );
    return respons.data;
  }

  async aroundStationPremium(x, y) {
    const respons = await this.opinet.get(`/around`,
      {
        params: { x, y, prodcd: 'B034', radius: 2000 },
      }
    );
    return respons.data;
  }

  async stationInfo(id) {
    const respons = await this.opinet.get(`/stationinfo`,
      {
        params: { id },
      }
    );
    return respons.data;
  }
}

export default Opinet;
