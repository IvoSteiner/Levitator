function setup_js_wasm_fmu_IO() {
  // ioControl is a subobject which stores general IO control data
  mod_config.ioControl = {};
  mod_config.ioControl.variables_keys = Object.keys(mod_config.variables);




  // console.log("String Length");
  // var testString = "tab1";
  // console.log(testString.length);

  setValue_createMemoryAndDependencys();
  getValue_createMemoryAndDependencys();
}

/*








////////////////////// Defining GET-Functions ////////////////////////////









*/

function getValue_createMemoryAndDependencys() {
  for (let current_param of mod_config.ioControl.variables_keys) {
    // Precaution in case of get and set if someone changes the function order, otherwise the data can be lost
    if (mod_config.variables[current_param].io == null) {
      mod_config.variables[current_param].io = {};
    }

    mod_config.variables[current_param].io.GETVal = {};

    mod_config.variables[current_param].io.GETVal.GETvalueRefrence_vr =
      mod_config.variables[current_param].reference; // Memory refrence in the fmi sphere of the variable in question

    // Datatype discrimination
    if (mod_config.variables[current_param].datatype === "Boolean") {
      mod_config.variables[current_param].io.GETVal.value2GET_inDataType =
        new Int32Array([0.0]); // Data Type to be memorized (to get size)
    } else if (mod_config.variables[current_param].datatype === "Integer") {
      mod_config.variables[current_param].io.GETVal.value2GET_inDataType =
        new Float64Array([0.0]); // Data Type to be memorized (to get size)
    } else if (mod_config.variables[current_param].datatype === "String") {
      mod_config.variables[current_param].io.GETVal.value2GET_inDataType =
        new Int32Array([0.0]); // This is only the pointer to the string therfore Int32Array is ok
    } else {
      mod_config.variables[current_param].io.GETVal.value2GET_inDataType =
        new Float64Array([0.0]); // Data Type to be memorized (to get size)
    }
    mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr =
      Module._malloc(
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType
          .byteLength
      ); // Allocating memory in the wasm module and recifing the pointer to it

    mod_config.variables[current_param].io.GETVal.GETvalueRefrence_vr_asInt32 =
      new Int32Array([
        mod_config.variables[current_param].io.GETVal.GETvalueRefrence_vr,
      ]); // Saving the ReferenceSet as Int32Array

    mod_config.variables[current_param].io.GETVal.GETvalueReference_vr_mem_ptr =
      Module._malloc(
        mod_config.variables[current_param].io.GETVal
          .GETvalueRefrence_vr_asInt32.byteLength
      ); // Allocating memory in the "Modul" for saving the RefSet, returns a pointer to it

    Module.setValue(
      mod_config.variables[current_param].io.GETVal
        .GETvalueReference_vr_mem_ptr,
      mod_config.variables[current_param].io.GETVal.GETvalueRefrence_vr,
      "i32"
    ); // Pointer to the place where the variable value is "Set" into the allocated memory i.e. saved
  }
}

