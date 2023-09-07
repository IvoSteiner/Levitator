// these values need to be place in a suitable object
var tps = 1 / 24; // Ticks per second in Miliseconds
var rollingThreshold = 20; // Time in Seconds until the rolling frame diagram starts

setInterval(function () {
  // viewport properties calculation
  plotly_1vh = (window.innerHeight * 1) / 100;
  plotly_1wh = (window.innerWidth * 1) / 100;
  isLandscape = !window.matchMedia("(orientation: portrait)").matches;

  // case 1,  no results yet, do nothing
  if (!_.isEmpty(mod_autoOutput)) {
    // local array listing the requested data to be displayed
    var datReq = [mod_autoOutput.res_setUFanEff.allPrev.map((i) =>Math.round(i*1000)/1000)];

    var data_update = {};

    if (mod_autoOutput.SimTime.current <= rollingThreshold) {
      // case 2, results build up
      time = mod_autoOutput.SimTime.allPrev;
      data_update.x = [time, time];
      data_update.y = [datReq[0]];
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
      data_update.y = [datReq[0].slice(startIndex, datReq[0].length)];
    }


    // Alternatively with lodash min=_.min(datReq[0])

    min=Math.min(...data_update.y[0]);
    max=Math.max(...data_update.y[0]);
    pad=Math.max((max-min)*0.1, 10); 



    var layout = {
      // autosize: true,
      margin: {
        l: isLandscape ? 3.5 * plotly_1wh : 7 * plotly_1wh,
        r: 0,
        b: 6 * plotly_1vh,
        t: 2 * plotly_1vh,
        pad: 4,
      },
      showlegend: false,

      legend: {
        x: 0.85,
        y: 1,
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
        title: { text: `u [rpm]`, standoff: 20 },

        range: [min-pad,max+pad],
      },
    };

    Plotly.update("fanInput_plot", data_update, layout); //  Plotly.update('fanInput_plot', updateData, layout, [0]); [0] the last array specifies the trace (indices) to be updatet
  }
  // no code if mod_autoOutput is empty
}, tps * 1000);

// initialize plot
var cb_fanInput_plot = function () {
  let plot = document.getElementById("fanInput_plot");
  let layout = {
    autosize: true,
    margin: { l: 80, r: 0, b: 60, t: 20, pad: 4 },
    showlegend: false,

    legend: {
      x: 0.85,
      y: 1,
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
      title: `u [rpm]`,
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
    name: "u",
  };

  // var trace2 = {
  //   x: [0],
  //   y: [0],
  //   mode: "lines",
  //   line: { color: "#990000" },
  //   name: "Test2",
  // };

  var initData = [trace1];

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
  cb_fanInput_plot();
} else {
  document.addEventListener("DOMContentLoaded", cb_fanInput_plot);
}
