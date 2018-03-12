<template>
  <b-container>
    <b-row>
      <b-col v-for="object in objects" :key="object.id">
        <h3>{{ object.name }}</h3>
        <p>{{ object.short_description }}</p>
        <p>
          <b-btn variant="secondary" :to="`/object-card/${object.id}`">Подробнее »</b-btn>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import request from '../helpers/request';

export default {
  data() {
    return {
      objects: []
    }
  },
  created() {
    request.get('/object-cards')
      .then(response => (this.objects = response.data.slice(0, 3)))
      .catch(error => console.log(error));
  }
};
</script>
