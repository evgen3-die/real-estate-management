<template>
  <main>
    <b-jumbotron :fluid="true" header="Бизнес-центр Профсоюзная 125 стр. 1"/>
    <b-container>
      <b-row class="mb-5">
        <b-col cols="7">
          <h2>Описание</h2>
          <p>Аренда офисов класса A в бизнес-центре Газфилд (без комиссии), обновления по свободным площадям. Индивидуальный подход к арендаторам офисов.</p>
          <p>Бизнес-центр «Газфилд» — объект недвижимости премиум-класса, который находится в зоне высокой деловой активности — ЮЗАО. По соседству расположилась штаб-квартира «Газпрома». Аренда офиса предлагается в грандиозном комплексе, состоящем из несколько совмещенных разноэтажных корпусов.</p>

          <h2>Характеристики</h2>
          <b-row class="mb-5">
            <b-col cols="5" tag="dt">Характеристики</b-col>
            <b-col cols="7" tag="dd">Характеристики</b-col>
          </b-row>

          <h2>Расположение</h2>
          <b-row class="mb-5">
            <b-col cols="5" tag="dt">Регион</b-col>
            <b-col cols="7" tag="dd">Регион</b-col>

            <b-col cols="5" tag="dt">Район</b-col>
            <b-col cols="7" tag="dd">Район</b-col>

            <b-col cols="5" tag="dt">Населенный пункт</b-col>
            <b-col cols="7" tag="dd">Населенный пункт</b-col>

            <b-col cols="5" tag="dt">Микрорайон</b-col>
            <b-col cols="7" tag="dd">Микрорайон</b-col>
          </b-row>
        </b-col>
        <b-col cols="5">
          <yandex-map
            style="height: 400px;"
            :coords="[54.62896654088406, 39.731893822753904]">
            <ymap-marker
              marker-type="placemark"
              marker-id="1"
              :coords="[54.62896654088406, 39.731893822753904]"/>
          </yandex-map>
        </b-col>
      </b-row>

      <h2>Помещения</h2>
      <b-table striped hover v-bind="premises">
        <template slot="totalCostPerMonth" slot-scope="data">
          {{ data.item.area * data.item.costPerMonth }}
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
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      premises: {
        fields: [
          { key: 'area', label: 'Площадь, м²', sortable: true },
          { key: 'floor', label: 'Этаж', sortable: true },
          { key: 'costPerMonth', label: 'В мес., ₽/м²', sortable: true },
          { key: 'totalCostPerMonth', label: 'Всего в мес., ₽', sortable: true }
        ],
        items: [
          { area: 125, floor: 2, costPerMonth: 344 },
          { area: 344, floor: 1, costPerMonth: 1234 },
          { area: 56, floor: 3, costPerMonth: 233 }
        ]
      }
    };
  },
  computed: {
    totalArea() {
      return this.premises.items.reduce((sum, current) => (sum + current.area), 0);
    },
    totalObjectCost() {
      return this.premises.items.reduce((sum, current) => (sum + current.area * current.costPerMonth), 0);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
