<template>
    <q-page padding class="bg-background-primary text-white">
      <div class="flex flex-center q-pa-xl">
        <img src="../assets/images/logo.png" width="300" alt="" />
      </div>
      <q-form
        class="q-pa-md full-width row justify-center"
        @submit.prevent="handleLogin"
      >
        <div class="rounded-borders col-md-4 col-sm-6 col-xs-10 q-gutter-y-xs">
          <span>E-mail</span>
          <q-input
            dense
            bg-color="white"
            outlined
            v-model="form.email"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'E-mail é obrigatório!']"

          />
          <span>Senha</span>
          <q-input
            dense
            bg-color="white"
            outlined
            v-model="form.password"
            lazy-rules
            type="password"
            :rules="[(val) => (val && val.length > 0) || 'Senha é obrigatória!']"
          />

          <div class="full-width q-pt-md">
            <q-btn
              size="16px"
              no-caps
              no-wrap
              label="Entrar"
              color="primary"
              class="full-width"
              filled
              type="submit"
              :loading="submitting"
            />
          </div>
        </div>
      </q-form>
    </q-page>
  </template>

<script>
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const submitting = ref(false)

    const { login } = useAuthStore()

    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        const reqObject = JSON.parse(JSON.stringify(form.value))
        submitting.value = true
        const msg = await login(reqObject)
        if (msg) {
          $q.notify({
            type: 'negative',
            message: msg
          })
        } else {
          $q.notify({
            type: 'positive',
            message: 'Login efetuado com sucesso!'
          })
          router.push({ name: 'home' })
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Erro ao efetuar o login!'
        })
      } finally {
        submitting.value = false
      }
    }

    return {
      form,
      submitting,
      handleLogin
    }
  }
})
</script>
