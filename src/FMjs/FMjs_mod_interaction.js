// Interaction Layer for the mod_config object
// The following object updates the mod_config during page loading
// It holds the information on how the app is linked to the model in the wasm [Example: Which input in the gui will change which parameter in the fmu or which parameter from the fmu is displayed where in the gui as result]
// This is done to avoid updating the mod_config by hand every time the fmu is newly exported

/*
Further Information: 

ToDo rewrite to current implementation 

    - Setting Values in the fmu : 
    - string path to object of which the to be set value can be read
    - a function will read the value of this object an will store it for setting == > Any Object with atleast one child will work 
    == > Example:  
                  const app = {
                    set_at_fmu: {
                      a_amp: amp,
                      a_freq: freq,
                    },
                  };

FMI 2 Set Logic

     Causality        Variability        At FMU Export       On Initialization        After Do Step
     parameter          tunable               true                  true                   true
     parameter           fixed                true                  true                  false
     parameter          constant              true                  false                 false

      output                                 false                  false                 false

       input            discrete              true                  true                   true



Information propagation regarding time (stepSize, stopTime, startTime, etc.)

                                          ||===== reset of guiSetting with guiDefault =====||
                                          ||                                               v
mod_interaction == > [sets values at] guiDefault == > [creation of copy of guiDefault] guiSetting ==> [set value at ] mod_config == > "Model"
                                                                                           ^
                                                                                           ||
                                                                                        user Input Gui


*/

const mod_interaction = {
  //
  // OS
  //

  // mode: "oneShot",
  // stepSize: 10,
  // startTime: 0,
  // stopTime: 10,

  //
  // SRT
  //

  mode: "softRealTime",
  stepSize: 0.05,
  startTime: 0,
  stopTime: null,

  srtTickInterval_ms: 20,
  // tolerance: 1e-4,
  tolerance: 1e-8,

  roundOut_decP: 8,
  numbOfRequiredCombiTimeTables: 0,
  destroyOnReset: true, // changes reset settings, true seems a faster reset even tough the fmu is newly instatiated each time...
  variables: {
    par_PID_P: {
      setfmu_path2userObj: "guiSettings.input.pid_p.val",
    },
    par_PID_I: {
      setfmu_path2userObj: "guiSettings.input.pid_i.val",
    },
    par_PID_D: {
      setfmu_path2userObj: "guiSettings.input.pid_d.val",
    },

    // input for r1 or r2
    par_setPointCLC: {
      setfmu_path2userObj: "guiSettings.selectiveInput.rVal",
    },

    // input for s1 or s2
    par_setPointOLC: {
      setfmu_path2userObj: "guiSettings.selectiveInput.sVal",
    },

    // closed vs open loop controler
    par_isCLC: {
      setfmu_path2userObj: "guiSettings.selectiveInput.switch_is_r",
    },

    // dirac or step
    par_stepOrDirValvePos: {
      setfmu_path2userObj: "guiSettings.selectiveInput.stepOrDirValvePos",
    },
  },
};

//
// Updating the guiDefault with data from the interaction Layer
//
// function setData_Inter2guiDefault(paramArray) {
//   // console.log("setData_Inter2guiDefault");

//   // needs to be done because of loading order...
//   // updating default
//   for (let i = 0; i < paramArray.length; i++) {
//     if (_.has(guiDefault.input.simCtrl, paramArray[i])) {
//       // console.log(`Key ${paramArray[i]} is found in the guiDefault.simCtrl`);
//       _.set(
//         guiDefault.input.simCtrl,
//         paramArray[i] + ".val",
//         structuredClone(_.get(mod_interaction, paramArray[i]))
//       );
//     } else {
//       alert(
//         `ERROR: At the setData_Inter2guiDefault functino Key ${paramArray[i]} can NOT be found!`
//       );
//     }
//   }
// }

// setData_Inter2guiDefault(["stepSize", "startTime", "stopTime"]);

// Writing to gui
// not required because there is not a gui to change calculation parameters like timestep
// setDefaultAtGUI("input.simCtrl");

/*


//
// Updating the mod_config with the interaction layer can take place on page loading, at the end of this file
//


*/
function setInteractionParams() {
  // console.log("inside the set interactionparam function");
  // Loop Over all Childern of Object
  _.forOwn(mod_interaction, function (value, key) {
    // Update non "fmu-variables"

    // Model settings
    if (key != "variables") {
      if (_.has(mod_config, key)) {
        // console.log(`The Key ${key} is found`);
        _.set(mod_config, key, value);
      } else {
        alert(`ERROR: The Key ${key} can NOT be found in the mod_config!`);
      }
    }

    // Model variables
    if (key == "variables") {
      // looping through all variables to be set at the mod_config
      _.forOwn(mod_interaction.variables, function (value, key) {
        if (_.has(mod_config.variables, key)) {
          // console.log(`The fmu-variable Key ${key} is found`);
          key2path = key + ".setfmu_path2userObj";
          Path2Set = _.get(mod_interaction.variables, key2path);
          _.set(mod_config.variables, key2path, structuredClone(Path2Set));
        } else {
          alert(
            `ERROR: The fmu-variable Key ${key} can NOT be found in the mod_config!`
          );
        }
      });
    }
    // End of variables handling
  });
}
// updating
setInteractionParams();
