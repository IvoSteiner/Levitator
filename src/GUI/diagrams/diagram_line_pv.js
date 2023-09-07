function linePlot_pv_Update() {
  let upTraces = [
    mod_autoOutput.res_P_pvCells_1_.allPrev,
    mod_autoOutput.res_P_pvCells_2_.allPrev,
    mod_autoOutput.res_P_pvCells_3_.allPrev,
    mod_autoOutput.res_P_pvCells_4_.allPrev,
    mod_autoOutput.res_P_pvCells_5_.allPrev,
    mod_autoOutput.res_P_pvCells_6_.allPrev,
  ];

  let plotTime = [
    mod_autoOutput.SimDateTime.allPrev,
    mod_autoOutput.SimDateTime.allPrev,
    mod_autoOutput.SimDateTime.allPrev,
    mod_autoOutput.SimDateTime.allPrev,
    mod_autoOutput.SimDateTime.allPrev,
    mod_autoOutput.SimDateTime.allPrev,
  ];

  let data_update = {
    x: plotTime,
    y: upTraces,
  };

  // for oneShot Simulations it is neccesary to set the initial range again because on the plot init the range can not be set without data
  xRange = [
    app.gui.weekArray[guiSettings.inputRange.val],
    app.gui.weekArray[guiSettings.inputRange.val + 1],
  ];

  legendStyle = {};
  if (window.screen.width < 780) {
    console.log("Mobile Screen");
    legendStyle = {
      orientation: "h",
      x: -0.02,
      y: 1.08,
    };
  } else {
    legendStyle = {
      orientation: "h",
      x: -0.02,
      y: 1.08,
    };
  }

  let layout = {
    legend: legendStyle,
    // xaxis
    xaxis: {
      range: xRange, // Initial Range
      rangeselector: {
        buttons: [
          {
            count: 7,
            label: "Woche",
            step: "day",
            stepmode: "backward",
          },
          {
            count: 1,
            label: "Monat",
            step: "month",
            stepmode: "backward",
          },
          {
            count: 1,
            label: "Jahr",
            step: "all",
            stepmode: "backward",
          },
        ],
      },

      rangeslider: {
        range: ["1970-01-01 00:00:00", "1971-01-01 00:00:00"],
        // bgcolor: '#000',
        visible: true,
        thickness: 0.03,
        bordercolor: "#000",
        borderwidth: 1,
      },

      type: "date",

      tickformatstops: [
        {
          // Miliseconds
          dtickrange: [null, 1000],
          value: " ",
        },
        {
          // 1 to 60 s
          dtickrange: [1000, 60000],
          value: "%d.%m %H:%M:%S s",
        },
        {
          // 1 min to 60 min
          dtickrange: [60000, 3600000],
          value: "%d.%m  %H:%M",
        },
        {
          // 1h to 24 h
          dtickrange: [3600000, 80000000],
          value: "%d %b. %H:%M",
        },
        {
          // 1 day to 7 days
          dtickrange: [80000000, 604800000],
          value: "%d %b.",
        },
        {
          // 1 Week to a Month
          dtickrange: [604800000, "M1"],
          value: "%b.",
        },
        {
          // 1 Month to 12 Month
          dtickrange: ["M1", "M12"],
          value: "%B",
        },
        {
          // 1 Year and bigger
          dtickrange: ["M15", null],
          value: " ",
        },
      ],
    },
  };

  Plotly.update("linePlot_pv", data_update, layout); //  Plotly.update('linePlot', updateData, layout, [0]); [0] the last array specifies the trace (indices) to be updatet
}

