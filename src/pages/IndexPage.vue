<template>
  <q-page padding class="bg-background">
    <div class="q-pa-sm fit row wrap justify-between">
      <div class="col-3">
        <q-input color="grey-4" bg-color="white" filled v-model="text" label="Pesquisar">
          <template v-slot:prepend>
            <SearchIcon/>
          </template>
        </q-input>
      </div>
      <div class="col-3 text-labels text-right ">
          <q-btn
              size="14px"
              no-caps
              text-color="text-labels"
              padding="md"
              class="bg-background-light"
              @click="newCompany = true"
              unelevated
            >
             Adicionar Empresa <PlusIcon />
            </q-btn>
      </div>
      <div class="col-12 self-center q-mt-md">
        <div id="mapContainer"
        />
      </div>

      <q-dialog class="dialogDetails" v-model="seamless" seamless position="bottom">
        <div class="q-ma-xl">
          <q-card style="width: 500px">
            <q-card-section>
              <div class="text-labels text-h6" >{{ company.name }} <span style="padding-left: 90px;"><BuildingIcon/></span></div>
              <div class="text-labels text-subtitle2">{{ company.representantive_user}}</div>
            </q-card-section>
            <q-list class="text-labels">
              <q-item >
                <q-item-section avatar>
                  <EnvelopeIcon/>
                </q-item-section>

                <q-item-section>
                  <q-item-label>E-mail</q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ company.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section avatar>
                  <MarkerIcon/>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Localização</q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Cidade - {{ company.city.title }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section avatar>
                  <SparklesIcon/>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Categoria</q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label> {{ company.category.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
        </q-card>

      </div>
      </q-dialog>
      <q-dialog v-model="newCompany" position="right" maximized>
        <div class="bg-white dialogNew">

          <q-form @submit.prevent="handleLogin"
          class="fit wrap q-pa-md full-width row justify-center"
          >
            <div class="col-12 text-h5 q-pa-md">Cadastrar Empresa</div>
            <div class="rounded-borders col-6 q-px-md">
              <span>Nome</span>
              <q-input
                dense
                bg-color="white"
                outlined
                v-model="form.name"
                lazy-rules
                required
              />
            </div>
            <div class="rounded-borders col-6 q-px-md ">
              <span>Observações</span>
              <q-input
                dense
                bg-color="white"
                outlined
                v-model="form.notes"
                lazy-rules
              />
            </div>
            <div class="rounded-borders col-6 q-px-md">
              <span>CNPJ</span>
              <q-input
                dense
                bg-color="white"
                outlined
                v-model="form.cnpj"
                lazy-rules
                required
              />
            </div>
            <div class="rounded-borders col-6 q-px-md">
              <span>Categoria</span>
              <q-select
                dense
                bg-color="white"
                outlined
                v-model="form.category_id"
                lazy-rules
                required
                :options="categories"
                map-options
                emit-value
                option-value="id"
                option-label="name"
              />
            </div>
            <div class="rounded-borders col-6 q-px-md">
              <span>E-mail</span>
              <q-input
                dense
                bg-color="white"
                outlined
                v-model="form.email"
                lazy-rules
                required
              />
            </div>
            <div class="rounded-borders col-6 q-px-md"></div>
            <div class="rounded-borders col-6 q-px-md">
              <span>Whatsapp</span>
              <q-input
                dense
                bg-color="white"
                outlined
                v-model="form.whatsapp_phone"
                lazy-rules
                required
              />
            </div>
            <div class="rounded-borders col-6 q-px-md"></div>
            <div class="rounded-borders col-6 q-px-md">
              <span>Representante</span>
              <q-input
                dense
                bg-color="white"
                outlined
                v-model="form.representantive_user"
                lazy-rules
                required
              />
            </div>
            <div class="rounded-borders col-6 q-px-md"></div>
            <div class="rounded-borders col-3 q-px-md">
              <span>Latitude</span>
              <q-input
                dense
                bg-color="white"
                outlined
                v-model="form.latitude"
                lazy-rules
                required
              />
            </div>
              <div class="rounded-borders col-3 q-px-md">
              <span>Longitude</span>
              <q-input
                dense
                bg-color="white"
                outlined
                v-model="form.longitude"
                lazy-rules
                required
              />
            </div>
            <div class="rounded-borders col-6 q-px-md"></div>
            <div class="rounded-borders col-3 q-px-md">
              <span>Estado</span>
              <q-select
                dense
                bg-color="white"
                outlined
                v-model="form.state_id"
                lazy-rules
                required
                :options="states"
                map-options
                emit-value
                option-value="id"
                option-label="title"
                @update:model-value="inputState()"
              />
            </div>
              <div class="rounded-borders col-3 q-px-md">
              <span>Cidade</span>
              <q-select
                dense
                bg-color="white"
                outlined
                v-model="form.city_id"
                lazy-rules
                required
                :options="cities"
                map-options
                emit-value
                option-value="id"
                option-label="title"
              />
            </div>
            <div class="rounded-borders col-6 q-px-md"></div>
            <div class="rounded-borders col-12 q-pa-md"></div>
            <div class="rounded-borders col-6 q-px-md text-right">
              <q-btn
                size="16px"
                no-caps
                no-wrap
                label="Cancelar"
                class="bg-background-light q-px-xl text-labels"
                filled
                @click="newCompany = false"

              />
            </div>
            <div class="rounded-borders col-6 q-px-md">
              <q-btn
                size="16px"
                no-caps
                no-wrap
                label="Cadastrar empresa"
                text-color="white"
                class="bg-background-labels q-px-xl"
                filled
                type="submit"

              />
            </div>

          </q-form>
        </div>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue'
import SearchIcon from 'components/icons/SearchIcon.vue'
import BuildingIcon from 'components/icons/BuildingIcon.vue'
import PlusIcon from 'components/icons/PlusIcon.vue'
import MarkerIcon from 'components/icons/MarkerIcon.vue'
import EnvelopeIcon from 'components/icons/EnvelopeIcon.vue'
import SparklesIcon from 'components/icons/SparklesIcon.vue'
import { useApi } from 'src/composables/useApi'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexPage',
  components: {
    SearchIcon,
    PlusIcon,
    BuildingIcon,
    MarkerIcon,
    SparklesIcon,
    EnvelopeIcon
  },
  setup () {
    let map = null
    const $q = useQuasar()
    const loading = ref(true)
    const seamless = ref(false)
    const api = useApi()
    const companys = ref([])
    const markers = ref({})
    const company = ref({})
    const newCompany = ref(false)

    const states = ref({})
    const cities = ref({})
    const categories = ref({})

    const form = ref({
      name: '',
      email: '',
      cnpj: '',
      whatsapp_phone: '',
      representantive_user: '',
      category_id: null,
      city_id: null,
      state_id: null,
      latitude: '',
      longitude: '',
      notes: null
    })

    const iconMarked = L.icon({
      iconUrl: 'src/assets/images/icons/marker.svg',
      iconSize: [24, 24], // size of the icon
      iconAnchor: [12, 24] // point of the icon which will correspond to marker's location
    })

    const iconMarkedSelected = L.icon({
      iconUrl: 'src/assets/images/icons/marker-selected.svg',
      iconSize: [24, 24], // size of the icon
      iconAnchor: [12, 24] // point of the icon which will correspond to marker's location
    })

    onMounted(async () => {
      await handleGetList()
      await handleGetStates()
      await handleGetCategories()
      createMapLayer()
    })

    onBeforeMount(() => {
      if (map) {
        map.remove()
      }
    })

    const handleLogin = async () => {
      try {
        const reqObject = JSON.parse(JSON.stringify(form.value))
        await api.postCompany(reqObject)
        $q.notify({
          type: 'positive',
          message: 'Cadastro efetuado com sucesso!'
        })
      } catch (error) {
        if (error.response.data.message) {
          console.log(error.response)
          $q.notify({
            type: 'negative',
            message: error.response.data.message
          })
        }
      }
    }

    const createMapLayer = () => {
      map = L.map('mapContainer').setView([-26.8560346, -49.239189], 5)
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)
      if (companys.value) {
        const reqObject = JSON.parse(JSON.stringify(companys.value))

        markers.value = reqObject.map((marker) => {
          return L.marker([marker.latitude, marker.longitude], {
            icon: iconMarked, ...marker
          }).addTo(map).on('click', onMapClick)
        })
      }

      map.on('click', onMapClick)
    }

    const onMapClick = (e) => {
      markers.value.forEach(e => e.setIcon(iconMarked))
      if (e.target.options.id) {
        company.value = e.target.options
        e.target.setIcon(iconMarkedSelected)
        seamless.value = true
      } else {
        seamless.value = false
        company.value = {}
      }
    }

    const handleGetList = async () => {
      try {
        loading.value = true
        const { data } = await api.getCompanies()
        loading.value = false
        const reqObject = JSON.parse(JSON.stringify(data))
        if (!reqObject.message) {
          companys.value = reqObject
        }
      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }

    const handleGetStates = async () => {
      try {
        loading.value = true
        const { data } = await api.getStates()
        loading.value = false
        const reqObject = JSON.parse(JSON.stringify(data))
        if (!reqObject.message) {
          states.value = reqObject
        }
      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }

    const handleGetCategories = async () => {
      try {
        loading.value = true
        const { data } = await api.getCategories()
        loading.value = false
        const reqObject = JSON.parse(JSON.stringify(data))
        if (!reqObject.message) {
          categories.value = reqObject
        }
      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }

    const inputState = async () => {
      try {
        loading.value = true
        const { data } = await api.getCitiesByStateId(form.value.state_id)
        loading.value = false
        const reqObject = JSON.parse(JSON.stringify(data))
        if (!reqObject.message) {
          cities.value = reqObject
        }
      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }

    return {
      loading,
      seamless,
      company,
      newCompany,
      form,
      states,
      cities,
      inputState,
      categories,
      handleLogin
    }
  }
})
</script>

<style>
.q-field__label{
  color: #e0e0e0;
}
#mapContainer {
  width: 100%;
  height: calc(100vh - 132px);
}
.dialogNew {
  height: 100%;
  width: 868px !important;
}
</style>
