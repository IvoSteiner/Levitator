// look at all tabs in webpage...
// https://refreshless.com/nouislider/

/*


//
// Slider 1
//


*/
var updateIntervalTime = 100; // // time in ms, value depends on what one wants to debounce increase for cpu heavy code...

function initSlider1() {
  var range1 = document.getElementById("slider1");
  // Initializing input range
  noUiSlider.create(range1, {
    range: {
      min: guiSettings.input.slider1.min*1000,
      max: guiSettings.input.slider1.max*1000,
    },
    // padding: [0.05], // lower padding, i.e. the range 0-10 is displayed but not selectable
    step:  guiSettings.input.slider1.step*1000,
    connect: "lower",
    start: [guiSettings.input.slider1.val * 1000],
    behaviour: "tap",
    tooltips: false,
  });
  // range1 "update" throttling / debouncing
  let updateAllowed = true;
  setInterval(
    function () {
      updateAllowed = true;
    },
    updateIntervalTime // time in ms, value depends on what one wants to debounce increase for cpu heavy code...
  );
  // Binding signature https://refreshless.com/nouislider/events-callbacks/
  // update fire imediatly ==> debounce required
  // FYI values is an array containg the values of each handle. This is done since there can be multiple handles "sliderpoints"...
  // if only one handle is uesd handle=0 therfore values[handle]= values[0]...
  range1.noUiSlider.on("update", function (values, handle) {
    if (updateAllowed) {
      updateAllowed = false;
      // console.log(`Slider value ${values[handle]}`);
      guiSettings.input.slider1.val = parseFloat(
        math.round(values[handle]) / 1000
      );
      // guiUpdate();
      document.getElementById("textSlider1").innerHTML = math.round(
        guiSettings.input.slider1.val * 1000
      );
      // Recalculate Modell
      mod_runCtrl.oneShot.simulateButton = true;
    }
  });
  // end == > catich last and therefore effective requested value
  range1.noUiSlider.on("end", function (values, handle) {
    // console.log(`Slider value ${values[handle]}`);
    guiSettings.input.slider1.val = parseFloat(
      math.round(values[handle]) / 1000
    );
    document.getElementById("textSlider1").innerHTML = math.round(
      guiSettings.input.slider1.val * 1000
    );
    // Recalculate Modell
    mod_runCtrl.oneShot.simulateButton = true;
  });




//   range1.noUiSlider.on('updateDevice', function (values, handle) {
//     updateSliderValue.innerHTML = values[handle];
// });


}
// mainly waiting to have the data object ready during slider init...
if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSlider1();
} else {
  document.addEventListener("DOMContentLoaded", initSlider1);
}

/*


//
// END Slider 1
//


*/

/*


//
// Slider 2
//


*/

function initSlider2() {
  var range2 = document.getElementById("slider2");
  // Initializing input range
  noUiSlider.create(range2, {
    range: {
      min: guiSettings.input.slider2.min*1000,
      max: guiSettings.input.slider2.max*1000,
    },
    // padding: [0.05], // lower padding, i.e. the range 0-10 is displayed but not selectable
    step:  guiSettings.input.slider2.step*1000,
    connect: "lower",
    start: [guiSettings.input.slider2.val * 1000],
    behaviour: "tap",
    tooltips: false,
  });
  // range2 "update" throttling / debouncing
  let updateAllowed = true;
  setInterval(
    function () {
      updateAllowed = true;
    },
    updateIntervalTime // time in ms, value depends on what one wants to debounce increase for cpu heavy code...
  );
  // Binding signature https://refreshless.com/nouislider/events-callbacks/
  // update fire imediatly ==> debounce required
  // FYI values is an array containg the values of each handle. This is done since there can be multiple handles "sliderpoints"...
  // if only one handle is uesd handle=0 therfore values[handle]= values[0]...
  range2.noUiSlider.on("update", function (values, handle) {
    if (updateAllowed) {
      updateAllowed = false;
      // console.log(`Slider value ${values[handle]}`);
      guiSettings.input.slider2.val = parseFloat(
        math.round(values[handle]) / 1000
      ); // save m
      // guiSettings.input.slider2.val = 1000;
      // guiUpdate();
      document.getElementById("textSlider2").innerHTML = math.round(
        guiSettings.input.slider2.val * 1000
      ); // display mm
      // Recalculate Modell
      // mod_runCtrl.oneShot.simulateButton = true;
    }
  });
  // end == > catich last and therefore effective requested value
  range2.noUiSlider.on("end", function (values, handle) {
    guiSettings.input.slider2.val = parseFloat(
      math.round(values[handle]) / 1000
    ); // save m
    document.getElementById("textSlider2").innerHTML =
      guiSettings.input.slider2.val * 1000; // display mm

    // Recalculate Modell
    // mod_runCtrl.oneShot.simulateButton = true;
  });
}
// mainly waiting to have the data object ready during slider init...
if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSlider2();
} else {
  document.addEventListener("DOMContentLoaded", initSlider2);
}

