<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      class="bg-blue"
      theme="dark"
      permanent
    >
      <template v-slot:prepend>
        <v-list-item
          lines="three"
          prepend-avatar="../assets"
          title="Example Test.com"
        ></v-list-item>
      </template>

      <v-list color="transparent">
        <v-list-item
          v-for="item in MenuItems"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="loadComponent(item.component)"
        >
        </v-list-item>
      </v-list>
      <template class="d-md-none d-sm-flex ma-1 mt-15">
        <v-text-field
          density="compact"
          variant="solo"
          label="Search"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          rounded="xl"
          bg-color="white"
          color="white"
        ></v-text-field>
      </template>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title>Testing Platform</v-toolbar-title>
      <v-col cols="3" class="d-sm-none d-md-flex">
        <v-text-field
          density="compact"
          variant="solo"
          label="Search"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          rounded="xl"
        ></v-text-field>
      </v-col>
    </v-app-bar>

    <v-main @click="drawer = false">
      <v-container>
        <h1 class="text-center">Welcome to ExampleTest.com</h1>
        <h5 class="text-center text-red" v-if="NoOfTimeTabchanged > 0">
          You switch tabs {{ NoOfTimeTabchanged / 2 }} times
        </h5>

        <component :is="currentComponent"></component>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import Camera from "@/components/Camera.vue";
import CompOne from "@/components/CompOne.vue";
import CompTwo from "@/components/CompTwo.vue";

// Components

export default defineComponent({
  name: "HomeView",
  data() {
    const isTabOpen = ref(false);

    const handleTabchange = () => {
      isTabOpen.value = !document.hidden;
      this.NoOfTimeTabchanged++;
    };

    onMounted(() => {
      document.addEventListener("visibilitychange", handleTabchange);
    });

    return {
      isTabOpen,
      NoOfTimeTabchanged: 0,
      drawer: false,
      currentComponent: CompOne,
      MenuItems: [
        {
          title: "Start The Test",
          icon: "mdi-pencil",
          component: "Camera",
        },
        {
          title: "View Results",
          icon: "mdi-note-text",
          component: "CompTwo",
        },
      ],
    };
  },
  methods: {
    loadComponent(component) {
      if (component === "Camera") {
        this.currentComponent = Camera;
      } else if (component === "CompTwo") {
        this.currentComponent = CompTwo;
      }
    },
  },
});

// watchEffect(() => {
//       console.log(isTabOpen.value);
//     });
</script>
