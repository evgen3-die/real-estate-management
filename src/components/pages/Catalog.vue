<template>
  <main>
    <b-jumbotron :fluid="true" header="Каталог"/>
    <b-container>
      <b-row>
        <b-col v-for="object in objects" :key="object.id" cols="4" class="mb-4">
          <b-card :title="object.name" tag="article">
            <button type="button" class="close" aria-label="Close" v-if="login" @click.prevent="remove(object.id)">
              <span aria-hidden="true">&times;</span>
            </button>
            <yandex-map
              style="height: 140px;"
              class="mb-3"
              :behaviors="[]"
              :controls="[]"
              :coords="coords[object.id] || [0, 0]"
              :v-if="coords[object.id]"
              @map-was-initialized="recordCoords(object.id, `${object.city.name} ${object.address}`)">
              <ymap-marker
                marker-type="placemark"
                marker-id="1"
                :coords="coords[object.id] || [0, 0]"/>
            </yandex-map>
            <p class="card-text">
              {{ object.short_description }}
            </p>
            <p>
              <b-btn variant="secondary" :to="`/object-card/${object.id}`">Подробнее »</b-btn>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import request from '../../helpers/request';
import getPosition from '../../helpers/getPosition';

export default {
  data() {
    return {
      objects: [],
      coords: {},
      login: false
    }
  },
  created() {
    this.updateList();
    request.get('/check-login').then(response => (this.login = response.data));
  },
  methods: {
    updateCoords() {
      this.objects.forEach(object => {
        this.recordCoords(object.id, `${object.city.name} ${object.address}`);
      });
    },
    recordCoords(objectId, query) {
      getPosition(query, (coords) => {
        this.$set(this.coords, objectId, coords);
      });
    },
    remove(id) {
      request.delete(`/object-card/${id}`).then(() => this.updateList());
    },
    updateList() {
      request.get('/object-cards')
        .then((response) => {
          this.objects = response.data;
          this.updateCoords();
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
.close {
  position: absolute;
  top: 10px;
  right: 17px;
}

.card {
  position: relative;
}
</style>
