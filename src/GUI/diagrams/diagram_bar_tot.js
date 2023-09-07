var barPlot_tot_Update = function () {
  // console.log('Inside the update barPlot_tot function')
  let tr1_y = [
    mod_autoOutput.res_E_pvTot_month_1_.current,
    mod_autoOutput.res_E_pvTot_month_2_.current,
    mod_autoOutput.res_E_pvTot_month_3_.current,
    mod_autoOutput.res_E_pvTot_month_4_.current,
    mod_autoOutput.res_E_pvTot_month_5_.current,
    mod_autoOutput.res_E_pvTot_month_6_.current,
    mod_autoOutput.res_E_pvTot_month_7_.current,
    mod_autoOutput.res_E_pvTot_month_8_.current,
    mod_autoOutput.res_E_pvTot_month_9_.current,
    mod_autoOutput.res_E_pvTot_month_10_.current,
    mod_autoOutput.res_E_pvTot_month_11_.current,
    mod_autoOutput.res_E_pvTot_month_12_.current,
  ];

  let tr2_y = [
    mod_autoOutput.res_E_consumersTot_month_1_.current,
    mod_autoOutput.res_E_consumersTot_month_2_.current,
    mod_autoOutput.res_E_consumersTot_month_3_.current,
    mod_autoOutput.res_E_consumersTot_month_4_.current,
    mod_autoOutput.res_E_consumersTot_month_5_.current,
    mod_autoOutput.res_E_consumersTot_month_6_.current,
    mod_autoOutput.res_E_consumersTot_month_7_.current,
    mod_autoOutput.res_E_consumersTot_month_8_.current,
    mod_autoOutput.res_E_consumersTot_month_9_.current,
    mod_autoOutput.res_E_consumersTot_month_10_.current,
    mod_autoOutput.res_E_consumersTot_month_11_.current,
    mod_autoOutput.res_E_consumersTot_month_12_.current,
  ];

  let tr3_y = [
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
    mod_autoOutput.res_E_bat_month_1_.current,
  ];

  let tr4_y = [
    mod_autoOutput.res_E_fromGrid_month_1_.current,
    mod_autoOutput.res_E_fromGrid_month_2_.current,
    mod_autoOutput.res_E_fromGrid_month_3_.current,
    mod_autoOutput.res_E_fromGrid_month_4_.current,
    mod_autoOutput.res_E_fromGrid_month_5_.current,
    mod_autoOutput.res_E_fromGrid_month_6_.current,
    mod_autoOutput.res_E_fromGrid_month_7_.current,
    mod_autoOutput.res_E_fromGrid_month_8_.current,
    mod_autoOutput.res_E_fromGrid_month_9_.current,
    mod_autoOutput.res_E_fromGrid_month_10_.current,
    mod_autoOutput.res_E_fromGrid_month_11_.current,
    mod_autoOutput.res_E_fromGrid_month_12_.current,
  ];

  let tr5_y = [
    mod_autoOutput.res_E_toGrid_month_1_.current,
    mod_autoOutput.res_E_toGrid_month_2_.current,
    mod_autoOutput.res_E_toGrid_month_3_.current,
    mod_autoOutput.res_E_toGrid_month_4_.current,
    mod_autoOutput.res_E_toGrid_month_5_.current,
    mod_autoOutput.res_E_toGrid_month_6_.current,
    mod_autoOutput.res_E_toGrid_month_7_.current,
    mod_autoOutput.res_E_toGrid_month_8_.current,
    mod_autoOutput.res_E_toGrid_month_9_.current,
    mod_autoOutput.res_E_toGrid_month_10_.current,
    mod_autoOutput.res_E_toGrid_month_11_.current,
    mod_autoOutput.res_E_toGrid_month_12_.current,
  ];

  let tr6_y = [
    mod_autoOutput.res_E_selfConsumption_month_1_.current,
    mod_autoOutput.res_E_selfConsumption_month_2_.current,
    mod_autoOutput.res_E_selfConsumption_month_3_.current,
    mod_autoOutput.res_E_selfConsumption_month_4_.current,
    mod_autoOutput.res_E_selfConsumption_month_5_.current,
    mod_autoOutput.res_E_selfConsumption_month_6_.current,
    mod_autoOutput.res_E_selfConsumption_month_7_.current,
    mod_autoOutput.res_E_selfConsumption_month_8_.current,
    mod_autoOutput.res_E_selfConsumption_month_9_.current,
    mod_autoOutput.res_E_selfConsumption_month_10_.current,
    mod_autoOutput.res_E_selfConsumption_month_11_.current,
    mod_autoOutput.res_E_selfConsumption_month_12_.current,
  ];

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
    x: [year, year, year, year, year, year],
    y: [tr1_y, tr2_y, tr3_y, tr4_y, tr5_y, tr6_y],
  };

  Plotly.update("barPlot_tot", data_update);
};

//async

var cb_barPlot_tot = async function () {
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
    name: "Produktion",
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
    name: "Verbrauch",
    marker: { color: guiSettings.diagrams.colors.green },
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
    name: "Batterie",
    marker: { color: guiSettings.diagrams.colors.orange },
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
    name: "Netzbezug",
    marker: { color: guiSettings.diagrams.colors.lightblue },
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
    name: "Rückspeisung",
    marker: { color: guiSettings.diagrams.colors.lightgreen },
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
    name: "Eigenverbrauch",
    marker: { color: guiSettings.diagrams.colors.grey },
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

    //      y: 1.35,

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

  Plotly.newPlot("barPlot_tot", data, layout, config);
  return Promise.resolve("Plot is init");
};
//

/*
// plot callback function
*/

function init_barPlot_tot() {
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    cb_barPlot_tot();
  } else {
    document.addEventListener("DOMContentLoaded", cb_barPlot_tot);
  }
}
