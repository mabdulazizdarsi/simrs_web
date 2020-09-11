<template>
  <div v-if="data_igd">
    <div class="float-right" @click="save_assesment1()"> <i class="fa fa-save"> Simpan</i> </div><br>
    <paint :img_data="img_data" />
    <br />
    <!-- <paint :img_data="img_data1" /> -->

  </div>
</template>

<script>
import paint from "../../../../components/sofbox/paint/paint";
import { mapGetters } from "vuex";
import { object } from '@amcharts/amcharts4/core';
export default {
  name: "assesment1",
  data() {
    return {
        img_data1 : {
        id: "assesment1_img1",
        height: "400",
        width: "400",
        data: "",
      }
    };
  },
  props: {
    data_igd: { type: Object },
  },
  computed: {
    ...mapGetters({
      as1_img1: "gambar/assesment1",
    }),
    img_data() {
      let img_data = {
        id: "assesment1_img1",
        height: "400",
        width: "400",
        data: "",
        
      };
      if (this.data_igd) {
        img_data.data =
          "data:image/png;base64," + this.data_igd.nrAssIGD.Gambar;
        // console.log(img_data.data)

      }
      return img_data;
    },
  },
  methods:{
save_assesment1(){
  
  // console.log(this.as1_img1);
   if(this.as1_img1){
   this.data_igd.nrAssIGD['Gambar']=this.as1_img1;
  //  console.log(this.as1_img1);
  }
  // var arr = this.as1_img1.split(','), mime = arr[0].match(/:(.*?);/)[1],
  //       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  //   while(n--){
  //       u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   this.data_igd.nrAssIGD['Gambar']= (new Blob([u8arr], {type:mime})).toString();
  //   console.log(JSON.stringify(this.data_igd.nrAssIGD['Gambar']));
  axios
        .post("/api/post_api",{
          "method":'save_nrassigd',
          "token":localStorage.getItem('token'),
          "data": this.data_igd.nrAssIGD
        })
        .then((response) => {
          
        })
        .catch((e) => {});
}
  },
 
  components: {
    paint,
  },
};
</script>

<style>
</style>