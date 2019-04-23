<template>
<div class="auth-wrap-background">
  <div class="auth-center">
    <div class="auth-blur auth-size">
      <div class="auth-wrap-background"></div>
    </div>
  </div>
  <div class="auth-center">
    <div class="auth__inner auth-size">
      <div class="auth__sidebar auth__inner__section pt-5">
        <p>This project was <b>not</b> created for <b>commercial</b> use, It is only for my personal portfolio.</p>
        <p>SignUp Actions are disabled for now, you can use the sample credentials to login.</p>
        
        <div class="mb-3">
          <h4>Credentials</h4>
          <div>
            <v-icon small>mail</v-icon>
            three [@] test .com
          </div>
          <div>
            <v-icon small>vpn_key</v-icon>
            test3</div>
        </div>

        <p>For Further Information & Source Code
          <br>
          <router-link :to="{name: 'about'}">
            <b class="black--text">About Project</b>
          </router-link>
        </p>

        <p>Warm Regards  <br>
          Caner
        </p>
        
      </div>
      <div class="auth__form auth__inner__section">
          
          <Login v-if="form === 'login'" @GoToRegister="form = 'register'"/>
          <Register v-else-if="form === 'register'" @GoToLogin="form = 'login'" />

      </div>
    </div>
  </div>
</div>
</template>

<script>
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
  export default {
    components: {
      Login,
      Register
    },
    data() {
        return {
            form: 'login'
        }
    },
  }
</script>

<style scoped>
a {
  text-decoration: none;
}
html {
  box-sizing: border-box;
  color: #444;
  font: 1rem/1.5 Lato;
}

*,
*:after,
*:before {
  box-sizing: inherit;
}

.auth-wrap-background {
  background-image: url("https://images.unsplash.com/photo-1447958374760-1ce70cf11ee3?crop=entropy&fit=crop&fm=jpg&h=1080&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1920");
  background-size: cover;
  background-position: 50%;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.auth-center {
  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.auth-blur {
  -webkit-filter: blur(10px);
          filter: blur(10px);
  overflow: hidden;
}

.auth-size {
  max-height: 440px;
  max-width: 780px;
  height: 440px;
  width: 100%;
}

.auth__inner {
  display: flex;
  overflow: hidden;
}

.auth__inner__section {
  padding: 1.25rem 2rem;
}

.auth__sidebar {
  background: rgba(255, 255, 255, 0.5);
  flex: 40%;
}

.auth__form {
  background: rgba(34, 37, 42, 0.8);
  flex: 45%;
}

</style>