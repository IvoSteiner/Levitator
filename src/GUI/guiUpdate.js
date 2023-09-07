/*




*/

var test = 0;
setInterval(function () {
  // ensuring the mod_runCtrl is loaded before evaluation
  if (typeof mod_runCtrl !== "undefined") {
    // Get Plot Update Function corresponding to Runtime Method //
    if (
      mod_config.mode === "softRealTime" &&
      mod_runCtrl.softRealTime.dispResults
    ) {
      // updating selective slider inputs

      // test += 0.1;
      // guiSettings.selectiveInput.rVal = 0.13 + 0.05 * Math.sin(test);

      if (guiSettings.selectiveInput.switch_is_r1) {
        guiSettings.selectiveInput.rVal = guiSettings.input.slider1.val;
      } else {
        guiSettings.selectiveInput.rVal = guiSettings.input.slider2.val;
      }

      if (guiSettings.selectiveInput.switch_is_s1) {
        guiSettings.selectiveInput.sVal = guiSettings.input.slider3.val;
      } else {
        guiSettings.selectiveInput.sVal = guiSettings.input.slider4.val;
      }
    }

    // checking if there are results to be displayed in the oneShot simulation method
    if (mod_config.mode === "oneShot" && mod_runCtrl.oneShot.dispResults) {
      mod_runCtrl.oneShot.dispResults = false;
    }
  }
}, (1 / 100) * 1000);

// // Detect orientation change in JavaScript == > force plotly update
// const portrait = window.matchMedia("(orientation: portrait)");
// portrait.addEventListener("change", (event) => {
//   // if (event.matches) {
//   //   console.log("Device orientation is Portrait");
//   // } else {
//   //   console.log("Device orientation is Landscape");
//   // }
//   function delayedUpdate() {
//     // results aviable
//     if (_.isEmpty(mod_autoOutput)) {
//       init_donutPlot_yearProd();
//       init_donutPlot_yearCons();
//     } else {
//       // no results aviable
//       donutPlot_yearProd_Update();
//       donutPlot_yearCons_Update();
//     }
//   }
//   setTimeout(delayedUpdate, 200); // delay the update otherwise plotly fucks up since it doesnt know the parent div size
// });

// function guiTextUpdate() {
//   // Loop Over all Childern of Object
//   _.forOwn(guiSettings.textOutput.yearValOut, function (value, key) {
//     // Writing Results to guiSettings object as strings to overwrite default (blank) text string
//     guiSettings.textOutput.yearValOut[key].val = math.format(
//       math.round(mod_autoOutput[key].current, 6),
//       {
//         notation: "fixed",
//         precision: 0,
//       }
//     );
//     // Displaying Strings from guiSettings object at the gui
//     writeText2Gui();
//   });
// }

// function writeText2Gui() {
//   // Displaying default or updated strings from guiSettings object at the gui
//   _.forOwn(guiSettings.textOutput.yearValOut, function (value, key) {
//     // looping over array with id strings (allows outputting the same value at more than one place) [alternatively try class instead of id... never worked in the past, have not tried again]
//     for (let i = 0; i < value.id.length; i++) {
//       document.getElementById(value.id[i]).innerHTML =
//         guiSettings.textOutput.yearValOut[key].val;
//     }
//   });
// }

// writeText2Gui();
