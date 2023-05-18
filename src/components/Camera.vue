<template>
  <v-container>
    <v-row d-flex wrap>
      <v-col sm="12" md="4" lg="4">
        <v-card elevation="6">
          <v-card-title class="text-center">MCQ's</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
            magni, soluta consequatur voluptate, quae numquam mollitia est iste
            totam cum recusandae harum reiciendis! Molestias, totam maiores!
            Quidem, sunt aspernatur. Corporis placeat rem porro aut harum atque
            suscipit sunt, unde voluptates consectetur necessitatibus
            perspiciatis autem, at libero ab dolorum cumque voluptatum. Quas
            magni, soluta consequatur voluptate, quae numquam mollitia est iste
            totam cum recusandae harum reiciendis! Molestias, totam maiores!
            Quidem, sunt aspernatur. Corporis placeat rem porro aut harum atque
            suscipit sunt, unde voluptates consectetur necessitatibus
            perspiciatis autem, at libero ab dolorum cumque voluptatum.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="4" lg="4">
        <v-card elevation="6">
          <v-card-title class="text-center">Analytical Questions</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
            magni, soluta consequatur voluptate, quae numquam mollitia est iste
            totam cum recusandae harum reiciendis! Molestias, totam maiores!
            Quidem, sunt aspernatur. Corporis placeat rem porro aut harum atque
            suscipit sunt, unde voluptates consectetur necessitatibus
            perspiciatis autem, at libero ab dolorum cumque voluptatum. Quas
            magni, soluta consequatur voluptate, quae numquam mollitia est iste
            totam cum recusandae harum reiciendis! Molestias, totam maiores!
            Quidem, sunt aspernatur. Corporis placeat rem porro aut harum atque
            suscipit sunt, unde voluptates consectetur necessitatibus
            perspiciatis autem, at libero ab dolorum cumque voluptatum.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="4" lg="4">
        <v-card elevation="6">
          <v-card-title class="text-center">Coding Challenge</v-card-title>
          <v-card-text class="text-center">
            <form @submit.prevent="SaveCode()">
              <v-textarea
                bg-color="grey-darken-4"
                color="white"
                label="Code"
                variant="solo-filled"
                v-model="code"
                :rules="[rules.required]"
              ></v-textarea>
              <v-btn type="submit" v-on:click="stopRecording()" color="success"
                >Submit Code</v-btn
              >
            </form>
          </v-card-text>
        </v-card>
      </v-col>
      <video ref="video" hidden></video>
      <v-snackbar
        color="primary"
        class="text-grey-lighten-1"
        right
        v-model="snackbar"
        :timeout="timeout"
      >
        {{ text }}
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
export default defineComponent({
  data() {
    return {
      recordings: [],
      mediaRecorder: null,
      recordedChunks: [],
      videourl: "",
      code: "",
      snackbar: false,
      text: "Code Submitted Successfully!",
      timeout: 2000,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },

  async mounted() {
    const video = this.$refs.video;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    video.srcObject = stream;
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    this.startRecording();
  },

  // beforeUnmount() {
  //   this.stopRecording();
  // },

  methods: {
    startRecording() {
      this.recordedChunks = [];
      if (this.mediaRecorder) {
        this.mediaRecorder.start();
        this.mediaRecorder.addEventListener("dataavailable", (event) => {
          this.recordedChunks.push(event.data);
        });
      }
    },

    stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
        this.mediaRecorder.stop();
        this.mediaRecorder.addEventListener("stop", () => {
          this.saveVideo();
        });
      }
    },
    saveVideo() {
      const blob = new Blob(this.recordedChunks);
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.style = "display: none";
      link.href = blobUrl;
      link.download = "recorded_file.webm";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      this.recordedChunks = [];
      this.videourl = blobUrl;
    },
    async SaveCode() {
      let res = await axios.post("http://localhost:3000/Test", {
        code: this.code,
      });
      console.log(this.videourl);
      if (res.status === 201) {
        this.snackbar = true;
        this.code = "";
      }
    },
  },
});
</script>
