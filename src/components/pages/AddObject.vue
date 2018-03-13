<template>
  <main>
    <b-jumbotron :fluid="true" header="Добавить объект"/>
    <b-container>
      <b-form @submit.prevent="onSubmit">
        <h2>Описание</h2>
        <b-form-group label="Название:">
          <b-form-input type="text" v-model="form.name" required/>
        </b-form-group>
        <b-form-group label="Короткое описание:">
          <b-form-input type="text" v-model="form.short_description" required/>
        </b-form-group>
        <b-form-group label="Длинное описание:">
          <b-form-input type="text" v-model="form.full_description" required/>
        </b-form-group>
        <b-form-group label="Адрес:">
          <b-form-input type="text" v-model="form.address" required/>
        </b-form-group>
        <b-form-group label="Город:">
          <b-form-input class="mb-2" type="text" v-model.number="cityQuery" @input="onFindCity" required/>
          <template v-if="cityVariants.length">
            <b-button
              size="sm"
              variant="success"
              v-for="city in cityVariants"
              :key="city.id"
              class="mr-2"
              @click="onSelectCity(city.name, city.id)">
              {{ city.name }}
            </b-button>
          </template>
        </b-form-group>

        <h2 class="mt-5">Характеристики</h2>
        <b-row v-for="(feature, index) in form.features" :key="`feature-${index}`" class="mb-3">
          <b-col>
            <b-form-input v-model="feature.name" type="text" placeholder="Название"/>
          </b-col>
          <b-col>
            <b-form-input v-model="feature.value" type="text" placeholder="Значение"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button type="submit" variant="secondary" @click.prevent="addFeature">Добавить характеристику</b-button>
          </b-col>
        </b-row>

        <h2 class="mt-5">Помещения</h2>
        <b-row v-for="(room, index) in form.rooms" :key="`room-${index}`" class="mb-3">
          <b-col>
            <b-form-input v-model.number="room.area" type="text" placeholder="Площадь, м²"/>
          </b-col>
          <b-col>
            <b-form-input v-model.number="room.floor" type="text" placeholder="Этаж"/>
          </b-col>
          <b-col>
            <b-form-input v-model.number="room.cost_month_meter" type="text" placeholder="В мес., ₽/м²"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button type="submit" variant="secondary" @click.prevent="addRoom">Добавить помещение</b-button>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col>
            <b-button type="submit" variant="primary">Отправить</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </main>
</template>

<script>
  import request from '../../helpers/request';

  export default {
    data() {
      return {
        form: {
          name: '',
          short_description: '',
          full_description: '',
          address: '',
          city_id: 0,
          features: [],
          rooms: []
        },
        cityQuery: '',
        cityVariants: []
      }
    },
    created() {
      this.addFeature();
      this.addRoom();
    },
    methods: {
      onSubmit() {
        this.form.features = this.removeEmpty(this.form.features);
        this.form.rooms = this.removeEmpty(this.form.rooms);

        request.post('/object-card', this.form);
      },
      onFindCity() {
        request.get('/city', {
          params: { query: this.cityQuery }
        })
          .then((response) => {
            this.cityVariants = response.data;
          });
      },
      onSelectCity(name, id) {
        this.form.city_id = id;
        this.cityVariants = [];
        this.cityQuery = name;
      },
      addFeature() {
        this.form.features.push({ name: '', value: '' });
      },
      addRoom() {
        this.form.rooms.push({ area: '', floor: '', cost_month_meter: '' });
      },
      removeEmpty(list) {
        return list.reduce((prev, item) => {
          let empty = 0;

          Object.keys(item).forEach(key => {
            if (!item[key]) {
              empty++;
            }
          });

          if (!empty) {
            prev.push(item);
          }

          return prev;
        }, []);
      }
    }
  };
</script>
