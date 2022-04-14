import axios from 'axios';

class Opinet {
  constructor() {
    this.opinet = axios.create({
      baseURL: 'http://localhost:8080/',
    });
  }
  async aroundStationGasoline(x, y) {
    const respons = await this.opinet.get(
      `/opinet/around`,
      {
        params: { x, y, prodcd: 'B027', radius: 2000 },
      }
    );
    return respons.data;
  }

  async aroundStationDiesel(x, y) {
    const respons = await this.opinet.get(
      `/opinet/around`,
      {
        params: { x, y, prodcd: 'D047', radius: 2000 },
      }
    );
    return respons.data;
  }

  async aroundStationPremium(x, y) {
    const respons = await this.opinet.get(
      `/opinet/around`,
      {
        params: { x, y, prodcd: 'B034', radius: 2000 },
      }
    );
    return respons.data;
  }

  async stationInfo(id) {
    const respons = await this.opinet.get(
      `/opinet/stationinfo`,
      {
        params: { id },
      }
    );
    return respons.data;
  }
}

export default Opinet;
