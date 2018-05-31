<template>
  <div class="page-wrapper">
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <span class="navbar-item">
          <img src="/assets/images/logo.png" alt="Node.js logo"
                height="120" width=auto>
        </span>
        <router-link tag="span" to="/job-summary" class="navbar-item">
          <a>Statistics</a>
        </router-link>
        <router-link tag="span" to="/detailed-jobs" class="navbar-item">
          <a>Detailed Jobs</a>
        </router-link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>

    <div class="page-content">
      <router-view></router-view>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            Created by <a href="https://mmarchini.me/">Matheus Marchini</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import store from '../store.js';

  export default {
    created: function() {
      store.dispatch('updateJobs');
    }
  };
</script>
