var donutPlot_yearCons_Update = function () {
  let myPlot = document.getElementById("donutPlot_yearCons");

  //
  // Calculating display text
  //
  consumerValSTR = math.format(
    math.round(mod_autoOutput.res_E_consumersTot.current, 6),
    {
      notation: "fixed",
      precision: 0,
    }
  );

  // res_E_selfConsumption
  eigenverbrauchValSTR = math.format(
    math.round(mod_autoOutput.res_E_selfConsumption.current, 6),
    {
      notation: "fixed",
      precision: 0,
    }
  );
  netzbezugValSTR = math.format(
    math.round(mod_autoOutput.res_E_fromGrid.current, 6),
    {
      notation: "fixed",
      precision: 0,
    }
  );

  autarkieValSTR = math.format(
    math.round(mod_autoOutput.res_autarky.current, 6),
    {
      notation: "fixed",
      precision: 0,
    }
  );

  netzbezugsAnteilValSTR = math.format(
    math.round(100 - mod_autoOutput.res_autarky.current, 6),
    {
      notation: "fixed",
      precision: 0,
    }
  );

  // netzbezugsAnteilValSTR = math.format(
  //   math.round(
  //     (mod_autoOutput.res_E_fromGrid.current /
  //       mod_autoOutput.res_E_consumersTot.current) *
  //       100,
  //     6
  //   ),
  //   {
  //     notation: "fixed",
  //     precision: 0,
  //   }
  // );
  //
  // End of calculating display text
  //

  var data_update = {
    values: [
      [
        mod_autoOutput.res_E_selfConsumption.current,
        mod_autoOutput.res_E_fromGrid.current,
      ],
    ],
    labels: [["Eigenverbrauch", "Netzbezug"]],
    marker: {
      colors: [
        guiSettings.diagrams.colors.grey,
        guiSettings.diagrams.colors.lightblue,
      ],
    },
  };

  var layout = {
    annotations: [
      {
        showarrow: false,
        text: `<b>${consumerValSTR}<br>kWh</b>`,
        x: 0.5,
        y: 0.5,
        xref: "width domain",
        yref: "height domain",
        font: {
          // family: "sans serif",
          size: 15,
          color: guiSettings.diagrams.colors.green,
        },
        bgcolor: "#fffffff",
        opacity: 0.8,
      },
      {
        x: 0.02,
        y: 0.5,
        xref: "width domain",
        yref: "height domain",
        text: `<b>${netzbezugValSTR} kWh<br>${netzbezugsAnteilValSTR} %</b>`,
        showarrow: false,
        // arrowhead: 7,
        // ax: 0,
        // ay: -40,
        font: {
          // family: "sans serif",
          size: 15,
          color: guiSettings.diagrams.colors.lightblue,
        },
        bgcolor: "#ffffff",
        opacity: 1,
        align: "left", // left, center, right
      },
      {
        x: 0.98,
        y: 0.5,

        xref: "width domain",
        yref: "height domain",
        text: `<b>${eigenverbrauchValSTR} kWh<br>${autarkieValSTR} %</b>`,
        showarrow: false,
        // arrowhead: 7,
        // ax: 10,
        // ay: -40,
        font: {
          // family: "sans serif",
          size: 15,
          color: guiSettings.diagrams.colors.grey,
        },
        bgcolor: "#ffffff",
        opacity: 1,
        align: "right", // left, center, right
      },
    ],
  };

  Plotly.update(myPlot, data_update, layout, [0]);
};

var cb_donutPlot_yearCons = function () {
  emptyColor = "#f3f4f6";

  var data = [
    {
      values: [1, 1],
      labels: ["Eigenverbrauch", "Netzbezug"],
      domain: { column: 0 },
      hole: 0.7,
      type: "pie",
      sort: false,
      marker: {
        colors: [emptyColor, emptyColor],
        // colors: [guiSettings.diagrams.colors.grey, guiSettings.diagrams.colors.lightgreen],
      },
      // auto horizontal radial tangential
      // insidetextorientation: "horizontal",
      // textposition: "outside",
      automargin: true,
      textinfo: "none",
    },
  ];

  var layout = {
    title: false,
    autosize: true,
    margin: { l: 0, r: 0, b: 0, t: 20, pad: 0 },
    showlegend: true,
    legend: {
      orientation: "h",
      traceorder: "reversed",
      xanchor: "center",
      x: 0.5,
      y: -0.05,
    },
    hovermode: false,

    // font: {
    //   family: "sans serif",
    //   size: 15,
    //   color: "#000000",
    // },

    annotations: [
      {
        showarrow: false,
        text: "<b>0<br>kWh</b>",
        x: 0.5,
        y: 0.5,
        xref: "width domain",
        yref: "height domain",
        font: {
          // family: "sans serif",
          size: 15,
          color: guiSettings.diagrams.colors.green,
        },
        bgcolor: "#fffffff",
        opacity: 0.8,
      },
      {
        x: 0.02,
        y: 0.5,
        xref: "width domain",
        yref: "height domain",
        text: "<b>0 kWh<br>0 %</b>",
        showarrow: false,
        // arrowhead: 7,
        // ax: 0,
        // ay: -40,
        font: {
          // family: "sans serif",
          size: 15,
          color: guiSettings.diagrams.colors.lightblue,
        },
        bgcolor: "#ffffff",
        opacity: 1,
        align: "left", // left, center, right
      },
      {
        x: 0.98,
        y: 0.5,
        xref: "width domain",
        yref: "height domain",
        text: "<b>0 kWh<br>0 %</b>",
        showarrow: false,
        // arrowhead: 7,
        // ax: 10,
        // ay: -40,
        font: {
          // family: "sans serif",
          size: 15,
          color: guiSettings.diagrams.colors.grey,
        },
        bgcolor: "#ffffff",
        opacity: 1,
        align: "right", // left, center, right
      },
    ],
  };

  let config = {
    responsive: true,
    displayModeBar: false,
    displaylogo: false,
  };

  Plotly.newPlot("donutPlot_yearCons", data, layout, config);
};

/*
// plot callback function
*/
function init_donutPlot_yearCons() {
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    cb_donutPlot_yearCons();
  } else {
    document.addEventListener("DOMContentLoaded", cb_donutPlot_yearCons);
  }
}

// init can be called on file loading since the diagram is not hidden
init_donutPlot_yearCons();
