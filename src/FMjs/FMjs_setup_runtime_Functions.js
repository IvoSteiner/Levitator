function getRunTimeMethod() {
  if (mod_config.mode === "softRealTime") {
    console.log("Runtime mode: softRealTime");
    setup_softRealTime();
  } else if (mod_config.mode === "oneShot") {
    // console.log("Runtime mode: oneShot");
    setup_oneShot();
  }
}

/*




    ////////////////////// softRealTime ////////////////////////////





      */

function setup_softRealTime() {
  /*
        runtime function calls
      */
  eventTick_setup_srt();
  softRealTime();
  // play_srt(); // Autostart run code

  /*
          runtime function definition
  */

  getTime = false;

  function modelTick() {
    if (getTime) {
      console.time("Sim: CPU single timeStep");
    }
    const result = fmi2DoStep(
      mod_config.fmi2_component,
      Module.currentStep,
      mod_config.stepSize,
      1
    );
    if (getTime) {
      console.timeEnd("Sim: CPU single timeStep");
    }

    // console.log("check return of dostep");
    // console.log(result);

    // getValue Function calls
    getSimTime_updateMemory("afterDoStep");
    getValues_updateMemory();

    // Set Value Function calls
    setValues_updateMemory_at("afterDoStep");
    setValues_at("afterDoStep");

    // Incrementing time step, precision is required to avoid numerical error
    Module.currentStep = parseFloat(
      parseFloat(Module.currentStep + mod_config.stepSize).toPrecision(8)
    );

    mod_runCtrl.softRealTime.dispResults = true;

    if (
      mod_config.stopTime !== null &&
      Module.currentStep > mod_config.stopTime - mod_config.stepSize
    ) {
      pause_srt();
      // Workaround to not loose the last time step
      getSimTime_updateMemory("afterDoStep");
    }
  }

  function softRealTime() {
    Module.modelTickInterval = null;
    Module.currentStep = mod_config.startTime;
  }

  function play_srt() {
    if (Module.modelTickInterval !== null) {
      pause_srt();
    }
    if (mod_runCtrl.userDataExport.userDataExportEnabled) {
      mod_runCtrl.userDataExport.isInExportState = false;
    }

    // setting the lastest startvalues if the model has ben executed yet (reset or first start)
    if (mod_runCtrl.softRealTime.isOnStartOrReset) {
      setup_fmu_initialization(); // Autostart comment out
      mod_runCtrl.softRealTime.isOnStartOrReset = false;
    }
    Module.modelTickInterval = window.setInterval(
      modelTick, // Function which calls the modeltick function, NO BRACKETS required, see: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
      mod_config.srtTickInterval_ms
    );
  }

  function pause_srt() {
    if (mod_runCtrl.userDataExport.userDataExportEnabled) {
      mod_runCtrl.userDataExport.isInExportState = true;
    }

    if (Module.modelTickInterval === null) {
      return;
    }
    window.clearInterval(Module.modelTickInterval);
    Module.modelTickInterval = null;

    // get values for a last time to also read the last values
    // throws unphysical data during start stop
    // getSimTime_updateMemory();
    // getValues_updateMemory();
  }

  function reset_srt() {
    pause_srt(); // no calculation is allowed during reset
    mod_runCtrl.softRealTime.dispResults = false;
    mod_runCtrl.softRealTime.isOnStartOrReset = true;

    if (mod_runCtrl.userDataExport.userDataExportEnabled) {
      mod_runCtrl.userDataExport.isInExportState = false;
    }

    if (mod_config.destroyOnReset) {
      // cleaning
      fmi2FreeInstance(mod_config.fmi2_component);
      getValues_free();
      setValues_free_at("reset");
      reset_autoOutput();

      // new setup
      setup_js_wasm_fmu_IO(); // enable input and ouput js <==> wasm <==> fmi (fmu)
      setup_fmuOnStart();
      getRunTimeMethod();
    }
    if (!mod_config.destroyOnReset) {
      alert("soft reset has error");
      fmi2GetStatus(mod_config.fmi2_component, "fmi2DoStepStatus, ");
      fmi2Terminate(mod_config.fmi2_component);
      let teststatus = fmi2Reset(mod_config.fmi2_component);
      // console.log(teststatus);
      setup_fmuOnReset();
    }
  }

  function eventTick_setup_srt() {
    Module.eventTickInterval = window.setInterval(eventTick_srt, 250);
  }

  function eventTick_srt() {
    if (mod_runCtrl.softRealTime.playButton) {
      play_srt();
    }
    if (mod_runCtrl.softRealTime.pauseButton) {
      pause_srt();
    }
    if (mod_runCtrl.softRealTime.resetButton) {
      mod_runCtrl.softRealTime.resetButton = false;
      reset_srt();
    }
    mod_runCtrl.softRealTime.playButton = false;
    mod_runCtrl.softRealTime.pauseButton = false;
    mod_runCtrl.softRealTime.resetButton = false;
  }
}