function getValues_updateMemory(process) {
  for (let current_param of mod_config.ioControl.variables_keys) {
    mod_config.variables[current_param].io.GETVal.nvr = 1;

    // Datatype discrimination
    if (mod_config.variables[current_param].datatype === "Boolean") {
      fmi2GetBoolean(
        mod_config.fmi2_component,
        mod_config.variables[current_param].io.GETVal
          .GETvalueReference_vr_mem_ptr,
        mod_config.variables[current_param].io.GETVal.nvr,
        mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr
      ); // Sorgt dafür, dass die Auszulesenden Daten im Zwischenspeicher (mit malloc erstellt) Abgelegt werden.
      for (
        var i = 0;
        i <
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType
          .length;
        i++
      ) {
        // Reading shared memory to js, loops through shared memory consisting of an array with 3 entries (x,y,z), usually only entry [0] is used
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType[i] =
          Module.getValue(
            mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr +
              i *
                mod_config.variables[current_param].io.GETVal
                  .value2GET_inDataType.BYTES_PER_ELEMENT,
            "i32"
          );
      }
    } else if (mod_config.variables[current_param].datatype === "Integer") {
      fmi2GetInteger(
        mod_config.fmi2_component,
        mod_config.variables[current_param].io.GETVal
          .GETvalueReference_vr_mem_ptr,
        mod_config.variables[current_param].io.GETVal.nvr,
        mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr
      ); // Sorgt dafür, dass die Auszulesenden Daten im Zwischenspeicher (mit malloc erstellt) Abgelegt werden.
      for (
        var i = 0;
        i <
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType
          .length;
        i++
      ) {
        // Reading shared memory to js, loops through shared memory consisting of an array with 3 entries (x,y,z), usually only entry [0] is used
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType[i] =
          Module.getValue(
            mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr +
              i *
                mod_config.variables[current_param].io.GETVal
                  .value2GET_inDataType.BYTES_PER_ELEMENT,
            "double"
          );
      }
    } else if (mod_config.variables[current_param].datatype === "String") {
      // Gibt den Pointer auf den String zurück!
      // fmi2String == > pointer to a vector of fmi2Char characters ('\0' terminated, UTF-8 encoded)
      fmi2GetString(
        mod_config.fmi2_component,
        mod_config.variables[current_param].io.GETVal
          .GETvalueReference_vr_mem_ptr,
        mod_config.variables[current_param].io.GETVal.nvr,
        mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr
      ); // Sorgt dafür, dass die Auszulesenden Daten im Zwischenspeicher (mit malloc erstellt) Abgelegt werden.
      for (
        var i = 0;
        i <
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType
          .length;
        i++
      ) {
        // Reading shared memory to js, loops through shared memory consisting of an array with 3 entries (x,y,z), usually only entry [0] is used
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType[i] =
          Module.getValue(
            mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr +
              i *
                mod_config.variables[current_param].io.GETVal
                  .value2GET_inDataType.BYTES_PER_ELEMENT,
            "i32"
          );
      }
    } else {
      fmi2GetReal(
        mod_config.fmi2_component,
        mod_config.variables[current_param].io.GETVal
          .GETvalueReference_vr_mem_ptr,
        mod_config.variables[current_param].io.GETVal.nvr,
        mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr
      ); // Sorgt dafür, dass die Auszulesenden Daten im Zwischenspeicher (mit malloc erstellt) Abgelegt werden.
      for (
        var i = 0;
        i <
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType
          .length;
        i++
      ) {
        // Reading shared memory to js, loops through shared memory consisting of an array with 3 entries (x,y,z), usually only entry [0] is used
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType[i] =
          Module.getValue(
            mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr +
              i *
                mod_config.variables[current_param].io.GETVal
                  .value2GET_inDataType.BYTES_PER_ELEMENT,
            "double"
          );
      }
    }

    if (mod_config.variables[current_param].datatype === "String") {
      if (!mod_autoOutput.hasOwnProperty(current_param)) {
        mod_autoOutput[current_param] = {
          current: [],
        };
      }
      pointer2string =
        mod_config.variables[current_param].io.GETVal.value2GET_inDataType[0];
      mod_autoOutput[current_param].current =
        Module.UTF8ToString(pointer2string);
      // console.log(mod_autoOutput[current_param].current);
    } else {
      // Hanlding all other variables
      // Generating auto Output: Creats Object if not existing yet to be filled and updated after each step
      if (!mod_autoOutput.hasOwnProperty(current_param)) {
        mod_autoOutput[current_param] = {
          current: [],
          allPrev: [],
        };
      }

      let roundedValue =
        Math.round(
          mod_config.variables[current_param].io.GETVal
            .value2GET_inDataType[0] *
            10 ** mod_config.roundOut_decP
        ) /
        10 ** mod_config.roundOut_decP;

      mod_autoOutput[current_param].current = roundedValue;
      mod_autoOutput[current_param].allPrev.push(roundedValue);
    }
  }
}

