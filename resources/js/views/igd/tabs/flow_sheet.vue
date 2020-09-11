<template>
  <b-container fluid v-if="data_igd">
    <b-row>
      <b-col lg="12" md="12">
        <b-row>
          <b-col lg="12">
            <iq-card class="wow  fadeInUp" >
              <template v-slot:headerTitle>
                <h4 class="card-title">Summary</h4>
              </template>
              <!-- <template v-slot:headerAction>
                <img :src="'data:image/png;base64,'+data_igd.nrAssIGD.Gambar"/>
              </template>-->
              <template v-slot:body>
                <b-row v-if="data_igd">
                  <b-col md="3" v-for="(i,ind) in data_igd.lastTTV" :key="ind">
                    <iq-card class="shadow-none mb-0 wow  fadeInUp" body-class="p-1">
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
                       <div class="iq-progress-bar-linear mt-3 ">
                          <b-progress
                            :value="i.value"
                            class="iq-progress-bar counter progress" data-wow-delay="0.6s"
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
        <b-row lg="12">
          <b-col lg="6">
            <iq-card class="wow  fadeInUp" >
              <template v-slot:headerTitle>
                <h4 class="card-title">Statistics</h4>
              </template>
              <template v-slot:headerAction>
                <a href>26 Aug 2019</a>
              </template>
              <!-- 
               blood pressure chart
               bpsistol
               map
               bpdistol
               -->
              <ApexChart v-if="data_igd" element="chart-20" :chartOption="charts.ap1" />
            </iq-card>
          </b-col>
          <b-col lg="6">
            <iq-card class="wow  fadeInUp" >
              <template v-slot:headerTitle>
                <h4 class="card-title">Statistics</h4>
              </template>
              <template v-slot:headerAction>
                <a href>26 Aug 2019</a>
              </template>
              <!-- 
                gcs chart
                gcs
                eye
                Motorik
                Verbal
               -->
              <ApexChart v-if="data_igd" element="chart-1" :chartOption="charts.ap2" />
            </iq-card>
          </b-col>
        </b-row>
        <b-row lg="12">
          <b-col lg="6">
            <iq-card class="wow  fadeInUp" >
              <template v-slot:headerTitle>
                <h4 class="card-title">Statistics</h4>
              </template>
              <template v-slot:headerAction>
                <a href>26 Aug 2019</a>
              </template>
              <!-- 
               blood pressure chart
               bpsistol
               map
               bpdistol
               -->
               <ApexChart v-if="data_igd" element="bar-chart-6" :chartOption="charts.ap3"/>
              
            </iq-card>
          </b-col>
          <b-col lg="6">
            <iq-card class="wow  fadeInUp" >
              <template v-slot:headerTitle>
                <h4 class="card-title">Statistics</h4>
              </template>
              <template v-slot:headerAction>
                <a href>26 Aug 2019</a>
              </template>
              <!-- 
                gcs chart
                gcs
                eye
                Motorik
                Verbal
               -->
            <ApexChart v-if="data_igd" element="bar-chart-4" :chartOption="charts.ap4"/>

            </iq-card>
          </b-col>
        </b-row>
        <!-- 
          chart3 
          tep-res-herart
          
         -->
         
        <b-row>
          <b-col lg="12">
          <iq-card class="wow  fadeInUp" >
            <template v-slot:headerTitle>
              <h4 class="card-title">Planning</h4>
            </template>
            
            <Timeline :items="inotes" />
          </iq-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Timeline from '../../../components/sofbox/timeline/TimeLine'
import { sofbox } from "../../../config/pluginInit";

