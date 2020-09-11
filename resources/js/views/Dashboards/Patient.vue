<template>
  <b-container fluid v-if="data_igd">
    <b-row>
      <b-col lg="12" md="12">
        <b-row>
          <b-col lg="12">
            <iq-card class="wow fadeInUp" data-wow-delay="0.6s">
              <template v-slot:headerTitle>
                <h4 class="card-title">Summary</h4>
              </template>
              <!-- <template v-slot:headerAction>
                <img :src="'data:image/png;base64,'+data_igd.nrAssIGD.Gambar"/>
              </template>-->
              <template v-slot:body>
                <b-row v-if="data_igd">
                  <b-col md="3" v-for="(i,ind) in data_igd.lastTTV" :key="ind">
                    <iq-card class="shadow-none mb-0 wow fadeInUp" body-class="p-1">
                      <template v-slot:body>
                        <span class="text-dark float-right">
                          <i
                            :class="i.icon=='up'?'ri-arrow-up-fill mr-1':'ri-arrow-down-fill mr-1'"
                          />
                          {{i.difference}}%
                        </span>
                        <span class="font-size-14">{{i.title}}</span>
                        <h2>
                          <span class="h2 counter">{{i.value}}</span>
                          <img
                            class="float-right summary-image-top mt-1"
                            :src="'../../assets/images/page-img/'+i.img+'.png'"
                            alt="summary-image"
                          />
                        </h2>
                        <!-- <div class="progress-bar"></div> -->
                        <!-- <b-progress :value="i.value" class="mb-1" max="100" :variant="i.variant" ></b-progress> -->
                        <div class="iq-progress-bar-linear mt-3">
                          <b-progress
                            :value="i.value"
                            class="iq-progress-bar counter"
                            :variant="i.variant"
                          />
                        </div>
                      </template>
                    </iq-card>
                  </b-col>
                </b-row>
              </template>
            </iq-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="8">
            <iq-card class="wow fadeInUp" data-wow-delay="0.6s">
              <template v-slot:headerTitle>
                <h4 class="card-title">Statistics</h4>
              </template>
              <template v-slot:headerAction>
                <a href>26 Aug 2019</a>
              </template>
              <ApexChart v-if="data_igd" element="chart-20" :chartOption="chart20" />
            </iq-card>
          </b-col>
          <b-col lg="4">
            <iq-card class="wow fadeInUp" data-wow-delay="0.6s">
              <template v-slot:headerTitle>
                <h4 class="card-title">Diet Plan</h4>
              </template>
              <template v-slot:headerAction>
                <a href="#">See All</a>
              </template>
              <template v-slot:body>
                <div
                  class="owl-carousel"
                  data-autoplay="true"
                  data-loop="true"
                  data-nav="false"
                  data-dots="true"
                  data-items="1"
                  data-items-laptop="1"
                  data-items-tab="1"
                  data-items-mobile="1"
                  data-items-mobile-sm="1"
                  data-margin="30"
                >
                  <div class="item">
                    <div class>
                      <a class="mb-3 d-block font-size-16" href="#">
                        <i class="ri-pencil-ruler-2-line mr-1" />Breakfast
                      </a>
                      <h5 class="mb-2">Meal plan is for a person aged 19-50 years.</h5>
                      <p>
                        Wholegrain toast with polyunsaturated margarine
                        2 slices toast.
                        2 teaspoon margarine.
                        20g cheese2 teaspoon margarine.
                        1 cup mixed salad vegetables.Unsalted nuts 30g 1 meat.
                      </p>
                      <button type="button" class="btn btn-primary mt-3">Read More</button>
                    </div>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
        <b-row></b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { sofbox } from "../../config/pluginInit";
import store from "../../store";
import { mapGetters } from "vuex";

export default {
  name: "patient",
  mounted() {
    let NoEpisode = this.$route.params.episode;
    let response = store.dispatch("igd/data_pasien", {
      NoEpisode: NoEpisode,
    });

    // this.get_dashboard(NoEpisode);
  },
  beforeDestroy() {
    console.log('destroyed')
    this.$store.commit("igd/update_data_pasien", null);
  },
  computed: {
    ...mapGetters({
      data_igd1: "igd/data_igd",
    }),
    data_igd() {
      let data_igd = this.data_igd1;
      // console.log(response);
      if (data_igd) {
        data_igd.datattv.forEach((element, ind) => {
          this.chart20.labels[ind] = element.Date;
          this.chart20.series[0].data[ind] = element.BPSistol;
          this.chart20.series[1].data[ind] = element.Temperature;
          this.chart20.series[2].data[ind] = element.HeartRate;
          this.chart20.series[3]["data"][ind] = element.RespiratoryRate;
        });
        //   setTimeout(() => {
        // sofbox.index();
        // },10000);
        sofbox.index();
      }

      return data_igd;
    },
  },
  data() {
    return {
      chart20: {
        chart: {
          height: 387,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
          group: "sparklines",
        },
        stroke: {
          width: [2, 3],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "20%",
          },
        },
        colors: ["#00ca00", "#0084ff", "orange", "yellow"],
        series: [
          {
            name: "Blood Pressure",
            type: "area",
            data: [0],
          },
          {
            name: "Temparature",
            type: "area",
            data: [0],
          },
          {
            name: "Heart Rate",
            type: "area",
            data: [0],
          },
          {
            name: "Respiratori Rate",
            type: "area",
            data: [0],
          },
        ],
        fill: {
          opacity: [0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: ["nodata"],
        xaxis: {
          labels: {
            show: false,
          },
        },
        yaxis: {
          type: String,
          labels: {
            show: true,
            minWidth: 10,
            data: ["asdf", "asdf"],
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        legend: {
          show: false,
        },
      },
      events: [
        {
          title: "All Day Event",
          start: "2019-12-01",
        },
        {
          title: "Long Event",
          start: "2019-12-07",
          end: "2019-12-10",
          color: "purple", // override!
        },
        {
          groupId: "999",
          title: "Repeating Event",
          start: "2019-12-09T16:00:00",
        },
        {
          groupId: "999",
          title: "Repeating Event",
          start: "2019-12-16T16:00:00",
        },
        {
          title: "Conference",
          start: "2019-12-11",
          end: "2019-12-13",
          color: "purple", // override!
        },
        {
          title: "Meeting",
          start: "2019-12-12T10:30:00",
          end: "2019-12-12T12:30:00",
          color: "red",
        },
        {
          title: "Lunch",
          start: "2019-12-12T12:00:00",
          color: "green",
        },
        {
          title: "Meeting",
          start: "2019-12-12T14:30:00",
        },
        {
          title: "Birthday Party",
          start: "2020-01-02T07:00:00",
        },
        {
          title: "Click for Google",
          url: "http://google.com/",
          start: "2020-01-15",
        },
      ],
      // data_igd: {},
    };
  },
  methods: {
    //   async get_dashboard(NoEpisode){
    //  let response= await store.dispatch('igd/data_igd',{"NoEpisode":NoEpisode});
    //  if(response.code=="0"){
    //    this.$$router.go('/igd');
    //  }
    // }
  },
};
</script>