function getSimTime_updateMemory() {
  // Standalone function required otherwise new time increments are pushed onto the allPrev for every output variable
  // console.log(mod_autoOutput.hasOwnProperty("SimTime"));
  if (!mod_autoOutput.hasOwnProperty("SimTime")) {
    mod_autoOutput.SimTime = {
      current: [],
      allPrev: [],
    };
  }

  mod_autoOutput.SimTime.current = Module.currentStep;
  mod_autoOutput.SimTime.allPrev.push(Module.currentStep);

  // Adding date string in order to utilise the ploty d3 date fromating
  if (!mod_autoOutput.hasOwnProperty("SimDateTime")) {
    mod_autoOutput.SimDateTime = {
      current: [],
      allPrev: [],
    };
  }

  if (false) {
    // Steps in order to get the required string
    // 1.) create a javascript date object in order to convert the seconds to a date
    function toDateTime(secs) {
      var t = new Date(0); // Epoch
      t.setSeconds(secs); // Currently we work in the year 1970 which is the Epoch refrence year doesnt matter here
      return t;
    }

    // 2.) Convert the JS-date-objet do a d3 time string (which is used by plotly)
    // var monthNameFormat = d3.timeFormat("%B");
    // var dayNameFormat = d3.timeFormat("%A");
    // TestMonth = monthNameFormat( toDateTime(100000));  //returns string "May" (remember javascript months are zero-indexed, thus 4 = May)
    // TestDay = dayNameFormat(toDateTime(100000));  //returns string "Thursday"

    var IGEDateFormat = d3.timeFormat("%Y-%m-%d %H:%M:%S"); // See plotly documetation on how the date needs to be formated. (Be carefull when -: or . , are used)
    let D3DateSTR = IGEDateFormat(toDateTime(Module.currentStep));

    // IsoTest = toDateTime(Module.currentStep).toISOString()

    // var IGEDateFormat = d3.timeFormat("%d.%m"); // Only Format the tick label not the stored date string
    // let D3DateSTR = IGEDateFormat()

    // 3.) Pushing the Date String to the output for use in plotly
    mod_autoOutput.SimDateTime.current = D3DateSTR;
    mod_autoOutput.SimDateTime.allPrev.push(D3DateSTR);
  }
}

function getValues_free() {
  for (let current_param of mod_config.ioControl.variables_keys) {
    Module._free(
      mod_config.variables[current_param].io.GETVal.value2GET_mem_ptr
    );
    Module._free(
      mod_config.variables[current_param].io.GETVal.GETvalueReference_vr_mem_ptr
    );
    delete mod_config.variables[current_param].io.GETVal;
  }
}

/*








////////////////////// Defining SET-Functions ////////////////////////////









*/

// alternative to eval()
function lookupCurrentValueInObj(path) {
  var keys = path.split("."),
    result = window[keys[0]];

  for (var i = 1, l = keys.length; i < l; i++) {
    result = result[keys[i]];

    // exit early if `null` or `undefined`
    if (result == null) return result;
  }

  return result;
}

// Creating Memory in the WASM and handle the required pointers
function setValue_createMemoryAndDependencys() {
  for (let current_param of mod_config.ioControl.variables_keys) {
    // real data

    if (set_CheckFMIConformity(current_param, "init")) {
      // console.log(
      //   `Create Memory for Parameter ${current_param} with variability: tunable of the datatype: Real`
      // );

      // Precaution in case of get and set if someone changes the function order, otherwise the data can be lost
      if (mod_config.variables[current_param].io == null) {
        mod_config.variables[current_param].io = {};
      }

      mod_config.variables[current_param].io.SETVal = {};

      mod_config.variables[current_param].io.SETVal.nvr_set = 1; // Parameter for fmi2Set function

      mod_config.variables[current_param].io.SETVal.SETvalueRefrence_vr =
        mod_config.variables[current_param].reference; // Memory refrence in the fmi sphere of the variable in question

      // Datatype discrimination
      if (mod_config.variables[current_param].datatype === "Boolean") {
        mod_config.variables[current_param].io.SETVal.value2SET_inDataType =
          new Int32Array([0]); // The effective value is set in the update functions
      } else if (mod_config.variables[current_param].datatype === "Integer") {
        mod_config.variables[current_param].io.SETVal.value2SET_inDataType =
          new Float64Array([0]); // The effective value is set in the update functions
      } else if (mod_config.variables[current_param].datatype === "String") {
        //SetString
        mod_config.variables[current_param].io.SETVal.string2setMemory = "";
        mod_config.variables[current_param].io.SETVal.string2setLength = null;
        mod_config.variables[current_param].io.SETVal.value2SET_inDataType =
          new Int32Array([0]); // Pointer to the string to be set
      } else {
        mod_config.variables[current_param].io.SETVal.value2SET_inDataType =
          new Float64Array([0]); // The effective value is set in the update functions
      }
      mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr =
        Module._malloc(
          mod_config.variables[current_param].io.SETVal.value2SET_inDataType
            .byteLength
        ); //Allocating memory (for saving the value of the to be set parameter as Float64Array) in the Module an saving the respective pointer to the memory
      mod_config.variables[
        current_param
      ].io.SETVal.SETvalueRefrence_vr_asInt32 = new Int32Array([
        mod_config.variables[current_param].io.SETVal.SETvalueRefrence_vr,
      ]); // Save SETvalueRefrence_vr as Int32Array

      mod_config.variables[
        current_param
      ].io.SETVal.SETvalueReference_vr_mem_ptr = Module._malloc(
        mod_config.variables[current_param].io.SETVal
          .SETvalueRefrence_vr_asInt32.byteLength
      ); // Allocating memory (for saving the value reference as Int32 type) in the Module an saving the respective pointer to the memory
    }
  }
}

