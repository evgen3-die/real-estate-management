import axios from 'axios';

export default function (query, callback) {
  axios.get('https://geocode-maps.yandex.ru/1.x/', {
    params: {
      format: 'json',
      geocode: query,
      results: 1
    }
  })
    .then(response => {
      const coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
      callback(coords.reverse());
    })
    .catch(error => console.log(error));
}
