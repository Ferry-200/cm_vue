<script setup>
import MDFilledButton from '@/component/MDFilledButton.vue'
import MDForm from '@/component/MDForm.vue'
import { jellyfinApi, saveAccessToken } from '@/jellyfin/api'
import { useRouter } from 'vue-router'

const router = useRouter()

let username = ''
let password = ''

function login() {
  jellyfinApi.authenticateUserByName(username, password).then(() => {
    saveAccessToken(jellyfinApi.accessToken)
    router.replace({ path: '/' })
  })
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-main">
      <div class="title">Coriander Music</div>
      <form>
        <MDForm
          v-model="username"
          form-id="login-username"
          label-text="账号"
          form-type="username"
          auto-complete="username"
        />
        <MDForm
          v-model="password"
          form-id="login-password"
          label-text="密码"
          form-type="password"
          auto-complete="current-password"
        />
      </form>
      <MDFilledButton :click="login">登陆</MDFilledButton>
    </div>
  </div>
</template>
<style scoped>
.login-wrapper {
  width: inherit;
  height: inherit;
  display: flex;
}

.login-main {
  margin: auto;
  width: 80%;
  height: 40%;
  border-radius: 8px;
  background-color: var(--md-primary-container);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.title {
  color: var(--md-on-primary-container);
  font-weight: bold;
  font-size: 24px;
}

form > * {
  margin-bottom: 4px;
}
</style>
