var cb_doughtnutPlot = function () {
  new Chart(document.getElementById("doughnutPlot1").getContext("2d"), {
    data: {
      datasets: [
        {
          data: [40, 60],
          backgroundColor: ["#65338D", "rgb(229,231,235)"],
        },
      ],
    },
    options: {
      aspectRatio: 1,
      layout: {
        padding: {
          left: 2,
          right: 2,
          top: 2,
          bottom: 2,
        },
      },

      // works only for the specified version of chart.js 2.9 plug in works only for version 2
      cutoutPercentage: 65,
      rotation: -0.5 * Math.PI,

      tooltips: {
        enabled: false, // <-- this option disables tooltips
      },
      plugins: {

        legend: false,
        // doughnutlabel: {
        //   labels: [
        //     {
        //       text: "40 %",
        //       font: {
        //         size: 14,
        //         weight: 530,
        //       },

        //       //  "color":"rgb(87,83,78)"
        //     },
        //   ],
        // },
      },
    },
    type: "doughnut",
  });

  new Chart(document.getElementById("doughnutPlot2").getContext("2d"), {
    data: {
      datasets: [
        {
          data: [40, 60],
          backgroundColor: ["#E57438", "rgb(229,231,235)"],
        },
      ],
    },
    options: {
      aspectRatio: 1,
      layout: {
        padding: {
          left: 2,
          right: 2,
          top: 2,
          bottom: 2,
        },
      },

      // works only for the specified version of chart.js 2.9 plug in works only for version 2
      cutoutPercentage: 65,
      rotation: -0.5 * Math.PI,

      tooltips: {
        enabled: false, // <-- this option disables tooltips
      },
      plugins: {
        legend: false,
        // doughnutlabel: {
        //   labels: [
        //     {
        //       text: "40 %",
        //       font: {
        //         size: 14,
        //         weight: 530,
        //       },

        //       //  "color":"rgb(87,83,78)"
        //     },
        //   ],
        // },
      },
    },
    type: "doughnut",
  });

  // End of Callback
};

/*
// plot callback function
*/
if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  cb_doughtnutPlot();
} else {
  document.addEventListener("DOMContentLoaded", cb_doughtnutPlot);
}
