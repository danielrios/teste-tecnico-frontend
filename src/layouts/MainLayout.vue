<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer show-if-above side="left" class="bg-background-primary text-white" bordered>
      <div class="flex flex-center q-pa-xl h25">
        <img src="../assets/images/logo.png" width="200" alt="" />
      </div>
      <div class="q-pa-xl full-width row h75">
        <div class="col-12 q-gutter-md-xs">
            <span>MENU</span>
          <div class="text-labels full-width q-pt-sm">
            <q-btn
              align="left"
              size="14px"
              no-caps
              color="white"
              text-color="text-labels"
              class="q-py-sm full-width"
              filled
              :to="{name:'home'}"
            >
              <BuildingIcon /> Empresas
            </q-btn>
          </div>
        </div>
        <div class="col-12 q-gutter-md-xs self-end">
          <div class="q-gutter-sm">
            <q-btn
              align="left"
              size="14px"
              no-caps
              text-color="text-labels"
              flat
              @click="logout"
            >
              <PowerOff/> Sair
            </q-btn>
          </div>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import BuildingIcon from 'src/components/icons/BuildingIcon.vue'
import PowerOff from 'src/components/icons/PowerOff.vue'
import { useAuthStore } from 'src/stores/auth-store'

const { logout } = useAuthStore()
</script>

<style >
.h75 {
  height: 75%;
}

.h25 {
  height: 25%;
}
</style>
