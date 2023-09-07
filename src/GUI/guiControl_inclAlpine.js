//
// Standard Object for gui control
//

gui_runCtrl = {
  isMobile: false, // set by alpine
};

//
// Start Alpine Scope
//
document.addEventListener("alpine:init", () => {
  // Variable definition
  Alpine.data("AppAlpineDataFunc", () => ({
    init() {
      this.gui.isMobile = window.innerWidth < 768;
      gui_runCtrl.isMobile = this.gui.isMobile;

      // Initializing default data
      // Makes intuitive to call the functions from here tough not sure why not done like that in the ige app
      setDefaultAtGUI_LevitatorApp("input");
    },

    gui: {
      mobOpen: false, // picture pop over
      isMobile: true, // mobile layout detection
      isPlay: false, // Play-Pause svg toggle

      // animation switch state
      switch: {
        is_s1: guiSettings.selectiveInput.switch_is_s1,
        is_r1: guiSettings.selectiveInput.switch_is_r1,
        is_r: guiSettings.selectiveInput.switch_is_r,
      },
    },

    checkDevice() {

      oldDevice=this.gui.isMobile;

      this.gui.isMobile = window.innerWidth < 768;
      // setting state in easy accessible variable
      gui_runCtrl.isMobile = this.gui.isMobile;


      if(oldDevice != this.gui.isMobile){
        updateAtDeviceToggle("input"); 
      }



      // console.log(`isMobile: ${this.gui.isMobile}`);
    },

    valvePosDirac: 1e-7,
    valvePosStep: 8e-5,
    lastValvePosWas1: true,

    diracFun() {
      console.log("Dirac request");
      // guiSettings.selectiveInput.stepOrDirValvePos=0.00001

      this.lastValvePosWas1 = guiSettings.selectiveInput.stepOrDirValvePos == 1;
      // // console.log(`lastValvePosWas1 = ${this.lastValvePosWas1}`);

      guiSettings.selectiveInput.stepOrDirValvePos = this.valvePosDirac;

      setTimeout(() => {
        if (this.lastValvePosWas1) {
          guiSettings.selectiveInput.stepOrDirValvePos = 1;
        } else {
          guiSettings.selectiveInput.stepOrDirValvePos = this.valvePosStep;
        }
      }, 200);
    },

    stepFun() {
      console.log("Step request");
      this.lastValvePosWas1 = guiSettings.selectiveInput.stepOrDirValvePos == 1;

      if (guiSettings.selectiveInput.stepOrDirValvePos == 1) {
        guiSettings.selectiveInput.stepOrDirValvePos = this.valvePosStep;
      } else {
        guiSettings.selectiveInput.stepOrDirValvePos = 1;
      }
    },
  }));
});

//
// End Alpine Scope
//

// // check window with
// window.addEventListener("resize", console.log("resized"));

function getCustomResizeEvent() {
  // small letter mf
  window.dispatchEvent(new CustomEvent("checksize"));
}

// Simulation Control Buttons
function trigger_play() {
  mod_runCtrl.softRealTime.playButton = true;
  mod_runCtrl.softRealTime.runAnimation = true;
}
function trigger_pause() {
  mod_runCtrl.softRealTime.pauseButton = true;
  mod_runCtrl.softRealTime.runAnimation = false;
}
function trigger_reset() {
  mod_runCtrl.softRealTime.resetButton = true;
  mod_runCtrl.softRealTime.runAnimation = false;
}
function trigger_simulation() {
  mod_runCtrl.oneShot.simulateButton = true;
}





/*












*/

//
// Function Calls for the defaults (defined in the guiDefault.js) are made after the page has loaded (html ids need to exist)
//
function setDefaultAtGUI_LevitatorApp(pathResObj) {
  //
  // Reseting the Data Object
  //
  // lodash get

  getGuiDefault = _.get(guiDefault, pathResObj);
  // lodash set (set guiDefault value at guiSetting)
  _.set(guiSettings, pathResObj, structuredClone(getGuiDefault));

  //
  // Refresh/ Init the Values in the GUI
  //
  // Loop Over all Childern of Object
  _.forOwn(_.get(guiDefault, pathResObj), function (value, key) {
    // If actual input ranges are used (on desktop) exclude this from the update function
    // Update all on Mobile (range inputs will be switched to input number) 
    // gui_runCtrl.isMobile
      // console.log(value.val);
      // console.log(value.id);
      // Update Values from default
      if (key.includes("slider")) {
        // add an M to the id for the mobile inputs (unique id) otherwise the desktop slider styling is applied to the input number fields
        // should be avoidable with x-if but this leads to other problems

        range=document.getElementById(`${value.id}M`);
        range.value = value.val*value.conversion;
        range.max = value.max*value.conversion;
        range.min = value.min*value.conversion;
        range.step = value.step*value.conversion;

      } else {
        document.getElementById(value.id).value = value.val;
      }
    // } else {
    //   // desktop: exlcude input range "sliders"

    //   if (!key.includes("slider")) {
    //     // console.log(value.val);
    //     // console.log(value.id);
    //     // Update Values from default
    //     document.getElementById(value.id).value = value.val;
    //   }
    // }
  });
}




function updateAtDeviceToggle(pathResObj){

   if(gui_runCtrl.isMobile){
    // set desktop values at now to be displayed mobile input
    console.log('Device has changed to mobile')

    // Loop Over all Childern of Object
    _.forOwn(_.get(guiSettings, pathResObj), function (value, key) {

      if (key.includes("slider")) {
            range=document.getElementById(`${value.id}M`);
            range.value = value.val*value.conversion;
          }
    });

   }else{
    // set mobile values at now to be displayed desktop input
    console.log('Device has changed to desktop')

    // Loop Over all Childern of Object
    _.forOwn(_.get(guiSettings, pathResObj), function (value, key) {

        if (key.includes("slider")) {
          range=document.getElementById(`${value.id}`);
          range.noUiSlider.set(value.val*value.conversion);
        }  
    });
   }
}; 




/*
// Setting user values from input type number fields
*/
function setUsrValue(id, path) {
  // console.log("Checkig user Input");
  // console.log(_.get(guiSettings, path));

  if(id.includes("slider") && id.includes("M")){
    usrVal = Number(document.getElementById(id).value); // Gets String number from Gui and converts it into float or integer

    idNew = id.replace(/M/g, "");
    conv=_.get(guiSettings, `input.${idNew}.conversion`)
    _.set(guiSettings, path, usrVal/conv); // Setting the number


  }else{
    usrVal = Number(document.getElementById(id).value); // Gets String number from Gui and converts it into float or integer
    _.set(guiSettings, path, usrVal); // Setting the number
  }




  // handling exceptions. Writing time values to mod config
  // check if its a simCtrl parameter
  // Example input to understand code below from html: x-on:change="setUsrValue('simCtrl_stepSize', 'input.simCtrl.stepSize.val')"

  if (id.includes("simCtrl_")) {
    path = id.replace(/simCtrl_/g, "");
    //get factor2seconds
    fact = _.get(guiSettings.input.simCtrl, path + ".factor2Seconds");
    _.set(mod_config, path, usrVal / fact); // Setting the number
    // console.log(mod_config); // check new
  }
}
