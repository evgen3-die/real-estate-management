<template>
  <main>
    <b-jumbotron :fluid="true" header="Администрирование"/>
    <b-container>
      <p><b-link to="/admin/add-object">Добавить объект</b-link></p>
      <p><b-link to="/admin/add-user">Добавить пользователя</b-link></p>
      <p><b-link @click.prevent="logout">Выход</b-link></p>
    </b-container>
  </main>
</template>

<script>
import request from '../../helpers/request';

export default {
  methods: {
    logout() {
      request.get('/logout');
      this.$router.push('/');
    }
  }
};
</script>