/*


//
// END Slider 2
//


*/

/*


//
// Slider 3
//


*/

function initSlider3() {
  var range3 = document.getElementById("slider3");
  // Initializing input range
  noUiSlider.create(range3, {
    range: {
      min: guiSettings.input.slider3.min,
      max: guiSettings.input.slider3.max,
    },
    // padding: [0.05], // lower padding, i.e. the range 0-10 is displayed but not selectable
    step:  guiSettings.input.slider3.step,
    connect: "lower",
    start: [guiSettings.input.slider3.val],
    behaviour: "tap",
    tooltips: false,
  });
  // range3 "update" throttling / debouncing
  let updateAllowed = true;
  setInterval(
    function () {
      updateAllowed = true;
    },
    updateIntervalTime // time in ms, value depends on what one wants to debounce increase for cpu heavy code...
  );
  // Binding signature https://refreshless.com/nouislider/events-callbacks/
  // update fire imediatly ==> debounce required
  // FYI values is an array containg the values of each handle. This is done since there can be multiple handles "sliderpoints"...
  // if only one handle is uesd handle=0 therfore values[handle]= values[0]...
  range3.noUiSlider.on("update", function (values, handle) {
    if (updateAllowed) {
      updateAllowed = false;
      // console.log(`Slider value ${values[handle]}`);
      guiSettings.input.slider3.val = parseFloat(math.round(values[handle]));
      // guiUpdate();
      document.getElementById("textSlider3").innerHTML = math.round(
        guiSettings.input.slider3.val
      );

      // Recalculate Modell
      mod_runCtrl.oneShot.simulateButton = true;
    }
  });
  // end == > catich last and therefore effective requested value
  range3.noUiSlider.on("end", function (values, handle) {
    // console.log(`Slider value ${values[handle]}`);

    guiSettings.input.slider3.val = parseFloat(math.round(values[handle]));
    document.getElementById("textSlider3").innerHTML =
      guiSettings.input.slider3.val;

    // Recalculate Modell
    mod_runCtrl.oneShot.simulateButton = true;
  });
}
// mainly waiting to have the data object ready during slider init...
if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSlider3();
} else {
  document.addEventListener("DOMContentLoaded", initSlider3);
}

/*


//
// END Slider 3
//


*/

/*


//
// Slider 4
//


*/