function setValues_updateMemory_at(process) {
  for (let current_param of mod_config.ioControl.variables_keys) {
    // console.log("setValues_updateMemory Function");
    // look up data value at object to be set at fmu
    if (set_CheckFMIConformity(current_param, process)) {
      mod_config.variables[current_param].io.SETVal.value2SET_inDataType =
        lookupCurrentValueInObj(
          mod_config.variables[current_param].setfmu_path2userObj
        );

      // Datatype discrimination
      if (mod_config.variables[current_param].datatype === "Boolean") {
        Module.setValue(
          mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr,
          mod_config.variables[current_param].io.SETVal.value2SET_inDataType,
          "i32"
        );
      } else if (mod_config.variables[current_param].datatype === "Integer") {
        Module.setValue(
          mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr,
          mod_config.variables[current_param].io.SETVal.value2SET_inDataType,
          "double"
        );
      } else if (mod_config.variables[current_param].datatype === "String") {
        //SetString
        let string2set =
          mod_config.variables[current_param].io.SETVal.value2SET_inDataType;
        strHasChanged =
          mod_config.variables[current_param].io.SETVal.string2setMemory !==
          string2set;
        if (strHasChanged) {
          // run method only when string has changed

          /*
          // ToDo old memory needs to be freed but only if its exist
          */

          mod_config.variables[current_param].io.SETVal.string2setMemory =
            string2set;

          var stringLen = lengthBytesUTF8(string2set) + 1;

          mod_config.variables[current_param].io.SETVal.string2setLength =
            stringLen;

          // Get memory for string to utf
          mod_config.variables[current_param].io.SETVal.value2SET_UTF8mem_ptr =
            Module._malloc(stringLen); //Allocating memory (for saving the value of the to be set parameter as Float64Array) in the Module an saving the respective pointer to the memory

          Module.stringToUTF8(
            string2set,
            mod_config.variables[current_param].io.SETVal.value2SET_UTF8mem_ptr,
            stringLen
          );
        }

        Module.setValue(
          mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr, // Pointer to memory where the the pointer to the effective string is stored, input for fmi2setString function
          mod_config.variables[current_param].io.SETVal.value2SET_UTF8mem_ptr, // Pointer to the first element of the string
          "i32"
        );
      } else {
        Module.setValue(
          mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr,
          mod_config.variables[current_param].io.SETVal.value2SET_inDataType,
          "double"
        );
      }

      Module.setValue(
        mod_config.variables[current_param].io.SETVal
          .SETvalueReference_vr_mem_ptr,
        mod_config.variables[current_param].io.SETVal.SETvalueRefrence_vr,
        "i32"
      );
    }
  }
}

