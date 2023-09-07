/*
                // FS, FileSystem
*/
function readSingleFile(contents, fileName, nTable) {
  // get file type
  fileType = fileName.split(".").at(-1);
  if (fileType == "csv" || fileType == "txt") {
    // File type is correct
    mod_runCtrl.combiTimeTables[nTable].fileDispName = fileName;

    /*
    // Upload directory
    // check wether the directory exists or not, if not creat it
    */
    upDirName = "userUpload";
    analyzeUpDir = Module["FS"].analyzePath(upDirName, true);
    upDirExists = analyzeUpDir.exists;
    if (!upDirExists) {
      Module["FS"].mkdir(upDirName);
    }

    /*
    // creating the file specific path string 
    */
    fullPath2File = "/" + upDirName + "/" + fileName;
    mod_runCtrl.combiTimeTables[nTable].path2File = fullPath2File;
    // Creating memory of fullPath2File for the first time i.e. when the memory is empty ''
    if (mod_runCtrl.combiTimeTables[nTable].memoryPath2File == "") {
      mod_runCtrl.combiTimeTables[nTable].memoryPath2File = fullPath2File;
    }

    /*
    // Reading and Loading the file into the FS on user request
    */

    const encoder = new TextEncoder();
    // console.log("contents");
    // console.log(contents);

    if (fileType == "csv") {
      /*
      // csv to txt conversion
      */
      contentsAsTxt = cvs2txtConverter(contents);
      function cvs2txtConverter(data) {
        // Creating Array data in order to build the string representing the corresponding txt file
        // console.log("Raw cvs data");
        // console.log(data);
        var csvArr = [];

        const table = data.split("\r\n");
        // console.log(table);

        for (let i = 0; i < table.length; i++) {
          var rowData = table[i].split(";");
          csvArr[i] = rowData;
        }
        // console.log(csvArr);

        var txtString = "";

        // Creating the txt file
        for (let i = 0; i < csvArr.length; i++) {
          // calls each row

          if (i != 2) {
            // removing the third row
            for (let j = 0; j < csvArr[i].length; j++) {
              // calls each element of row i.e. columns
              // Adding the correct spacing for the numerical values (i>3)
              if (i < 3) {
                txtString = txtString + csvArr[i][j];
              } else {
                txtString = txtString + csvArr[i][j] + "   ";
              }
            }
            // return after each line
            txtString = txtString + "\r\n";
          }
        }
        // console.log("ConvertedString");
        // console.log(txtString);
        return txtString;
      }
      // console.log("contentsAsTxt");
      // console.log(contentsAsTxt);

      // readAsText
      // txtFileFromFileReader = '#1\r\ndouble tab1(5,2)   # comment line\r\n  0   0\r\n  1   1\r\n  2   2\r\n  3   3\r\n  4   4\r\n  \r\n';
      // console.log('Log of the working filereader file');
      // console.log(txtFileFromFileReader);

      // The File in the FS needs to be utf8 (non human readable therefore converion right before writing it)
      contents = encoder.encode(contentsAsTxt); // conversion to utf8
      // console.log(contents);
    } else {
      contents = encoder.encode(contents); // conversion to utf8
    }

    const int8a = new Uint8Array(contents);

    // console.log("File as int8 array");
    // console.log(int8a);

    // Existing files (files with matching paths) are overwritten
    Module["FS"].writeFile(fullPath2File, int8a);

    checkFileExist = Module["FS"].readFile(fullPath2File);
    // console.log("checkFileExist");
    // console.log(checkFileExist);

    // Conclusion
    // console.log("File has ben written in Module File System");
    mod_runCtrl.combiTimeTables[nTable].isLoadedFS = true;

    // Check if all files are loaded, if so make the runCtrl aviable

    // console.log("Checking state of required tables");
    mod_runCtrl.runCtrlAvailable = true;
    for (let table of Object.keys(mod_runCtrl.combiTimeTables)) {
      // console.log(table);
      mod_runCtrl.runCtrlAvailable =
        mod_runCtrl.runCtrlAvailable &&
        mod_runCtrl.combiTimeTables[table].isLoadedFS;
    }

    /*
      == > delete unused files

      File deletion FS.unlink(path)
      This removes a name from the file system. 
      If that name was the last link to a file (and no processes has the file open) the file is deleted.
      */

    if (mod_runCtrl.combiTimeTables[nTable].memoryPath2File != fullPath2File) {
      analyzeDelFile = Module["FS"].analyzePath(
        mod_runCtrl.combiTimeTables[nTable].memoryPath2File,
        true
      );
      Module["FS"].unlink(mod_runCtrl.combiTimeTables[nTable].memoryPath2File);
      analyzeDelFile = Module["FS"].analyzePath(
        mod_runCtrl.combiTimeTables[nTable].memoryPath2File,
        true
      );
      // updating memory
      mod_runCtrl.combiTimeTables[nTable].memoryPath2File = fullPath2File;
    }
  } else {
    alert("Wrong file type, only .csv and .txt files are supported");
  }
}

/*

        Model Default Input Files/ combiTimeTables


*/

function defaultInputFilesLoader() {
  /*
  In the object mod_runCtrl.combiTimeTables all input combitimetables must be defined. For each of these tables one needs to define possible default files and user upload
  In the following code we loop over all combitimetables and for each the specified sources
  */

  // combitimetable for loop
  _.forOwn(mod_runCtrl.combiTimeTables, function (value, key) {
    // casting table specific variables in order to use them in the inner forOwn loop
    tbl_value = value;
    tbl_key = key;
    // console.log(tbl_key);
    // console.log(tbl_value);

    // Loop Over Source of current Object
    _.forOwn(
      mod_runCtrl.combiTimeTables[tbl_key].sources,
      function (value, key) {
        // console.log(tbl_key);
        // console.log(tbl_value);

        // check if it is a default file
        if (key.search(/def/) != -1) {
          // console.log("Default File found");
          /*
        // Default Upload directory
        // check wether the directory exists or not, if not creat it
        */
          upDirName = "defaultUpload";
          analyzeUpDir = Module["FS"].analyzePath(upDirName, true);
          upDirExists = analyzeUpDir.exists;
          if (!upDirExists) {
            Module["FS"].mkdir(upDirName);
          }
          /*
        Write Default File to FS
        */
          Module["FS"].writeFile(value.path, value.data);
          // checkFileExist = Module["FS"].readFile(value.path);
        }

        /*
        Check if source is selected 
      */
        if (value.isSelected) {
          // console.log("is Selected");
          // setting as default in gui == > custom event
          // motherfucker event tag must be lower case
          // all tables are "called" with the initfiledropdown, see html for details:
          // befor calling the alpine init function it is esured with an if condition,
          // that only the the correct table is considered
          const myEvent = new CustomEvent("initfiledropdown", {
            detail: {
              table: tbl_key,
              selected: value,
            },
          });
          window.dispatchEvent(myEvent);
        }
      }
    );
  });

  mod_runCtrl.defaultFilesReady = true;
}