// initialize plot
var cb_linePlot_pv = function () {
  // let plot = document.getElementById('linePlot');

  xRange = [
    app.gui.weekArray[guiSettings.inputRange.val],
    app.gui.weekArray[guiSettings.inputRange.val + 1],
  ];

  legendStyle = {};
  if (window.screen.width < 780) {
    console.log("Mobile Screen");
    legendStyle = {
      orientation: "h",
      x: -0.02,
      y: 1.08,
    };
  } else {
    legendStyle = {
      orientation: "h",
      x: -0.02,
      y: 1.08,
    };
  }
  let layout = {
    // see function which creates the day shading
    shapes: app.gui.dayShadedShapes,

    autosize: true,
    margin: { l: 35, r: 10, b: 10, t: 5, pad: 4 },
    // yaxis: { range: [-10, 10] },
    // Legende
    showlegend: true,
    legend: legendStyle,

    // xaxis
    xaxis: {
      // autorange: true, // range is set in order to show whole dataset
      range: xRange, // Initial Range
      rangeselector: {
        buttons: [
          {
            count: 7,
            label: "Woche",
            step: "day",
            stepmode: "backward",
          },
          {
            count: 1,
            label: "Monat",
            step: "month",
            stepmode: "backward",
          },
          {
            count: 1,
            label: "Jahr",
            step: "all",
            stepmode: "backward",
          },
        ],
      },

      rangeslider: {
        range: ["1970-01-01 00:00:00", "1971-01-01 00:00:00"],
        // bgcolor: '#000',
        visible: true,
        thickness: 0.03,
        bordercolor: "#000",
        borderwidth: 1,
      },
      type: "date",

      tickformatstops: [
        {
          // Miliseconds
          dtickrange: [null, 1000],
          value: "get a hobby in miliseconds",
        },
        {
          // 1 to 60 s
          dtickrange: [1000, 60000],
          value: "%d.%m %H:%M:%S s",
        },
        {
          // 1 min to 60 min
          dtickrange: [60000, 3600000],
          value: "%d.%m  %H:%M",
        },
        {
          // 1h to 24 h
          dtickrange: [3600000, 80000000],
          value: "%d %b. %H:%M",
        },
        {
          // 1 day to 7 days
          dtickrange: [80000000, 604800000],
          value: "%d %b.",
        },
        {
          // 1 Week to a Month
          dtickrange: [604800000, "M1"],
          value: "%b.",
        },
        {
          // 1 Month to 12 Month
          dtickrange: ["M1", "M12"],
          value: "%B",
        },
        {
          // 1 Year and bigger
          dtickrange: ["M15", null],
          value: " ",
        },
      ],
    },

    yaxis: {
      autorange: true,
      // range: [0, 500],
      type: "linear",
    },
  };

  let config = {
    responsive: true,
    // displayModeBar: true,
    // 'resetscale'
    modeBarButtonsToRemove: ["toImage", "sendDataToCloud", "autoscale"],
    displaylogo: false,
  };

  // Plotly interpolation options: https://plotly.com/javascript/line-charts/#line-shape-options-for-interpolation
  // curves/ real   == > spline; line: { color: '#ffa502', shape: 'spline' },
  // boolean/ integer        == > line: { color: '#ff4757', shape: 'hv' },

  let trace1 = {
    type: "scattergl",
    x: [0],
    y: [0],
    mode: "lines",
    line: { color: guiSettings.diagrams.colors.blue, shape: "linear" },
    name: "PV-Anlage 1",
  };

  let trace2 = {
    type: "PV-Anlage 2",
    x: [0],
    y: [0],
    mode: "lines",
    line: { color: guiSettings.diagrams.colors.green, shape: "linear" },
    name: "PV-Anlage 2",
  };

  let trace3 = {
    type: "scattergl",
    x: [0],
    y: [0],
    mode: "lines",
    line: { color: guiSettings.diagrams.colors.orange, shape: "linear" },
    name: "PV-Anlage 3",
  };

  let trace4 = {
    type: "scattergl",
    x: [0],
    y: [0],
    mode: "lines",
    line: { color: guiSettings.diagrams.colors.lightblue, shape: "linear" },
    name: "PV-Anlage 4",
  };

  let trace5 = {
    type: "scattergl",
    x: [0],
    y: [0],
    mode: "lines",
    line: { color: guiSettings.diagrams.colors.lightgreen, shape: "linear" },
    name: "PV-Anlage 5",
  };

  let trace6 = {
    type: "scattergl",
    x: [0],
    y: [0],
    mode: "lines",
    line: { color: guiSettings.diagrams.colors.grey, shape: "linear" },
    name: "PV-Anlage 6",
  };

  var initData = [trace1, trace2, trace3, trace4, trace5, trace6];
  Plotly.newPlot("linePlot_pv", initData, layout, config);
};

/*
// plot callback function
*/

function init_linePlot_pv() {
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    cb_linePlot_pv();
  } else {
    document.addEventListener("DOMContentLoaded", cb_linePlot_pv);
  }
}