// setting the values onInitialze with respect to datatype
function setValues_at(process) {
  for (let current_param of mod_config.ioControl.variables_keys) {
    if (set_CheckFMIConformity(current_param, process)) {
      // Datatype discrimination
      if (mod_config.variables[current_param].datatype === "Boolean") {
        fmi2SetBoolean(
          mod_config.fmi2_component,
          mod_config.variables[current_param].io.SETVal
            .SETvalueReference_vr_mem_ptr,
          mod_config.variables[current_param].io.SETVal.nvr_set,
          mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr
        );
      } else if (mod_config.variables[current_param].datatype === "Integer") {
        fmi2SetInteger(
          mod_config.fmi2_component,
          mod_config.variables[current_param].io.SETVal
            .SETvalueReference_vr_mem_ptr,
          mod_config.variables[current_param].io.SETVal.nvr_set,
          mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr
        );
      } else if (mod_config.variables[current_param].datatype === "String") {
        //SetString

        // // Check if alright
        // doubleCheckString = Module.UTF8ToString(
        //   mod_config.variables[current_param].io.SETVal.value2SET_UTF8mem_ptr
        // );
        // console.log('doubleCheckString');
        // console.log(doubleCheckString);

        fmi2SetString(
          mod_config.fmi2_component,
          mod_config.variables[current_param].io.SETVal
            .SETvalueReference_vr_mem_ptr,
          mod_config.variables[current_param].io.SETVal.nvr_set,
          mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr
        );
      } else {
        fmi2SetReal(
          mod_config.fmi2_component,
          mod_config.variables[current_param].io.SETVal
            .SETvalueReference_vr_mem_ptr,
          mod_config.variables[current_param].io.SETVal.nvr_set,
          mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr
        );
      }
    }
    
  }
}

function setValues_free_at(process) {
  // 'init', end or reset
  for (let current_param of mod_config.ioControl.variables_keys) {
    // ToDo make cleaner and clearer

    if (free_CheckFMIConformity(current_param, process)) {
      Module._free(
        mod_config.variables[current_param].io.SETVal.value2SET_mem_ptr
      );
      Module._free(
        mod_config.variables[current_param].io.SETVal
          .SETvalueReference_vr_mem_ptr
      );

      delete mod_config.variables[current_param].io.SETVal;
    }
  }
}

function reset_autoOutput() {
  for (let current_param of mod_config.ioControl.variables_keys) {
    mod_autoOutput[current_param] = {
      current: [],
      allPrev: [],
    };
  }

  mod_autoOutput.SimTime = {
    current: [],
    allPrev: [],
  };
}

/*








////////////////////// Defining LOGIC-Functions ////////////////////////////
   ==> Check if fmu conditions are fulfilled to call function









*/

/*
// Based on the variable causality and variability the variable values can only be set at certain process steps
*/
function set_CheckFMIConformity(current_param, process) {
  var isSetConform = false;

  if (process === "init") {
    // console.log("Check if variable is allowed to be set at init");

    isParam_tunable =
      mod_config.variables[current_param].causality === "parameter" &&
      mod_config.variables[current_param].variability === "tunable";

    isParam_fixed =
      mod_config.variables[current_param].causality === "parameter" &&
      mod_config.variables[current_param].variability === "fixed";

    isInput = mod_config.variables[current_param].causality === "input";

    hasPath = mod_config.variables[current_param].setfmu_path2userObj !== null;

    isSetConform = hasPath && (isParam_tunable || isParam_fixed || isInput);
  }

  if (process === "afterDoStep") {
    // console.log("Check if variable is allowed to be set after DoStep");

    isParam_tunable =
      mod_config.variables[current_param].causality === "parameter" &&
      mod_config.variables[current_param].variability === "tunable";

    isInput = mod_config.variables[current_param].causality === "input";

    hasPath = mod_config.variables[current_param].setfmu_path2userObj !== null;

    isSetConform = hasPath && (isParam_tunable || isInput);
  }

  return isSetConform;
}

/*
// Based on the variable causality and variability the variables and hence the memory can be freed at different process steps
*/

function free_CheckFMIConformity(current_param, process) {
  var isFreeConform = false;

  if (process === "init") {
    isParam_fixed =
      mod_config.variables[current_param].causality === "parameter" &&
      mod_config.variables[current_param].variability === "fixed";

    hasPath = mod_config.variables[current_param].setfmu_path2userObj !== null;

    isFreeConform = hasPath && isParam_fixed;
  }

  if (process === "reset") {
    isParam_tunable =
      mod_config.variables[current_param].causality === "parameter" &&
      mod_config.variables[current_param].variability === "tunable";

    isParam_fixed =
      mod_config.variables[current_param].causality === "parameter" &&
      mod_config.variables[current_param].variability === "fixed";

    isInput = mod_config.variables[current_param].causality === "input";

    hasPath = mod_config.variables[current_param].setfmu_path2userObj !== null;

    isSetConform = hasPath && (isParam_tunable || isParam_fixed || isInput);
  }

  return isFreeConform;
}
