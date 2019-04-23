<template>
    <div class="form" id="register">
        <form>
        <h1 class="form__title">Admin Dashboard</h1>
        <br>
        <label class="form__label"><span class="form__label__text">Email</span>
        <input class="form__input" v-model="email"/>
        <div class="form__input-border"></div>
        </label>
        <label class="form__label"><span class="form__label__text">Password</span>
        <input class="form__input" type="password" v-model="password" />
        <div class="form__input-border"></div>
        </label>
        <button class="button">Sign Up</button>
        </form>
         <div class="change-form">
             Already Registered ? <h4 style="cursor:pointer;" @click="$emit('GoToLogin')">Sign In</h4>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
    }
</script>

<style scoped>
.form__title {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.125rem;
  font-weight: 900;
  letter-spacing: 1px;
  padding: 0 0 1rem 0;
  text-align: center;
  text-transform: uppercase;
}

.form__label {
  padding-bottom: 1.25rem;
  display: block;
}

.form__label__text {
  color: #87909c;
  font-weight: 700;
  font-size: 0.6875rem;
  text-transform: uppercase;
}

.form__input {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 0;
  border-bottom: 2px solid transparent;
  display: block;
  outline: 0;
  position: relative;
  padding: 10px 0px;
  width: 100%;
}
.form__input:focus {
  border-color: 2px solid rgba(255, 255, 255, 0.5);
}

.form__input-border {
  border-bottom: 1px solid #87909c;
  display: block;
}

.button {
  background: #697ec4;
  border-radius: 3px;
  border: 0;
  color: #fff;
  display: block;
  line-height: 60px;
  margin-top: 40px;
  outline: 0;
  width: 100%;
}
.change-form{
    text-align: right;
    margin-top: 25px;
    color: #fff;
}

</style>