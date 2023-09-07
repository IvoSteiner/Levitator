// these values need to be place in a suitable object
var tps = 1 / 24; // Ticks per second in Miliseconds
var rollingThreshold = 20; // Time in Seconds until the rolling frame diagram starts

setInterval(function () {
  // viewport properties calculation
  plotly_1vh = (window.innerHeight * 1) / 100;
  plotly_1wh = (window.innerWidth * 1) / 100;
  isLandscape = !window.matchMedia("(orientation: portrait)").matches;

  // console.log(`plotly 1vh=${plotly_1vh}`);
  // console.log(`plotly 1wh=${plotly_1wh}`);
  // console.log(`Device is in landscape mode: ${isLandscape}`);

  // case 1,  no results yet, do nothing
  if (!_.isEmpty(mod_autoOutput)) {
    // local array listing the requested data to be displayed
    // converting to mm
    // rounding to 2 decimal places
    var datReq = [mod_autoOutput.res_height.allPrev.map((i) =>Math.round(i * 1000*1000)/1000), mod_autoOutput.res_setHeightCLC.allPrev.map((i) =>Math.round(i * 1000*1000)/1000)];

    var data_update = {};

    if (mod_autoOutput.SimTime.current <= rollingThreshold) {
      // case 2, results build up
      time = mod_autoOutput.SimTime.allPrev;
      data_update.x = [time, time];
      data_update.y = [
        datReq[0],
        datReq[1],
      ];
    } else {
      // case 3, rolling diagram
      let startTimeDispArray = math.round(
        mod_autoOutput.SimTime.current - rollingThreshold,
        6
      );
      // first element in SimTime biggerEqual request
      inSimTimeArray = _.find(mod_autoOutput.SimTime.allPrev, function (n) {
        if (n >= startTimeDispArray) {
          return true;
        }
      });
      // index of this value in SimTime Array .indexOf
      startIndex = mod_autoOutput.SimTime.allPrev.indexOf(inSimTimeArray);
      timeRol = mod_autoOutput.SimTime.allPrev.slice(
        startIndex,
        mod_autoOutput.SimTime.allPrev.length
      );

      // get requested range from results
      data_update.x = [timeRol, timeRol];
      data_update.y = [
        datReq[0].slice(startIndex, datReq[0].length),
        datReq[1].slice(startIndex, datReq[0].length),
      ];
    }

    //         l: 4 *  plotly_1wh ,

    var layout = {
      margin: {
        l: isLandscape ? 3.5 * plotly_1wh : 7 * plotly_1wh,
        r: 0,
        b: 6 * plotly_1vh,
        t: 2 * plotly_1vh,
        pad: 0,
      },
      showlegend: true,

      legend: {
        x: 0.75,
        y: 1,
        orientation: "h",
        font: {
          size: plotly_1vh * 2,
        },
      },

      font: {
        family: "FSAlbert, Arial",
        size: plotly_1vh * 1.5,
        color: "#000000",
      },

      yaxis: {
        automargin: true,
        showticklabels: true,

        type: "linear",
        title: { text: `h [mm]`, standoff: 20 },
        range: [0, 270],
      },
    };

    Plotly.update("height_plot", data_update, layout); //  Plotly.update('height_plot', updateData, layout, [0]); [0] the last array specifies the trace (indices) to be updatet
  }
  // no code if mod_autoOutput is empty
}, tps * 1000);

// initialize plot
var cb_height_plot = function () {
  let plot = document.getElementById("height_plot");
  let layout = {
    autosize: true,
    margin: { l: 80, r: 0, b: 60, t: 20, pad: 4 },
    showlegend: true,

    legend: {
      x: 0.78,
      y: 1,
      orientation: "h",
      font: {
        size: 25,
      },
    },

    font: {
      family: "FSAlbert, Arial",
      size: 17.7,

      color: "#000000",
    },

    xaxis: {
      title: `t [s]`,
      showticklabels: true,
    },

    yaxis: {
      showticklabels: true,

      type: "linear",
      title: `h [mm]`,
      range: [0, 0.03],

      // tickmode: "auto",
      // nticks: 10,
      // tickfont: {
      //   color: "#3C7093",
      // },
      // https://www.color-hex.com/
      // https://www.color-hex.com/color-palette/1021961
      // gridcolor: "#cfe2f3",
    },
  };

  var trace1 = {
    x: [0],
    y: [0],
    mode: "lines",
    line: { color: "#80CAF6" },
    name: "y",
  };

  var trace2 = {
    x: [0],
    y: [0],
    mode: "lines",
    line: { color: "#990000" },
    name: "r",
  };

  var initData = [trace1, trace2];

  let config = {
    responsive: true,
    displayModeBar: false,
    displaylogo: false,
  };

  Plotly.newPlot(plot, initData, layout, config);
};

/*
  // plot callback function
  */

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  cb_height_plot();
} else {
  document.addEventListener("DOMContentLoaded", cb_height_plot);
}
