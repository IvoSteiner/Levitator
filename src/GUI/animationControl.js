/*
Currently used: svg.js more than engouh for simple stuff
Alternatives: https://blog.bitsrc.io/top-5-javascript-libraries-for-svg-animation-30677ad9c937
Adobe animate (Can do all but realy cumbersome)

// if more advanced js lib required. check out greensock animation gsap.js


*/

const Ball = document.getElementById("Ball");

// // old
// const ImpScale = document.getElementById("Impeller");
// const ImpRot = document.getElementById("ImpRot");

// new
const PCfan = document.getElementById("PCfan");
const PCImpeller = document.getElementById("PCImpeller");

// creating an svg.js element
var ball = SVG(Ball);

// var fanScale = SVG(ImpScale);
// var fan = SVG(ImpRot);

var pcfanScale = SVG(PCfan);
var pcfan = SVG(PCImpeller);

// var test = 0;

setInterval(function () {
  if (mod_runCtrl.softRealTime.runAnimation && !_.isEmpty(mod_autoOutput)) {
    // old
    // can be done more like the flow runner...
    // fanScale.transform({
    //   scaleY: 0.4,
    // });
    // fan.rotate(15);

    // new
    // can be done more like the flow runner...
    pcfanScale.transform({
      scaleY: 0.5,
    });

    relSpeed=1-(11000-mod_autoOutput.res_setUFanEff.current)/(11200);
    if(mod_autoOutput.res_setUFanEff.current==0){
      animSpeed=0
    }else{
    animSpeed=(30-5)*relSpeed;}
    pcfan.rotate(animSpeed);


    // test += 0.1;
    // xpos = -200 - 100 * Math.sin(test);

    xRelPos = (mod_autoOutput.res_height.current * 1000) / (260 - 0); // decimal position based on simulator data
    xPos = (-555 - 0) * xRelPos; // Calculating animation pixel value for corresponding position
    ball.transform({
      // rotate: 90 - (90 * data.general.throttleValue) / 100,
      // translateX: 50,
      translateY: xPos,
      // scale: 1
    });
  }
}, (1 / 24) * 1000);

// setInterval(function () {
//   // updating text values in svg
//   document.getElementById(
//     "txtVolF"
//   ).innerHTML = `${guiSettings.anim.text.v_Flow} l / min`;

//   document.getElementById(
//     "txtValOp"
//   ).innerHTML = `opening ${guiSettings.anim.text.TL1_valveOp} %`;

//   document.getElementById(
//     "txtTemp"
//   ).innerHTML = `${guiSettings.anim.text.T_water} °C`;

//   document.getElementById(
//     "txtDp"
//   ).innerHTML = `${guiSettings.anim.text.TL1_dp} mbar`;

//   document.getElementById(
//     "txtRpm"
//   ).innerHTML = `Speed ${guiSettings.anim.text.TL1_rpm} rpm`;

//   document.getElementById(
//     "txtTorq"
//   ).innerHTML = `Torque ${guiSettings.anim.text.TL1_torque} Nm`;

//   document.getElementById(
//     "txtElP"
//   ).innerHTML = `${guiSettings.anim.text.TL1_El_P} W`;
//   // Dont use too high refresh rate in order to avoid flickering data output of higher decimal places
// }, (1 / 5) * 1000);

// gets called form the gui update function
// function getModelResults4Anim() {
//   guiSettings.anim.text.v_Flow = math.format(
//     math.round(mod_autoOutput.res_v_Flow.current * 10 ** 3 * 60, 6),
//     {
//       notation: "fixed",
//       precision: 1,
//     }
//   );
//   guiSettings.anim.text.TL1_valveOp = math.format(
//     math.round(mod_autoOutput.par_TL1_valveOpen.current * 100, 6),
//     {
//       notation: "fixed",
//       precision: 0,
//     }
//   );

//   guiSettings.anim.text.T_water = math.format(
//     math.round(mod_autoOutput.res_T_water.current - 273.15, 6),
//     {
//       notation: "fixed",
//       precision: 2,
//     }
//   );

//   guiSettings.anim.text.TL1_dp = math.format(
//     math.round((mod_autoOutput.res_TL1_dp.current / 10 ** 5) * 10 ** 3, 6),
//     {
//       notation: "fixed",
//       precision: 0,
//     }
//   );

//   guiSettings.anim.text.TL1_rpm = math.format(
//     math.round(mod_autoOutput.par_TL1_speed.current, 6),
//     {
//       notation: "fixed",
//       precision: 0,
//     }
//   );

//   guiSettings.anim.text.TL1_torque = math.format(
//     math.round(mod_autoOutput.res_TL1_torque.current, 6),
//     {
//       notation: "fixed",
//       precision: 3,
//     }
//   );

//   guiSettings.anim.text.TL1_El_P = math.format(
//     math.round(mod_autoOutput.res_TL1_El_P.current, 6),
//     {
//       notation: "fixed",
//       precision: 0,
//     }
//   );
// }
