function setup_fmuOnStart() {
  setup_fmu_functions();
  // The fmu is now ready for manipulations
  // Dont try to upload files before this point
  mod_runCtrl.fmu2Ready = true;

  setup_fmu_instance();
  setup_fmu_experiment();
}

function setup_fmuOnReset() {
  setup_fmu_experiment();
}

function setup_fmu_functions() {
  /*
  
  
  
  // Function definitions to call the exported fmi functions
  
  
  
  */

  snprintf = Module.cwrap("snprintf", "number", [
    "number",
    "number",
    "number",
    "number",
  ]);
  createFmi2CallbackFunctions = Module.cwrap(
    "createFmi2CallbackFunctions",
    "number",
    ["number"]
  );
  let prefix = mod_config.modelName; // The leading _ in front of the Modelname (used in the C code) is omited in the js
  let separator = "_";
  if (typeof Module["_fmi2GetVersion"] === "function") {
    prefix = "";
    separator = "";
  }
  fmi2GetVersion = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2GetVersion"),
    "string"
  );
  fmi2GetTypesPlatform = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2GetTypesPlatform"),
    "string"
  );
  fmi2Instantiate = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2Instantiate"),
    "number",
    ["string", "number", "string", "string", "number", "number", "number"]
  );
  fmi2SetupExperiment = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2SetupExperiment"),
    "number",
    ["number", "number", "number", "number", "number", "number"]
  );
  fmi2Reset = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2Reset"),
    "number",
    ["number"]
  );
  // trial, check again
  fmi2CancelStep = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2CancelStep"),
    "number",
    ["number"]
  );
  fmi2FreeInstance = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2FreeInstance"),
    "number",
    ["number"]
  );
  fmi2EnterInitializationMode = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2EnterInitializationMode"),
    "number",
    ["number"]
  );
  fmi2ExitInitializationMode = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2ExitInitializationMode"),
    "number",
    ["number"]
  );
  // Output: fmi2Status, Functionname: fmi2GetReal FunctionInput(fmi2Component c, const fmi2ValueReference vr[], sizet nvr, fmi2Real value[]);
  fmi2GetReal = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2GetReal"),
    "number",
    ["number", "number", "number", "number"]
  );
  fmi2SetReal = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2SetReal"),
    "number",
    ["number", "number", "number", "number"]
  );
  fmi2GetBoolean = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2GetBoolean"),
    "number",
    ["number", "number", "number", "number"]
  );
  fmi2SetBoolean = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2SetBoolean"),
    "number",
    ["number", "number", "number", "number"]
  );
  fmi2GetInteger = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2GetReal"),
    "number",
    ["number", "number", "number", "number"]
  );
  fmi2SetInteger = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2SetReal"),
    "number",
    ["number", "number", "number", "number"]
  );
  fmi2GetString = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2GetString"),
    "number",
    ["number", "number", "number", "number"]
  );
  fmi2SetString = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2SetString"),
    "number",
    ["number", "number", "number", "number"]
  );
  fmi2DoStep = Module.cwrap(
    "".concat(prefix).concat(separator, "fmi2DoStep"),
    "number",
    ["number", "number", "number", "number"]
  );
}

function setup_fmu_instance() {
  /*

  // This is a pointer to an FMU specific data structure that contains the information needed to process the model equations 
      or to process the co-simulation of the respective slave. (Page 16 fmi2 standard)

  */
  const callBackFunctions = createFmi2CallbackFunctions();

  mod_config.fmi2_component = {};

  fmuNameString = mod_config.modelName.split("_").join(".");

  // console.log('Check fmi Version, i.e. is there an fmu to talk to');
  // console.log(fmi2GetVersion());

  mod_config.fmi2_component = fmi2Instantiate(
    mod_config.modelName,
    mod_config.fmi2CoSimulation,
    mod_config.guid,
    "file:///fmu",
    callBackFunctions,
    true,
    true
  );

  // console.log(
  //   'If the FMI instation has been succesful, the following pointer is not null: '
  // );
  // console.log(mod_config.fmi2_component);
  // console.log('Or alternatively FMI-Version =  ');
  // console.log(fmi2GetVersion());
}

function setup_fmu_experiment() {
  /*
  
  
////////////////////// Experiment Setup ////////////////////////////


*/

  //

  // Continous: dont define the stoptime
  var Setup_Exp_Check;

  if (mod_config.stopTime === null && mod_config.mode === "oneShot") {
    alert("onsShot runtime methods must have a stopTime bigger than 0");
  }

  if (mod_config.stopTime !== null) {
    if (mod_config.destroyOnReset) {
      stopT = mod_config.stopTime;
    } else {
      stopT = 10 ** 10;
    }

    Setup_Exp_Check = fmi2SetupExperiment(
      mod_config.fmi2_component,
      1,
      mod_config.tolerance || 0.000005,
      mod_config.startTime,
      1,
      stopT
    );
  } else {
    Setup_Exp_Check = fmi2SetupExperiment(
      mod_config.fmi2_component,
      1,
      mod_config.tolerance || 0.000005,
      mod_config.startTime
    );
  }
}

function setup_fmu_initialization() {
  /*


////////////////////// Model Initialization ////////////////////////////


*/

  // if (mod_runCtrl.runCtrlAvailable) {
  //   console.log('All required Data is loaded: Data Check');
  //   for (let table of Object.keys(mod_runCtrl.combiTimeTables)) {
  //     console.log(`checkFileExist = >  ${table}`);
  //     checkFileExist = Module['FS'].readFile(
  //       mod_runCtrl.combiTimeTables[table].path2File
  //     );
  //     console.log(checkFileExist);
  //   }
  // }

  fmi2EnterInitializationMode(mod_config.fmi2_component);

  setValues_updateMemory_at("init");
  setValues_at("init");

  // necessary in levitator? Removed because it leads to 2 entries with time zero (first one from fmu initialization hence removing the functions second one from actual run)

  // getValues_updateMemory("init"); // necessary, otherwise the values at time 0 have a little offset
  // getSimTime_updateMemory("afterDoStep"); // 


  fmi2ExitInitializationMode(mod_config.fmi2_component);
  setValues_free_at("init");
}