/*






















    ////////////////////// oneShot ////////////////////////////
























      */

firstReset_os = true;

function setup_oneShot() {
  /*
     runtime function calls
  */
  eventTick_setup_os();
  oneShot();

  function oneShot() {
    Module.currentStep = mod_config.startTime;
  }

  function play_os() {
    reset_os();

    //
    // Case 1: no loading screen: models with short execution time (Pumpenprüfstand)
    //

    if (!mod_runCtrl.oneShot.hasLoadingScreen) {
      // console.time("Sim: CPU Time");
      while (Module.currentStep < mod_config.stopTime) {
        // <= leads to an error in the last iteration
        const result = fmi2DoStep(
          mod_config.fmi2_component,
          Module.currentStep,
          mod_config.stepSize,
          1
        );

        // getValue Function calls
        getSimTime_updateMemory("afterDoStep");
        getValues_updateMemory();

        // Incrementing time step, precision is required to avoid numerical error
        Module.currentStep = parseFloat(
          parseFloat(Module.currentStep + mod_config.stepSize).toPrecision(8)
        );
      }

      // console.timeEnd("Sim: CPU Time");

      // Workaround to not loose the last time step
      getSimTime_updateMemory("afterDoStep");

      // console.log("mod_autoOutput");
      // console.log(mod_autoOutput);

      // Export now possible if enabled
      if (mod_runCtrl.userDataExport.userDataExportEnabled) {
        mod_runCtrl.userDataExport.isInExportState = true;
      }

      // allow update of gui
      mod_runCtrl.oneShot.dispResults = true;
    }

    /*


    //
    // Case 2: with loading screen: models with long execution time == > asnc while loop required (GEELive)
    //
    



  */

    if (mod_runCtrl.oneShot.hasLoadingScreen) {
      var start = Date.now();

      curentStep = 0;

      async function asyncFct_with_syncWhile(currentStopStep, callback) {
        // let i = 0;
        while (curentStep < currentStopStep) {
          // verify last step
          modStepSize = mod_config.stepSize;
          if (Module.currentStep + mod_config.stepSize > mod_config.stopTime) {
            modStepSize = Math.floor(mod_config.stopTime - Module.currentStep);
          }

          const result = fmi2DoStep(
            mod_config.fmi2_component,
            Module.currentStep,
            modStepSize,
            1
          );

          // getValue Function calls
          getSimTime_updateMemory("afterDoStep");
          getValues_updateMemory();

          // Incrementing time step, precision is required to avoid numerical error
          curentStep += 1;
          Module.currentStep = parseFloat(
            parseFloat(Module.currentStep + mod_config.stepSize).toPrecision(8)
          );
        }
        cb_currentStep = Module.currentStep;
        const promise = new Promise((resolve, _reject) => {
          setTimeout(() => {
            callback(cb_currentStep);
            resolve();
          }, 0);
        });
        await promise;
      }

      //
      // new segmentation
      //
      // t_start = 0;
      // t_end = 100;
      // t_step = 3;
      // n_guiUpdate = 20;

      // n_steps = Math.floor((t_end - t_start) / t_step) + 1;
      // t_last_step = (t_end - t_start) % t_step;
      // nSteps2NextUpdate = Math.floor(n_steps / n_guiUpdate);
      // nSteps2LastUpdate = n_steps % n_guiUpdate;

      nUpdatesEnd = 20;
      rangeStopTime = 0;
      nStepStopsArray = [];
      nSteps_current = 0;

      n_steps = Math.floor(
        (mod_config.stopTime - mod_config.startTime) / mod_config.stepSize
      );
      t_last_step =
        (mod_config.stopTime - mod_config.startTime) % mod_config.stepSize;
      // If there is a rest add plus one!
      if (t_last_step != 0) {
        n_steps = n_steps + 1;
      }

      nSteps2NextUpdate = Math.floor(n_steps / nUpdatesEnd);
      nSteps2LastUpdate = n_steps % nUpdatesEnd;

      // console.log(`n_steps ${n_steps}`);
      // console.log(`t_last_step ${t_last_step}`);
      // console.log(`nSteps2NextUpdate ${nSteps2NextUpdate}`);
      // console.log(`nSteps2LastUpdate ${nSteps2LastUpdate}`);

      for (i = 0; i <= nUpdatesEnd; i++) {
        // Calculation rangeStopTimes
        if (i < nUpdatesEnd) {
          nSteps_current += nSteps2NextUpdate;
          nStepStopsArray[i] = nSteps_current;
        } else {
          nStepStopsArray[i] = nStepStopsArray[i - 1] + nSteps2LastUpdate;
        }
      }

      //
      // new segmentation
      //

      async function asyncWhileCount() {
        console.time("Simulation execution time");

        for (i = 0; i <= nUpdatesEnd; i++) {
          await asyncFct_with_syncWhile(
            nStepStopsArray[i],
            (cb_currentStep) => {
              progStat = Math.round(
                (cb_currentStep / mod_config.stopTime) * 100
              ); //Module.currentStep / mod_config.stopTime
              var simStatus = document.getElementById("simStatus");
              simStatus.innerHTML = `${progStat} %`;
            }
          );
        }

        console.timeEnd("Simulation execution time");

        mod_runCtrl.oneShot.dispResults = true;

        // Workaround to not loose the last time step
        getSimTime_updateMemory("afterDoStep");

        if (mod_runCtrl.userDataExport.userDataExportEnabled) {
          mod_runCtrl.userDataExport.isInExportState = true;
        }

        clearInterval(mod_runCtrl.oneShot.setInt_id);

        // Disabling loading screen after sim/ event id "" only small letters allowed
        window.dispatchEvent(new Event("loadingscreen"));
        // Reseting progStat in order to display 0 % for a simulation re-run
        setTimeout(() => {
          let simStatus = document.getElementById("simStatus");
          simStatus.innerHTML = `0 %`;
        }, 100);
      }
      asyncWhileCount();
    }
  }

  function reset_os() {
    // Do these state realy have to be set here
    // mod_runCtrl.softRealTime.isOnStartOrReset = true;
    // mod_runCtrl.oneShot.getProgressBarOutput = false;
    if (firstReset_os) {
      reset_os_hard();
      firstReset_os = false;
    } else if (!mod_config.destroyOnReset) {
      reset_os_soft();
    } else {
      reset_os_hard();
    }
  }

  function reset_os_hard() {
    mod_runCtrl.oneShot.dispResults = false;

    fmi2FreeInstance(mod_config.fmi2_component);
    getValues_free();
    setValues_free_at("reset");
    reset_autoOutput();

    // new setup
    setup_js_wasm_fmu_IO(); // enable input and ouput js <==> wasm <==> fmi (fmu)
    setup_fmuOnStart();
    getRunTimeMethod();

    // moved here form play_os
    setup_fmu_initialization();
  }

  function reset_os_soft() {
    // Doesnt work... even tough the fim2Reset call should be allowed it throws an error
    // fmi2GetStatus(mod_config.fmi2_component, "fmi2DoStepStatus");
    // let teststatus = fmi2Reset(mod_config.fmi2_component);
    // console.log(teststatus);
    // setup_fmuOnReset();

    //
    // Pseudo Soft Reset: (Works for models like the BFE Pump Test Rig)
    //

    mod_runCtrl.oneShot.dispResults = false;

    // increase stoptime = > Before updating model in order to set the new stopTime in the model

    // This is the stopTime of the runtime method, in case of softReset the FMU has an randomly chosen endtime of 10**10 seconds
    mod_config.stopTime += mod_config.stopTime - mod_config.startTime;

    // set new requested values:
    setValues_updateMemory_at("afterDoStep");
    setValues_at("afterDoStep");

    // run model again
  }

  function eventTick_setup_os() {
    Module.eventTickInterval = window.setInterval(eventTick_os, 250);
  }

  function eventTick_os() {
    if (mod_runCtrl.oneShot.simulateButton) {
      mod_runCtrl.oneShot.simulateButton = false;

      // get ProgressBar interval
      if (mod_runCtrl.oneShot.hasLoadingScreen) {
        mod_runCtrl.oneShot.setInt_id = setInterval(
          (mod_runCtrl.oneShot.updateProgressBar = true),
          50
        );
      }

      setTimeout(() => {
        play_os();
      }, 0);
    }
  }
}
