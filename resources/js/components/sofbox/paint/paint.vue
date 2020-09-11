<template>
  <div v-if="run">
    <iq-card
      class="wow fadeInUp"
      data-wow-delay="0.6s"
      :style="'width:'+img_data.width+';height:'+img_data.height"
    >
      <ul class="list-group list-group-horizontal">
        <li
          @click="click_erase(1)"
          :disabled="!erase"
          :class="!erase?'list-group-item active':'list-group-item'"
        >
          <i class="fa fa-pencil-alt"></i>
        </li>
        <li
          @click="click_erase(0)"
          :disabled="erase"
          :class="erase?'list-group-item active':'list-group-item' "
        >
          <i class="fa fa-eraser active"></i>
        </li>
        <li @click="load_image" class="list-group-item">
          <i class="fa fa-redo"></i>
        </li>
        <li @click="download" class="list-group-item">
          <i class="fa fa-save"></i>
        </li>
      </ul>
      <canvas
        :id="img_data.id"
        @mousedown="start"
        @mouseup="finish"
        @mouseleave="finish"
        @mousemove="draw"
      ></canvas>
      <!-- <button @click="click_erase">eraser</button>
      <button @click="load_image">reset_background</button>
      <button @click="download">download</button>
      <img :src="local_img" alt />-->
    </iq-card>
  </div>
</template>
<script>
import { object } from "@amcharts/amcharts4/core";
export default {
  name: "paint",
  data() {
    return {
      elem: null,
      canvas_elem: {},
      painting: false,
      line_width: 2,
      line_cap: "round",
      stroke_style: "black",
      erase: false,
      local_img: "",
    };
  },
  props: {
    img_data: { type: Object },
  },
  mounted() {
    this.elem = document.getElementById(this.img_data.id);
    this.elem.height = this.img_data.height;
    this.elem.width = this.img_data.width;
    this.canvas_elem = this.elem.getContext("2d");
    this.load_image();
  },
  computed: {
    run() {
      let run = false;
      if (this.img_data) {
        run = true;
      }
      return run;
    },
  },
  methods: {
    download() {
      // console.log(this.elem.toDataURL());
      this.local_img = this.elem.toDataURL();
      this.$store.dispatch("gambar/save_gambar", {
        item: this.img_data.id,
        data: this.elem.toDataURL(),
      });
    },
    load_image() {
      // this.canvas_elem.globalCompositeOperation="source-over";
      var img = new Image();
      let img_data = this.img_data;
      img.src = this.img_data.data;
      // console.log(img);
      img.onload = function () {
        document
          .getElementById(img_data.id)
          .getContext("2d")
          .drawImage(img, 0, 0, img_data.height, img_data.width);
        document
          .getElementById(img_data.id)
          .getContext("2d").globalCompositeOperation = "source-over";
        // Or at whatever offset you like
      };
    },
    start(e) {
      this.painting = true;
      this.draw(e);
    },
    finish(e) {
      this.painting = false;
      this.canvas_elem.beginPath();
    },
    click_erase(state) {
      state == 1 ? (this.erase = false) : (this.erase = true);
      console.log(state);
    },
    draw(e) {
      if (!this.painting) {
        return;
      } else {
        let boundry = this.elem.getBoundingClientRect();
        if (this.erase == true) {
          this.canvas_elem.globalCompositeOperation = "destination-out";
        } else {
          this.canvas_elem.globalCompositeOperation = "source-over";
        }
        // console.log(boundry);
        this.canvas_elem.lineWidth = this.line_width;
        this.canvas_elem.lineCap = this.line_cap;
        this.canvas_elem.strokeStyle = this.stroke_style;
        this.canvas_elem.lineTo(e.clientX - boundry.x, e.clientY - boundry.y);
        this.canvas_elem.stroke();
        this.canvas_elem.beginPath();
        this.canvas_elem.moveTo(e.clientX - boundry.x, e.clientY - boundry.y);
      }
    },
  },
};
</script>
<style>
</style>