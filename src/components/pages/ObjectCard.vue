<template>
  <main>
    <b-jumbotron :fluid="true" :header="object.name"/>
    <b-container>
      <b-row class="mb-5">
        <b-col cols="7">
          <h2>Описание</h2>
          <p>{{ object.short_description }}</p>
          <p class="mb-5">{{ object.full_description }}</p>

          <template v-if="object.features && object.features.length">
            <h2>Характеристики</h2>
            <b-row class="mb-5">
              <template v-for="feature in object.features">
                <b-col cols="5" tag="dt">{{ feature.name }}</b-col>
                <b-col cols="7" tag="dd">{{ feature.value }}</b-col>
              </template>
            </b-row>
          </template>

          <h2>Расположение</h2>
          <b-row class="mb-5">
            <template v-if="object.city && object.city.region">
              <b-col cols="5" tag="dt">Регион</b-col>
              <b-col cols="7" tag="dd">{{ object.city.region.name }}</b-col>
            </template>

            <template v-if="object.city">
              <b-col cols="5" tag="dt">Населенный пункт</b-col>
              <b-col cols="7" tag="dd">{{ object.city.name }}</b-col>
            </template>

            <template v-if="object.address">
              <b-col cols="5" tag="dt">Адрес</b-col>
              <b-col cols="7" tag="dd">{{ object.address }}</b-col>
            </template>
          </b-row>
        </b-col>
        <b-col cols="5">
          <yandex-map
            style="height: 400px;"
            :coords="coords"
            v-if="coords.length">
            <ymap-marker
              marker-type="placemark"
              marker-id="1"
              :coords="coords"/>
          </yandex-map>
        </b-col>
      </b-row>

      <template v-if="object.rooms && object.rooms.length">
        <h2>Помещения</h2>
        <b-table striped hover v-bind="premises">
          <template slot="totalCostPerMonth" slot-scope="data">
            {{ data.item.area * data.item.cost_month_meter }}
          </template>
          <template slot="table-caption">
            <b-row class="mb-5">
              <b-col cols="3" tag="dt">Общая площадь</b-col>
              <b-col cols="9" tag="dd">{{ totalArea }} м²</b-col>

              <b-col cols="3" tag="dt">Общая стоимость, в мес.</b-col>
              <b-col cols="9" tag="dd">{{ totalObjectCost }} ₽</b-col>
            </b-row>
          </template>
        </b-table>
      </template>
    </b-container>
  </main>
</template>

<script>
import request from '../../helpers/request';
import getPosition from '../../helpers/getPosition';

export default {
  data() {
    return {
      object: {},
      coords: []
    };
  },
  computed: {
    totalArea() {
      if (this.premises.items) {
        return this.premises.items.reduce((sum, current) => (sum + current.area), 0);
      } else {
        return 0;
      }
    },
    totalObjectCost() {
      if (this.premises.items) {
        return this.premises.items.reduce((sum, current) => (sum + current.area * current.cost_month_meter), 0);
      } else {
        return 0;
      }
    },
    premises() {
      return {
        fields: [
          { key: 'area', label: 'Площадь, м²', sortable: true },
          { key: 'floor', label: 'Этаж', sortable: true },
          { key: 'cost_month_meter', label: 'В мес., ₽/м²', sortable: true },
          { key: 'totalCostPerMonth', label: 'Всего в мес., ₽', sortable: true }
        ],
        items: this.object.rooms
      };
    }
  },
  created() {
    request.get(`/object-card/${this.$route.params.id}`)
      .then((response) => {
        this.object = response.data;

        getPosition(`${this.object.city.name} ${this.object.address}`, (coords) => {
          this.coords = coords;
        });
      })
      .catch(error => console.log(error));
  }
};
</script>
