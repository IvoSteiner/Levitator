var barPlot_pv_Update = function () {
  let myPlot = document.getElementById("barPlot_pv");

  // console.log('Inside the update barPlot_pv function')
  let tr1_y = [
    mod_autoOutput.res_E_pvCells_month_1_1_.current,
    mod_autoOutput.res_E_pvCells_month_1_2_.current,
    mod_autoOutput.res_E_pvCells_month_1_3_.current,
    mod_autoOutput.res_E_pvCells_month_1_4_.current,
    mod_autoOutput.res_E_pvCells_month_1_5_.current,
    mod_autoOutput.res_E_pvCells_month_1_6_.current,
    mod_autoOutput.res_E_pvCells_month_1_7_.current,
    mod_autoOutput.res_E_pvCells_month_1_8_.current,
    mod_autoOutput.res_E_pvCells_month_1_9_.current,
    mod_autoOutput.res_E_pvCells_month_1_10_.current,
    mod_autoOutput.res_E_pvCells_month_1_11_.current,
    mod_autoOutput.res_E_pvCells_month_1_12_.current,
  ];

  let tr2_y = [
    mod_autoOutput.res_E_pvCells_month_2_1_.current,
    mod_autoOutput.res_E_pvCells_month_2_2_.current,
    mod_autoOutput.res_E_pvCells_month_2_3_.current,
    mod_autoOutput.res_E_pvCells_month_2_4_.current,
    mod_autoOutput.res_E_pvCells_month_2_5_.current,
    mod_autoOutput.res_E_pvCells_month_2_6_.current,
    mod_autoOutput.res_E_pvCells_month_2_7_.current,
    mod_autoOutput.res_E_pvCells_month_2_8_.current,
    mod_autoOutput.res_E_pvCells_month_2_9_.current,
    mod_autoOutput.res_E_pvCells_month_2_10_.current,
    mod_autoOutput.res_E_pvCells_month_2_11_.current,
    mod_autoOutput.res_E_pvCells_month_2_12_.current,
  ];

  let tr3_y = [
    mod_autoOutput.res_E_pvCells_month_3_1_.current,
    mod_autoOutput.res_E_pvCells_month_3_2_.current,
    mod_autoOutput.res_E_pvCells_month_3_3_.current,
    mod_autoOutput.res_E_pvCells_month_3_4_.current,
    mod_autoOutput.res_E_pvCells_month_3_5_.current,
    mod_autoOutput.res_E_pvCells_month_3_6_.current,
    mod_autoOutput.res_E_pvCells_month_3_7_.current,
    mod_autoOutput.res_E_pvCells_month_3_8_.current,
    mod_autoOutput.res_E_pvCells_month_3_9_.current,
    mod_autoOutput.res_E_pvCells_month_3_10_.current,
    mod_autoOutput.res_E_pvCells_month_3_11_.current,
    mod_autoOutput.res_E_pvCells_month_3_12_.current,
  ];

  let tr4_y = [
    mod_autoOutput.res_E_pvCells_month_4_1_.current,
    mod_autoOutput.res_E_pvCells_month_4_2_.current,
    mod_autoOutput.res_E_pvCells_month_4_3_.current,
    mod_autoOutput.res_E_pvCells_month_4_4_.current,
    mod_autoOutput.res_E_pvCells_month_4_5_.current,
    mod_autoOutput.res_E_pvCells_month_4_6_.current,
    mod_autoOutput.res_E_pvCells_month_4_7_.current,
    mod_autoOutput.res_E_pvCells_month_4_8_.current,
    mod_autoOutput.res_E_pvCells_month_4_9_.current,
    mod_autoOutput.res_E_pvCells_month_4_10_.current,
    mod_autoOutput.res_E_pvCells_month_4_11_.current,
    mod_autoOutput.res_E_pvCells_month_4_12_.current,
  ];

  let tr5_y = [
    mod_autoOutput.res_E_pvCells_month_5_1_.current,
    mod_autoOutput.res_E_pvCells_month_5_2_.current,
    mod_autoOutput.res_E_pvCells_month_5_3_.current,
    mod_autoOutput.res_E_pvCells_month_5_4_.current,
    mod_autoOutput.res_E_pvCells_month_5_5_.current,
    mod_autoOutput.res_E_pvCells_month_5_6_.current,
    mod_autoOutput.res_E_pvCells_month_5_7_.current,
    mod_autoOutput.res_E_pvCells_month_5_8_.current,
    mod_autoOutput.res_E_pvCells_month_5_9_.current,
    mod_autoOutput.res_E_pvCells_month_5_10_.current,
    mod_autoOutput.res_E_pvCells_month_5_11_.current,
    mod_autoOutput.res_E_pvCells_month_5_12_.current,
  ];

  let tr6_y = [
    mod_autoOutput.res_E_pvCells_month_6_1_.current,
    mod_autoOutput.res_E_pvCells_month_6_2_.current,
    mod_autoOutput.res_E_pvCells_month_6_3_.current,
    mod_autoOutput.res_E_pvCells_month_6_4_.current,
    mod_autoOutput.res_E_pvCells_month_6_5_.current,
    mod_autoOutput.res_E_pvCells_month_6_6_.current,
    mod_autoOutput.res_E_pvCells_month_6_7_.current,
    mod_autoOutput.res_E_pvCells_month_6_8_.current,
    mod_autoOutput.res_E_pvCells_month_6_9_.current,
    mod_autoOutput.res_E_pvCells_month_6_10_.current,
    mod_autoOutput.res_E_pvCells_month_6_11_.current,
    mod_autoOutput.res_E_pvCells_month_6_12_.current,
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

  Plotly.update(myPlot, data_update);
};

var cb_barPlot_pv = function () {
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
    name: "PV-Anlage 1",
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
    name: "PV-Anlage 2",
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
    name: "PV-Anlage 3",
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
    name: "PV-Anlage 4",
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
    name: "PV-Anlage 5",
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
    name: "PV-Anlage6",
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

  Plotly.newPlot("barPlot_pv", data, layout, config);
  // return Promise.resolve("Plot is init");
};

/*
// plot callback function
*/
function init_barPlot_pv() {
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    cb_barPlot_pv();
  } else {
    document.addEventListener("DOMContentLoaded", cb_barPlot_pv);
  }
}
