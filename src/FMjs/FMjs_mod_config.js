/*

/////////////////////////////////////     Model configuration Object: mod_config     ////////////////////////////////////////////////


============= >>> AUTOMATICALLY CREATED DURING WASM COMPILATION WITH SCRIPT BASED ON modelDescription.xml [ca. 95%] and some standard settings regarding the fmu [ca. 5%]
============= >>> USE mod_interaction FOR ANY INTERACTION WITH THE mode_config, the mod_config need to be replaced after each compilation (unless one checks if the refrences are still exactly the same) ... its not worth it... 


/*

In essence: Every exported fmu has its matching modelDescription.xml file. It describes the model properties and hence how to interact with it. In order to have the same information in the browser the data is stored in a 
json object during compilation which needs to be pasted below with the variable name "mod_config". 

The properties from the modelDescription.xml need to be matched exactly to the mod_config. 
Exceptions: 
- Variable Pathnames xml: par.FileName == > (js) par_FileName    [Implication: Dont use _ in your Modelica filenames, will lead to errors] Might need to change the _ to a diffrent character
- Some further data is stored in the mod_config, hence it not called modelDescription

Model behavior: Test your models early. In general the toolchain is robust. But dont except that the everything from the Dymola-Model will work in the fmu-model 
                and dont except that everything from the fmu-model will work in the js-model. 
                == > Implication your Dymola-Model needs to be coded in a way that is compatible with the fmu and further the js-model environment

- The following Data in the mod_config needs to be exact as in the modelDescription of the compiled model
      - modelName
      - guid
      - fmi2CoSimulation
      - variables: 
              - causality
              - variability
              - datatype

FMI 2 Set Logic

     Causality        Variability        At FMU Export       On Initialization        After Do Step
     parameter          tunable               true                  true                   true
     parameter           fixed                true                  true                  false
     parameter          constant              true                  false                 false

      output                                 false                  false                 false

       input            discrete              true                  true                   true


//
// FURTHERMORE THE FOLLOWING SIMULATIONPARAMETERS CAN BE CHANGED:
// 
  
    stopTime
    stepSize

*/

/*

const mod_config = Copy Paste new exported JSON file

*/
const mod_config = {
  modelName: "LevitatorTestBench_FMUExport_System22ControlerSTI1",
  mode: "oneShot",
  stepSize: 60,
  startTime: 0.0,
  stopTime: 220.0,
  srtTickInterval_ms: 20,
  tolerance: 1e-8,
  roundOut_decP: 6,
  numbOfRequiredCombiTimeTables: 1,
  destroyOnReset: true,
  variables: {
    res_height: {
      disp_name: "res_height",
      reference: "637569122",
      datatype: "Real",
      unit: "[m]",
    },
    res_setHeightCLC: {
      disp_name: "res_setHeightCLC",
      reference: "234881030",
      variability: "tunable",
      datatype: "Real",
      unit: "[m]",
    },
    res_setUFanOLC: {
      disp_name: "res_setUFanOLC",
      reference: "234881031",
      variability: "tunable",
      datatype: "Real",
      unit: "[rev/min]",
    },
    res_setUFanEff: {
      disp_name: "res_setUFanEff",
      reference: "637569844",
      datatype: "Real",
      unit: "[rev/min]",
    },
    par_PID_P: {
      disp_name: "par_PID_P",
      reference: "16777217",
      causality: "parameter",
      variability: "tunable",
      datatype: "Real",
      unit: "unspecified",
      setfmu_path2userObj: null,
    },
    par_PID_I: {
      disp_name: "par_PID_I",
      reference: "16777218",
      causality: "parameter",
      variability: "tunable",
      datatype: "Real",
      unit: "unspecified",
      setfmu_path2userObj: null,
    },
    par_PID_D: {
      disp_name: "par_PID_D",
      reference: "16777219",
      causality: "parameter",
      variability: "tunable",
      datatype: "Real",
      unit: "unspecified",
      setfmu_path2userObj: null,
    },
    par_isCLC: {
      disp_name: "par_isCLC",
      reference: "16777220",
      causality: "parameter",
      variability: "tunable",
      datatype: "Boolean",
      unit: "bool",
      setfmu_path2userObj: null,
    },
    par_stepOrDirValvePos: {
      disp_name: "par_stepOrDirValvePos",
      reference: "16777221",
      causality: "parameter",
      variability: "tunable",
      datatype: "Real",
      unit: "unspecified",
      setfmu_path2userObj: null,
    },
    par_setPointCLC: {
      disp_name: "par_setPointCLC",
      reference: "16777222",
      causality: "parameter",
      variability: "tunable",
      datatype: "Real",
      unit: "[m]",
      setfmu_path2userObj: null,
    },
    par_setPointOLC: {
      disp_name: "par_setPointOLC",
      reference: "16777223",
      causality: "parameter",
      variability: "tunable",
      datatype: "Real",
      unit: "[rev/min]",
      setfmu_path2userObj: null,
    },
    par_opFan: {
      disp_name: "par_opFan",
      reference: "16777224",
      causality: "parameter",
      variability: "fixed",
      datatype: "Real",
      unit: "[rev/min]",
      setfmu_path2userObj: null,
    },
  },
  fmi2CoSimulation: 1,
  guid: "{434dbf0e-28b5-483b-bbcf-be8e7ac669ce}",
  generationDateAndTime: "2023-09-04T15:32:01Z",
  generationTool: "Dymola Version 2022x (64-bit), 2021-12-08",
};
