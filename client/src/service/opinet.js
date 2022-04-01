import axios from 'axios';

class Opinet {
  async aroundStation(x, y) {
    const respons = await axios.get('http://localhost:8080/opinet/around', {
      params: { x, y, radius: 2000 },
    });
    return respons.data;
  }

  async stationInfo(id) {
    const respons = await axios.get(
      'http://localhost:8080/opinet/stationinfo',
      {
        params: { id },
      }
    );
    return respons.data;
  }
}

export default Opinet;
