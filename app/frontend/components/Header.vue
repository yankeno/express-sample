<template>
  <div class="fixed-top shadow-sm position-sticky">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      class="header d-print-none app-header shadow-lg text-light"
    >
      <b-navbar-brand to="/"> SmartSpend </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="$auth.loggedIn">
          <b-nav-item to="/" class="tab-menu">ダッシュボード</b-nav-item>
          <b-nav-item to="/cashflow" class="tab-menu">家計簿</b-nav-item>
          <b-nav-item to="/budgets" class="tab-menu">予算</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="$auth.loggedIn">
            <div @click="$auth.logout()">ログアウト</div>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderMenu',
};
</script>

<style scoped>
.app-name {
  font-weight: 800;
}
.tab-menu {
  padding: 0 0.5em;
  font-weight: 800;
}
</style>