export default {
  components:{
Timeline
  },
  props: {
    data_igd: { type: Object },
  },
  data() {
    return {};
  },
  mounted(){
sofbox.index();
  },

  computed: {
    charts() {
      let charts = {
        ap1: {
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          colors: ["#0084ff", "#00ca00", "red", "blue"],
          series: [
            {
              name: "BPSistol",

              data: [1,2],
            },
            {
              name: "MAP",

              data: [1,2],
            },
            {
              name: "BPDistol",

              data: [1,2],
            },
           
          ],

          xaxis: {
            type: "datetime",
            categories: [],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          
        },
        ap2: {
          chart: {
            height: 350,
            type: "line",
            stacked: false,
          },
          stroke: {
            
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },
          colors: ["#ffc107", "#00ca00", "#0084ff","red"],
          series: [
            {
              name: "GCS",
              type: "column",
              data: [0],
            },
            {
              name: "Eye",
              type: "area",
              data: [0],
            },
            {
              name: "Motorik",
              type: "line",
              data: [0],
            },
            {
              name: "Verbal",
              type: "line",
              data: [0],
            },
          ],
          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          labels: [
           
          ],
          markers: {
            size: 0,
          },
          
          tooltip: {
            shared: true,
            intersect: false,
            
          },
        },
        ap3: {
           chart: {
          height: 407,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5]
        },
        series: [{
          name: 'Temparature',
          data: [0]
        },
        {
          name: 'Heart Rate',
          data: [0]
        },
        {
          name: 'Respiratory Rate',
          data: [0]
        }
        ],
        legend: {
          show: true
        },
        markers: {
          size: 0,

          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          labels:{
            data:[]
          }
        },
        yaxis: {
          labels: {
            show: true
          }
        },
        tooltip: {
         
        },
        grid: {
          borderColor: '#f1f1f1'
        }
          
        },
        ap4: {
          chart: {
          height: 400,
          type: 'bar',
          sparkline: {
            show: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#0084ff', '#ffd400'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '30%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        
        stroke: {
          show: false,
          width: 5,
          colors: ['#ffffff']
        },
        series: [{
          name: 'PainScore',
         
          data: []
        }],
        fill: {
          opacity: 1
        },
        }  
      };
      if (this.data_igd) {

        this.data_igd.datattv.forEach((element, ind) => {
          // charts.ap1.labels[ind] = element.Date;

        //  chart1
              //  blood pressure chart
              //  bpsistol
              //  map
              //  bpdistol
              
          charts.ap1.xaxis.categories[ind] = element.Date==null?0:element.Date;

          charts.ap1.series[0].data[ind] = element.BPSistol==null?0:element.BPSistol;
          charts.ap1.series[1].data[ind] = element.MAP==null?0:element.MAP;
          charts.ap1.series[2].data[ind] = element.BPDistol==null?0:element.BPDistol;
          // charts.ap1.series[3].data[ind] = element.RespiratoryRate;

          // chart2
                // gcs chart
                // gcs
                // eye
                // Motorik
                // Verbal
          charts.ap2.series[0].data[ind] = element.GCS==null?0:element.GCS;
          charts.ap2.series[1].data[ind] = element.Eye==null?0:element.Eye;
          charts.ap2.series[2].data[ind] = element.Motorik==null?0:element.Motorik;
          charts.ap2.series[1].data[ind] = element.Verbal==null?0:element.Verbal;
         
          // chart 3
            charts.ap3.series[0].data[ind] = element.Temperature==null?0:element.Temperature;
          charts.ap3.series[1].data[ind] = element.HeartRate==null?0:element.HeartRate;
          charts.ap3.series[2].data[ind] = element.RespiratoryRate==null?0:element.RespiratoryRate;

          //  chart4
          charts.ap4.series[0].data[ind] = element.PainScore==null==null?0:element.PainScore;

        });
       
      }
      
      return charts;
    },
    inotes(){
      let inotes=[];
      
      if(this.data_igd){
        if(this.data_igd.iNote.length>0){
          this.data_igd.iNote.forEach(element => { 
            let item={"title":'',"right":'',"description":'',"child":{
            items:[]
          }};
        item.title=element.GroupUser?element.GroupUser +' - <strong>'+ element.NamaUser +'</strong>':'-NO Grouop User-';
        item.right =`</br></br><strong> S: </strong> &nbsp; ${element.S_Anamnesa} </br>
        <strong> O: </strong> &nbsp; ${element.O_PemeriksaanFisik} </br>
        <strong> A: </strong> &nbsp; ${element.A_Diagnosa} </br>
        <strong> P: </strong> &nbsp; ${element.P_RencanaTatalaksana} </br>`;
        item.description=`<a>${element.Tgl} </a>`;
          inotes.push(item);
        });
        
          
      
        }
      }
      return inotes;
    }
  },
};
</script>

<style>
.progress {
    
    animation: progressBar 3s ease-in-out;
    animation-fill-mode:both; 
   
}

@keyframes progressBar {
  0% { width: 0; }
  100% { width: 100%; }
}

@-moz-keyframes progressBar {
  0% { width: 0; }
  100% { width: 100%; }
}
</style>