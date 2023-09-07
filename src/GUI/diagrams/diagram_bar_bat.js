var barPlot_bat_Update = function () {
  // console.log('Inside the update barPlot_bat function')
  let tr1_y = [
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_2_.current,
    mod_autoOutput.res_E_bat_month_3_.current,
    mod_autoOutput.res_E_bat_month_4_.current,
    mod_autoOutput.res_E_bat_month_5_.current,
    mod_autoOutput.res_E_bat_month_6_.current,
    mod_autoOutput.res_E_bat_month_7_.current,
    mod_autoOutput.res_E_bat_month_8_.current,
    mod_autoOutput.res_E_bat_month_9_.current,
    mod_autoOutput.res_E_bat_month_10_.current,
    mod_autoOutput.res_E_bat_month_11_.current,
    mod_autoOutput.res_E_bat_month_12_.current,
  ];

  // let tr2_y = [
  //   mod_autoOutput.res_E_consumersTot_month_1_.current,
  //   mod_autoOutput.res_E_consumersTot_month_2_.current,
  //   mod_autoOutput.res_E_consumersTot_month_3_.current,
  //   mod_autoOutput.res_E_consumersTot_month_4_.current,
  //   mod_autoOutput.res_E_consumersTot_month_5_.current,
  //   mod_autoOutput.res_E_consumersTot_month_6_.current,
  //   mod_autoOutput.res_E_consumersTot_month_7_.current,
  //   mod_autoOutput.res_E_consumersTot_month_8_.current,
  //   mod_autoOutput.res_E_consumersTot_month_9_.current,
  //   mod_autoOutput.res_E_consumersTot_month_10_.current,
  //   mod_autoOutput.res_E_consumersTot_month_11_.current,
  //   mod_autoOutput.res_E_consumersTot_month_12_.current,
  // ];

  // let tr3_y = [
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  //   mod_autoOutput.res_E_bat_month_1_.current,
  // ];

  // let tr4_y = [
  //   mod_autoOutput.res_E_fromGrid_month_1_.current,
  //   mod_autoOutput.res_E_fromGrid_month_2_.current,
  //   mod_autoOutput.res_E_fromGrid_month_3_.current,
  //   mod_autoOutput.res_E_fromGrid_month_4_.current,
  //   mod_autoOutput.res_E_fromGrid_month_5_.current,
  //   mod_autoOutput.res_E_fromGrid_month_6_.current,
  //   mod_autoOutput.res_E_fromGrid_month_7_.current,
  //   mod_autoOutput.res_E_fromGrid_month_8_.current,
  //   mod_autoOutput.res_E_fromGrid_month_9_.current,
  //   mod_autoOutput.res_E_fromGrid_month_10_.current,
  //   mod_autoOutput.res_E_fromGrid_month_11_.current,
  //   mod_autoOutput.res_E_fromGrid_month_12_.current,
  // ];

  // let tr5_y = [
  //   -mod_autoOutput.res_E_toGrid_month_1_.current,
  //   -mod_autoOutput.res_E_toGrid_month_2_.current,
  //   -mod_autoOutput.res_E_toGrid_month_3_.current,
  //   -mod_autoOutput.res_E_toGrid_month_4_.current,
  //   -mod_autoOutput.res_E_toGrid_month_5_.current,
  //   -mod_autoOutput.res_E_toGrid_month_6_.current,
  //   -mod_autoOutput.res_E_toGrid_month_7_.current,
  //   -mod_autoOutput.res_E_toGrid_month_8_.current,
  //   -mod_autoOutput.res_E_toGrid_month_9_.current,
  //   -mod_autoOutput.res_E_toGrid_month_10_.current,
  //   -mod_autoOutput.res_E_toGrid_month_11_.current,
  //   -mod_autoOutput.res_E_toGrid_month_12_.current,
  // ];

  // let tr6_y = [
  //   mod_autoOutput.res_E_selfConsumption_month_1_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_2_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_3_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_4_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_5_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_6_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_7_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_8_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_9_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_10_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_11_.current,
  //   mod_autoOutput.res_E_selfConsumption_month_12_.current,
  // ];

  let year = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  let data_update = {
    x: [year],
    y: [tr1_y],
  };
  Plotly.update("barPlot_bat", data_update);
};

var cb_barPlot_bat = function () {
  let trace1 = {
    x: [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    name: "Gespeicherte Energie",
    marker: { color: guiSettings.diagrams.colors.blue },
    type: "bar",
  };

  let trace2 = {
    x: [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    name: "default name 2",
    showlegend: false,
    marker: { color: "rgba(200,200,200,0)" }, // color with opacity zero
    type: "bar",
  };

  let trace3 = {
    x: [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    name: "default name 3",
    showlegend: false,
    marker: { color: "rgba(200,200,200,0)" }, // color with opacity zero
    type: "bar",
  };

  let trace4 = {
    x: [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    name: "default name 4",
    showlegend: false,
    marker: { color: "rgba(200,200,200,0)" }, // color with opacity zero
    type: "bar",
  };

  let trace5 = {
    x: [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    name: "default name 5",
    showlegend: false,
    marker: { color: "rgba(200,200,200,0)" }, // color with opacity zero
    type: "bar",
  };

  let trace6 = {
    x: [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    name: "default name 6",
    showlegend: false,
    marker: { color: "rgba(200,200,200,0)" }, // color with opacity zero
    type: "bar",
  };

  let data = [trace1, trace2, trace3, trace4, trace5, trace6];

  let layout = {
    autosize: true,
    margin: { l: 35, r: 10, b: 40, t: 30, pad: 4 },
    // Legende
    showlegend: true,
    legend: {
      orientation: "h",
      x: -0.02,
      y: 1.08,
    },

    xaxis: {},
    yaxis: {
      autorange: true,
      type: "linear",
    },

    barmode: "group",
    bargap: 0.15,
    bargroupgap: 0.1,
  };
  // end layout

  let config = {
    responsive: true,
    // displayModeBar: true,
    // 'resetscale'
    modeBarButtonsToRemove: [
      "toImage",
      "sendDataToCloud",
      "autoscale",
      "lasso2d",
    ],
    displaylogo: false,
  };

  Plotly.newPlot("barPlot_bat", data, layout, config);
};

/*
// plot callback function
*/
function init_barPlot_bat() {
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    cb_barPlot_bat();
  } else {
    document.addEventListener("DOMContentLoaded", cb_barPlot_bat);
  }
}