function initSlider4() {
  var range4 = document.getElementById("slider4");
  // Initializing input range
  noUiSlider.create(range4, {
    range: {
      min: guiSettings.input.slider4.min,
      max: guiSettings.input.slider4.max,
    },
    // padding: [0.05], // lower padding, i.e. the range 0-10 is displayed but not selectable
    step:  guiSettings.input.slider4.step,
    connect: "lower",
    start: [guiSettings.input.slider4.val],
    behaviour: "tap",
    tooltips: false,
  });
  // range4 "update" throttling / debouncing
  let updateAllowed = true;
  setInterval(
    function () {
      updateAllowed = true;
    },
    updateIntervalTime // time in ms, value depends on what one wants to debounce increase for cpu heavy code...
  );
  // Binding signature https://refreshless.com/nouislider/events-callbacks/
  // update fire imediatly ==> debounce required
  // FYI values is an array containg the values of each handle. This is done since there can be multiple handles "sliderpoints"...
  // if only one handle is uesd handle=0 therfore values[handle]= values[0]...
  range4.noUiSlider.on("update", function (values, handle) {
    if (updateAllowed) {
      updateAllowed = false;
      // console.log(`Slider value ${values[handle]}`);
      guiSettings.input.slider4.val = parseFloat(math.round(values[handle]));
      // guiUpdate();
      document.getElementById("textSlider4").innerHTML = math.round(
        guiSettings.input.slider4.val
      );
      // Recalculate Modell
      mod_runCtrl.oneShot.simulateButton = true;
    }
  });
  // end == > catich last and therefore effective requested value
  range4.noUiSlider.on("end", function (values, handle) {
    // console.log(`Slider value ${values[handle]}`);
    guiSettings.input.slider4.val = parseFloat(math.round(values[handle]));
    document.getElementById("textSlider4").innerHTML =
      guiSettings.input.slider4.val;
    // Recalculate Modell
    mod_runCtrl.oneShot.simulateButton = true;
  });
}
// mainly waiting to have the data object ready during slider init...
if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSlider4();
} else {
  document.addEventListener("DOMContentLoaded", initSlider4);
}

/*


//
// END Slider 4
//


*/

/*


//
// Slider 5
//


*/

function initSlider5() {
  var range5 = document.getElementById("slider5");
  // Initializing input range
  noUiSlider.create(range5, {
    range: {
      min: guiSettings.input.slider5.min,
      max: guiSettings.input.slider5.max,
    },
    // padding: [0.05], // lower padding, i.e. the range 0-10 is displayed but not selectable
    step:  guiSettings.input.slider5.step,
    connect: "lower",
    start: [guiSettings.input.slider5.val],
    behaviour: "tap",
    tooltips: false,
  });
  // range5 "update" throttling / debouncing
  let updateAllowed = true;
  setInterval(
    function () {
      updateAllowed = true;
    },
    updateIntervalTime // time in ms, value depends on what one wants to debounce increase for cpu heavy code...
  );
  // Binding signature https://refreshless.com/nouislider/events-callbacks/
  // update fire imediatly ==> debounce required
  // FYI values is an array containg the values of each handle. This is done since there can be multiple handles "sliderpoints"...
  // if only one handle is uesd handle=0 therfore values[handle]= values[0]...
  range5.noUiSlider.on("update", function (values, handle) {
    if (updateAllowed) {
      updateAllowed = false;
      // console.log(`Slider value ${values[handle]}`);
      guiSettings.input.slider5.val = parseFloat(math.round(values[handle]));
      // guiUpdate();
      document.getElementById("textSlider5").innerHTML = math.round(
        guiSettings.input.slider5.val
      );
      // Recalculate Modell
      mod_runCtrl.oneShot.simulateButton = true;
    }
  });
  // end == > catch last and therefore effective requested value
  range5.noUiSlider.on("end", function (values, handle) {
    guiSettings.input.slider5.val = parseFloat(math.round(values[handle]));
    document.getElementById("textSlider5").innerHTML =
      guiSettings.input.slider5.val;
    // Recalculate Modell
    mod_runCtrl.oneShot.simulateButton = true;
  });
}

// mainly waiting to have the data object ready during slider init...
if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSlider5();
} else {
  document.addEventListener("DOMContentLoaded", initSlider5);
}

/*


//
// END Slider 5
//


*/
