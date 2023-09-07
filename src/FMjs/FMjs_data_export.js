async function generateExport(fileKey, filExpNam, customTime) {
  try {
    var element = document.createElement("a");

    /*
  // Header Preparation
  - Export Type
  - Model name 
  - Export time 
  - Parameter with corresponding units
  */
    mod_runCtrl.userDataExport.expFilDef[fileKey].csvString = "";
    mod_runCtrl.userDataExport.expFilDef[fileKey].param_keys = Object.keys(
      mod_config.variables
    );

    // File Titel
    mod_runCtrl.userDataExport.expFilDef[fileKey].csvString =
      mod_runCtrl.userDataExport.expFilDef[fileKey].csvString +
      "File:; " +
      mod_runCtrl.userDataExport.expFilDef[fileKey].fName +
      "\r\n";

    // Model name
    mod_runCtrl.userDataExport.expFilDef[fileKey].csvString =
      mod_runCtrl.userDataExport.expFilDef[fileKey].csvString +
      "Model:; " +
      mod_config.modelName +
      "\r\n";

    // Export date
    mod_runCtrl.userDataExport.expFilDef[fileKey].csvString =
      mod_runCtrl.userDataExport.expFilDef[fileKey].csvString +
      "Date:; " +
      customTime +
      "\r\n";

    // Parameter + Unit header

    if (
      !mod_runCtrl.userDataExport.expFilDef[fileKey].useCustomParameterNames
    ) {
      // use mod_config i.e. modelDescription.xml data
      for (let exp_param of mod_runCtrl.userDataExport.expFilDef[fileKey]
        .expParamReq) {
        if (exp_param === "SimTime") {
          mod_runCtrl.userDataExport.expFilDef[fileKey].csvString =
            mod_runCtrl.userDataExport.expFilDef[fileKey].csvString +
            "time [s];";
        } else {
          mod_runCtrl.userDataExport.expFilDef[fileKey].csvString =
            mod_runCtrl.userDataExport.expFilDef[fileKey].csvString +
            mod_config.variables[exp_param].disp_name +
            " " +
            mod_config.variables[exp_param].unit +
            ";";
        }
      }
    } else {
      // use custom names...
      for (let customName of mod_runCtrl.userDataExport.expFilDef[fileKey]
        .customParameterNames) {
        // new string = old string + new Value + plus semicolen to jump to next cell in row
        mod_runCtrl.userDataExport.expFilDef[fileKey].csvString =
          mod_runCtrl.userDataExport.expFilDef[fileKey].csvString +
          customName +
          ";";
      }
    }

    // Add return to start new line
    mod_runCtrl.userDataExport.expFilDef[fileKey].csvString =
      mod_runCtrl.userDataExport.expFilDef[fileKey].csvString + "\r\n";

    // console.log(mod_runCtrl.userDataExport.expFilDef[fileKey]);
    // console.table(mod_runCtrl.userDataExport.expFilDef[fileKey]);

    /*
  Export data preparation
  */

    // number of rows are dicated by the number of time entries
    for (
      let n_row = 0;
      n_row < mod_autoOutput.SimTime.allPrev.length;
      n_row =
        n_row +
        1 * mod_runCtrl.userDataExport.expFilDef[fileKey].expCompressionFactor
    ) {
      for (let exp_param of mod_runCtrl.userDataExport.expFilDef[fileKey]
        .expParamReq) {
        // for (let n_column = 0; n_column < mod_runCtrl.userDataExport.expFilDef[fileKey].expParamReq.length; n_column++) {
        // creating the elemnts of each ros i.e. columns
        var value2write =
          mod_autoOutput[exp_param].allPrev[n_row].toString() + ";";
        mod_runCtrl.userDataExport.expFilDef[fileKey].csvString =
          mod_runCtrl.userDataExport.expFilDef[fileKey].csvString + value2write;
      }

      // Add return to start new line
      mod_runCtrl.userDataExport.expFilDef[fileKey].csvString =
        mod_runCtrl.userDataExport.expFilDef[fileKey].csvString + "\r\n";
    }
    /*
  End Export data preparation
  */

    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          mod_runCtrl.userDataExport.expFilDef[fileKey].csvString
        )
    );
    element.setAttribute("download", filExpNam);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    console.log("Export finished");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

// Initiate CSV Export
function dataExport() {
  // Generate download simulation data
  const d = new Date();
  month = d.getMonth() + 1;
  exportTime =
    d.getFullYear() +
    "_" +
    month +
    "_" +
    d.getDate() +
    "_" +
    d.getHours() +
    "_" +
    d.getMinutes() +
    "_" +
    d.getSeconds();

  _.forOwn(mod_runCtrl.userDataExport.expFilDef, function (value, key) {
    var filExpNamSTR =
      exportTime + "_" + value.fName + "_" + mod_config.modelName + ".csv";

    // calling generateExport ansychroniously to avoid browerser freezing with big data sets
    generateExport(key, filExpNamSTR, exportTime);
  });
}
