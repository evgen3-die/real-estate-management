<template>
  <main>
    <b-jumbotron :fluid="true" header="Добавить пользователя"/>
    <b-container>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Логин:">
          <b-form-input type="text" v-model="user.name" required/>
        </b-form-group>
        <b-form-group label="Пароль:">
          <b-form-input type="password" v-model="user.password" required/>
        </b-form-group>

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
export default {
  data() {
    return {
      user: {
        name: '',
        password: ''
      }
    };
  }
};
</script>
