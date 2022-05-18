const https = require('https');

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on('data', chunk => resolve(JSON.parse(chunk)));
        response.on('error', reject);
      });
    })
  }

  async getPlanets(url) {
    const result = await this.makeRequest(url);

    return {
      name: result.name,
      surfaceWater: result.surface_water,
      appearedIn: result.films.length,
    }
  }

}

module.exports = Service