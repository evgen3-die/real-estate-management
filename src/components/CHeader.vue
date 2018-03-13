<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
    <b-container>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">СУБОН</b-navbar-brand>
      <b-collapse is-nav class="w-100" id="collapse-1">
        <b-navbar-nav class="mr-auto">
          <b-nav-item to="/catalog">Каталог</b-nav-item>
          <b-nav-item to="/about">О компании</b-nav-item>
          <b-nav-item to="/contacts">Контакты</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-collapse is-nav class="w-100" id="collapse-2">
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/admin">Панель управления</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
