document.addEventListener("alpine:init", () => {
  // Variable definition
  Alpine.data("AppAlpineDataFunc", () => ({
    init() {
      this.tabPanelHandler("tabPanel1", this.tabPanel1.selected); // Init tabPanel1
      this.tabPanelHandler("tabPanel2", this.tabPanel2.selected); // Init tabPanel2

      // Setting checkboxes with function based on default, otherwise the browser will use old values when only page reloading and therefore generate faulty checkboxes...
      document.getElementById("pv1").checked = this.sBAR.pvCheckedSub1;
      document.getElementById("pv2").checked = this.sBAR.pvCheckedSub2;
      document.getElementById("pv3").checked = this.sBAR.pvCheckedSub3;
      document.getElementById("pv4").checked = this.sBAR.pvCheckedSub4;
      document.getElementById("pv5").checked = this.sBAR.pvCheckedSub5;
      document.getElementById("pv6").checked = this.sBAR.pvCheckedSub6;

      document.getElementById("load1").checked = this.sBAR.loadsCheckedSub1;
      document.getElementById("load2").checked = this.sBAR.loadsCheckedSub2;
      document.getElementById("load3").checked = this.sBAR.loadsCheckedSub3;
      document.getElementById("load4").checked = this.sBAR.loadsCheckedSub4;

      // Interval for Weekslider throttling / debouncing
      setInterval(
        function () {
          this.weekSelectAllowed = true;
        }.bind(this),
        200
      );

      // enforcing end value
      // clean way to to it no but it works
      setInterval(
        function () {
          let tabs = ["tab1", "tab2", "tab3", "tab4"];
          for (let i = 0; i < tabs.length; i++) {
            if (
              this.tabPanel1[tabs[i]].rangeSafety.rangeSet !==
              this.tabPanel1[tabs[i]].rangeSafety.rangeReq
            ) {
              this.weekRequest4DiagramHandler(
                this.tabPanel1[tabs[i]].rangeSafety.plotID,
                tabs[i],
                this.tabPanel1[tabs[i]].rangeSafety.rangeReq
              );
            }
          }
          // console.log(`set ${this.tabPanel1.tab1.rangeSafety.rangeSet}`);
          // console.log(`req ${this.tabPanel1.tab1.rangeSafety.rangeReq}`);
        }.bind(this),
        200
      );
    },

    weekSelectAllowed: false,

    loadingScreen: false,
    // Variables for Opening and Closing the sidebar
    sBAR: {
      mobOpen: false,
      deskOpen: false,

      locOpen: false,
      pvOpen: false,
      loadsOpen: false,
      batteryOpen: false,

      simCtrlVisible: true,
      simCtrlOpen: false,

      playBtn: false,
      expBtn: false,

      pvSub1: false,
      pvSub2: false,
      pvSub3: false,
      pvSub4: false,
      pvSub5: false,
      pvSub6: false,

      pvCheckedSub1: true,
      pvCheckedSub2: true,
      pvCheckedSub3: true,
      pvCheckedSub4: true,
      pvCheckedSub5: true,
      pvCheckedSub6: true,

      loadsSub1: false,
      loadsSub2: false,
      loadsSub3: false,
      loadsSub4: false,
      loadsSub5: false,

      loadsCheckedSub1: true,
      loadsCheckedSub2: true,
      loadsCheckedSub3: true,
      loadsCheckedSub4: true,
      loadsCheckedSub5: true,
      layerMem: "topLayer",

      // only calculating values of input field where the cursor was last
      cursorStepSize: false,
      cursorStartTime: false,
      cursorStopTime: false,
    },

    tabPanel1: {
      selected: "overviewTab",
      rangeTeleportLoc: "#range_overviewTab",
      measuredDiagramH: null,
      tab1: {
        name: "pvTab",
        plotIsInit: false,
        // has to be done this way otherise the function is called during instantiation
        init: async function () {
          init_linePlot_pv();
        },
        update: function () {
          linePlot_pv_Update();
        },
        rangeSliderID: "weekSelect_pv",
        outputDivID: "weekoutput_pv",
        rangeSafety: {
          plotID: "linePlot_pv",
          rangeReq: 09,
          rangeSet: 09,
        },
      },
      tab2: {
        name: "loadTab",
        plotIsInit: false,
        init: async function () {
          init_linePlot_loads();
        },
        update: function () {
          linePlot_loads_Update();
        },
        rangeSliderID: "weekSelect_loads",
        outputDivID: "weekoutput_loads",
        rangeSafety: {
          plotID: "linePlot_loads",
          rangeReq: 09,
          rangeSet: 09,
        },
      },
      tab3: {
        name: "batteryTab",
        plotIsInit: false,
        init: async function () {
          init_linePlot_bat();
        },
        update: function () {
          linePlot_bat_Update();
        },
        rangeSliderID: "weekSelect_bat",
        outputDivID: "weekoutput_bat",
        rangeSafety: {
          plotID: "linePlot_bat",
          rangeReq: 09,
          rangeSet: 09,
        },
      },
      tab4: {
        name: "overviewTab",
        plotIsInit: false,
        init: async function () {
          init_linePlot_tot();
        },
        update: function () {
          linePlot_tot_Update();
        },
        rangeSliderID: "weekSelect_tot",
        outputDivID: "weekoutput_tot",
        rangeSafety: {
          plotID: "linePlot_tot",
          rangeReq: 09,
          rangeSet: 09,
        },
      },
    },

    tabPanel2: {
      selected: "overviewTab",
      measuredDiagramH: null,
      tab1: {
        name: "pvTab",
        plotIsInit: false,
        // has to be done this way otherise the function is called during instantiation
        init: async function () {
          init_barPlot_pv();
        },
        update: function () {
          barPlot_pv_Update();
        },
      },
      tab2: {
        name: "loadTab",
        plotIsInit: false,
        init: async function () {
          init_barPlot_loads();
        },
        update: function () {
          barPlot_loads_Update();
        },
      },
      tab3: {
        name: "batteryTab",
        plotIsInit: false,
        init: async function () {
          init_barPlot_bat();
        },
        update: function () {
          barPlot_bat_Update();
        },
      },
      tab4: {
        name: "overviewTab",
        plotIsInit: false,
        init: async function () {
          init_barPlot_tot();
        },
        update: function () {
          barPlot_tot_Update();
        },
      },
    },

    tabPanelHandler(tabPanel, selected) {
      // console.log(tabPanel);
      // console.log(selected);
      // console.log(this[tabPanel]);

      // update alpine.js state
      this[tabPanel].selected = selected;
      // _.get(this[tabPanel], pathResObj);

      // sourceObj = _.find(this[tabPanel], {
      //   name: selected,
      // });

      key4selected = _.findKey(this[tabPanel], {
        name: selected,
      });

      // Init
      if (!this[tabPanel][key4selected].plotIsInit) {
        // this[tabPanel][key4selected].init;
        // $nextTick will fire after the DOM has been rendered the next time (plotly needs to be drawn in a visible tab)

        // check if rangeSliderID exists, not completley sure if placed here correctly
        if (_.has(this[tabPanel][key4selected], "rangeSliderID")) {
          setValueSlider(
            this[tabPanel][key4selected].rangeSliderID,
            guiSettings.inputRange.val,
            this[tabPanel][key4selected].outputDivID
          );
        }

        this.$nextTick(() => {
          // setTimout enforces the $nextTick only necessary if nextTick it not sufficient
          setTimeout(() => {
            // init.then(update) its not possible to call the update function if the plot is not init
            // otherwise this will get errors
            this[tabPanel][key4selected].init().then(() => {
              // this[tabPanel].measuredDiagramH = document.getElementById('barPlot_tot').offsetHeight;
              // console.log(offsetHeight);
              // window.dispatchEvent(new Event("resize"));
              // only run the update function if there is output data
              // bind(this) is not necessary if () => arrow functions are used indstead of function() "this" needs to be bind to the callback
              if (!_.isEmpty(mod_autoOutput)) {
                this[tabPanel][key4selected].update();
              }
            });
            // set Init to true inside the nextTick callback otherwise it will be true before the init actually happened
            this[tabPanel][key4selected].plotIsInit = true;
          }, "0");
        });
      } else {
        // if already inti just throw a resize event
        window.dispatchEvent(new Event("resize"));
        // setValueSlider('weekSelect_pv', guiSettings.inputRange.val);
        if (_.has(this[tabPanel][key4selected], "rangeSliderID")) {
          setValueSlider(
            this[tabPanel][key4selected].rangeSliderID,
            guiSettings.inputRange.val,
            this[tabPanel][key4selected].outputDivID
          );
        }
        // Included real update in order to implement plotly style changes if the screen would have chnanged.
        // this[tabPanel][key4selected].update();
      }

      // if the simulation has ran its necessary to display the results and the diagram is allready init
      if (
        !_.isEmpty(mod_autoOutput) &&
        this[tabPanel][key4selected].plotIsInit
      ) {
        this.$nextTick(() => {
          this[tabPanel][key4selected].update();
        });
      }
    },

    updateTabPanelDiagram(tabPanel) {
      // getting key to requested tab
      key4selected = _.findKey(this[tabPanel], {
        name: this[tabPanel].selected,
      });
      // alert if not init yet, can be deleted sooner or later
      if (!this[tabPanel][key4selected].plotIsInit) {
        alert(`Plot is not init: ${this[tabPanel][key4selected].name}`);
      }
      // checking if an update is possible, by checking if the output object is not empty
      if (!_.isEmpty(mod_autoOutput)) {
        // update diagram of the requested tabPanel
        this[tabPanel][key4selected].update();
      }
    },

    // selectivePlotUpdate
    // Variables for selecting InputFiles/ Drop Downs
    // table numbring must be equal to mod_runCtrl see FMjs_main_hslu
    timeTableSelect: {
      table1: {
        xModelSetTab: "",
        userFile: false,
      },
      table2: {
        xModelSetTab: "",
        userFile: false,
      },
      table3: {
        xModelSetTab: "",
        userFile: false,
      },
      table4: {
        xModelSetTab: "",
        userFile: false,
      },
      table5: {
        xModelSetTab: "",
        userFile: false,
      },
    },

    dropDownFileInputHandler(table, selected) {
      // console.log("dropDown handler");
      // console.log(selected);

      // setting Dropdown to selection
      this.timeTableSelect[table].xModelSetTab = selected;

      // setting the requested file path at the mod_runCtrl
      // Chalange the on change function in the drop down doesnt provide the path only the value
      // Search Parent Object of the requested dropdown to set its path to be read...
      // mod_runCtrl.combiTimeTables.table1.path2File = value.path;
      sourceObj = _.find(mod_runCtrl.combiTimeTables[table].sources, {
        dropDownValue: selected,
      });
      mod_runCtrl.combiTimeTables[table].path2File = sourceObj.path;
      mod_runCtrl.combiTimeTables[table].isLoadedFS = true;

      // if userProfile is selected show upload row
      if (selected === "usrProfile") {
        this.timeTableSelect[table].userFile = true;
        mod_runCtrl.combiTimeTables[table].isLoadedFS = false;
      } else {
        // making sure it is closed if not selected
        this.timeTableSelect[table].userFile = false;

        if (table == "table1") {
          // Exception for table1/ location: reseting the latitude on deselcting userProfile
          // Since there is no dedicated reset button
          setDefaultAtGUI("input.loc1");
        }
      }
    },

    weekRequest4DiagramHandler(plotID, tabKey, reqVal) {
      // Storing (last) request
      this.tabPanel1[tabKey].rangeSafety.rangeReq = reqVal;

      if (this.tabPanel1[tabKey].plotIsInit) {
        // there are lodash debounce and throttle functions, but i dont get them to work (classical approach implemented)
        if (this.weekSelectAllowed) {
          this.weekSelectAllowed = false;
          // console.log(`slider value: ${reqVal}`);
          // Storing last set value
          this.tabPanel1[tabKey].rangeSafety.rangeSet = reqVal;

          xRange = [app.gui.weekArray[reqVal], app.gui.weekArray[reqVal + 1]];
          var update = {
            "xaxis.range": xRange, // updates the xaxis range

            //
            //  Not required as it seems but makes rendering slow
            //

            // "xaxis.rangeslider": {
            //   range: ["1970-01-01 00:00:00", "1971-01-01 00:00:00"],
            //   visible: true,
            //   thickness: 0.03,
            //   bordercolor: "#000",
            //   borderwidth: 1,
            // },
          };
          Plotly.relayout(plotID, update); // Should be more performant than animate
        }
      }
    },

    modOpen: false,

    // Opening states
    // Same as for the closing, the order of opening needs to be respected
    // Open Sidebar==> Show Children of Toplevel Accordeon == > Show Children of Sublevel Accordeon
    // Functions: called with x-on:click/ @click
    sideBarStateHandler(itemReq, layerReq) {
      // Layer used:
      // topLayer, Top Accordeon and its direct children
      // subLayerX, Accordeon inside the top accordeon
      // Cases:
      // 1. Jumping between top layer accordeon
      // 2. Jumping between subaccordeon x
      // 3. Jumping between layers

      childrenTopLayer = [
        "locOpen",
        "pvOpen",
        "loadsOpen",
        "batteryOpen",
        "simCtrlOpen",
      ];
      subAccordeonChildrenPV = [
        "pvSub1",
        "pvSub2",
        "pvSub3",
        "pvSub4",
        "pvSub5",
        "pvSub6",
      ];

      subAccordeonChildrenLoads = [
        "loadsSub1",
        "loadsSub2",
        "loadsSub3",
        "loadsSub4",
        "loadsSub5",
      ];

      oneChildPolicy = true;
      if (oneChildPolicy) {
        // 1. Jumping between top layer accordeon
        // We are on the toplayer and request another child on the same layer/ will not be executed the first time the sidbar is opend
        if (
          layerReq === "topLayer" &&
          this.sBAR.layerMem === "topLayer" &&
          this.sBAR.deskOpen === true
        ) {
          this.sBAR.layerMem = "topLayer";
          // alert(`Item: ${this.sBAR[itemReq]}, Layer: ${layerReq}`)

          // Close all items expext the requested item ()
          for (i = 0; i < childrenTopLayer.length; i++) {
            if (
              this.sBAR[childrenTopLayer[i]] === true &&
              childrenTopLayer[i] !== itemReq
            ) {
              this.sBAR[childrenTopLayer[i]] = false;
            }
          }

          setTimeout(delayed.bind(this), 200, itemReq); // Delayed request after ensuring all children of the same level are closed
          function delayed() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        }

        // 2A. Jumping between subaccordeon PV
        if (
          layerReq === "subLayerPV" &&
          this.sBAR.layerMem === "subLayerPV" &&
          this.sBAR.pvOpen === true
        ) {
          this.sBAR.layerMem = "subLayerPV";
          // alert(`Item: ${this.sBAR[itemReq]}, Layer: ${layerReq}`)

          // Close all items expext the requested item ()
          for (i = 0; i < subAccordeonChildrenPV.length; i++) {
            if (
              this.sBAR[subAccordeonChildrenPV[i]] === true &&
              subAccordeonChildrenPV[i] !== itemReq
            ) {
              this.sBAR[subAccordeonChildrenPV[i]] = false;
            }
          }
          setTimeout(delayed.bind(this), 200, itemReq); // Delayed request after ensuring all children of the same level are closed
          function delayed() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        }

        // 2B. Jumping between subaccordeon loads
        if (
          layerReq === "subLayerLoads" &&
          this.sBAR.layerMem === "subLayerLoads" &&
          this.sBAR.loadsOpen === true
        ) {
          this.sBAR.layerMem = "subLayerLoads";
          // alert(`Item: ${this.sBAR[itemReq]}, Layer: ${layerReq}`)

          // Close all items expext the requested item ()
          for (i = 0; i < subAccordeonChildrenLoads.length; i++) {
            if (
              this.sBAR[subAccordeonChildrenLoads[i]] === true &&
              subAccordeonChildrenLoads[i] !== itemReq
            ) {
              this.sBAR[subAccordeonChildrenLoads[i]] = false;
            }
          }
          setTimeout(delayed.bind(this), 200, itemReq); // Delayed request after ensuring all children of the same level are closed
          function delayed() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        }

        // 3A. Jumping between layers from subLayerPV to topLayer
        // When jumping Layers, the children of the to be closed layer need to be closed first
        // Only the case when jumping from the sub to the topLayer and not vice versa
        if (
          layerReq === "topLayer" &&
          this.sBAR.layerMem === "subLayerPV" &&
          this.sBAR.pvOpen === true
        ) {
          this.sBAR.layerMem = "topLayer";
          // Closing children of the closing layer
          for (i = 0; i < subAccordeonChildrenPV.length; i++) {
            this.sBAR[subAccordeonChildrenPV[i]] = false;
          }
          // ensure closing of the old tap
          setTimeout(delayed.bind(this), 200); // Delayed request after ensuring all children of the same level are closed
          function delayed() {
            this.sBAR.pvOpen = false;

            // opening new, requested tap but avoid opneing the accordeon again if itemReq == pvOpen
            if (itemReq !== "pvOpen") {
              setTimeout(delayed.bind(this), 200, itemReq); // Delayed request after ensuring all children of the same level are closed
              function delayed() {
                this.sBAR[itemReq] = !this.sBAR[itemReq];
              }
            }
          }
        }

        // 3B. Jumping between layers from subLayerLoads to topLayer
        // When jumping Layers, the children of the to be closed layer need to be closed first
        // Only the case when jumping from the sub to the topLayer and not vice versa
        if (
          layerReq === "topLayer" &&
          this.sBAR.layerMem === "subLayerLoads" &&
          this.sBAR.loadsOpen === true
        ) {
          this.sBAR.layerMem = "topLayer";
          // Closing children of the closing layer
          for (i = 0; i < subAccordeonChildrenLoads.length; i++) {
            this.sBAR[subAccordeonChildrenLoads[i]] = false;
          }
          // ensure closing of the old tap
          setTimeout(delayed.bind(this), 200); // Delayed request after ensuring all children of the same level are closed
          function delayed() {
            this.sBAR.loadsOpen = false;

            // opening new, requested tap but avoid opneing the accordeon again if itemReq == pvOpen
            if (itemReq !== "loadsOpen") {
              setTimeout(delayed.bind(this), 200, itemReq); // Delayed request after ensuring all children of the same level are closed
              function delayed() {
                this.sBAR[itemReq] = !this.sBAR[itemReq];
              }
            }
          }
        }
      }

      //
      // Only open sidebar
      //
      if (itemReq === "deskOpen") {
        this.sBAR.deskOpen = true;
      }

      //
      // oneChildPolicy === true, Open Subacordeon when closed
      //
      if (
        (itemReq === "pvSub1" ||
          itemReq === "pvSub2" ||
          itemReq === "pvSub3" ||
          itemReq === "pvSub4" ||
          itemReq === "pvSub5" ||
          itemReq === "pvSub6") &&
        this.sBAR.pvOpen &&
        oneChildPolicy &&
        !(this.sBAR.layerMem === "subLayerPV")
      ) {
        if (this.sBAR.pvOpen == false) {
          this.sBAR.pvOpen = true;
          setTimeout(delayed.bind(this), 200, itemReq); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout
          function delayed() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        } else {
          this.sBAR[itemReq] = !this.sBAR[itemReq];
        }
      }

      if (
        (itemReq === "loadsSub1" ||
          itemReq === "loadsSub2" ||
          itemReq === "loadsSub3" ||
          itemReq === "loadsSub4" ||
          itemReq === "loadsSub5") &&
        this.sBAR.loadsOpen &&
        oneChildPolicy &&
        !(this.sBAR.layerMem === "subLayerLoads")
      ) {
        if (this.sBAR.loadsOpen == false) {
          this.sBAR.loadsOpen = true;
          setTimeout(delayed.bind(this), 200, itemReq); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout
          function delayed() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        } else {
          this.sBAR[itemReq] = !this.sBAR[itemReq];
        }
      }

      //
      // oneChildPolicy === true; Open accordeon when closed
      //
      if (
        (itemReq === "locOpen" ||
          itemReq === "pvOpen" ||
          itemReq === "loadsOpen" ||
          itemReq === "batteryOpen" ||
          itemReq === "simCtrlOpen") &&
        !this.sBAR.deskOpen &&
        oneChildPolicy
      ) {
        if (this.sBAR.deskOpen == false) {
          this.sBAR.deskOpen = true;
          setTimeout(delayed.bind(this), 200, itemReq); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout
          function delayed() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        } else {
          this.sBAR[itemReq] = !this.sBAR[itemReq];
        }
      }

      //
      // oneChildPolicy === false, Open Subacordeon when closed
      //
      if (
        (itemReq === "pvSub1" ||
          itemReq === "pvSub2" ||
          itemReq === "pvSub3" ||
          itemReq === "pvSub4" ||
          itemReq === "pvSub5" ||
          itemReq === "pvSub6") &&
        this.sBAR.pvOpen &&
        !oneChildPolicy
      ) {
        if (this.sBAR.pvOpen == false) {
          this.sBAR.pvOpen = true;
          setTimeout(delayed.bind(this), 200, itemReq); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout
          function delayed() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        } else {
          this.sBAR[itemReq] = !this.sBAR[itemReq];
        }
      }

      if (
        (itemReq === "loadsSub1" ||
          itemReq === "loadsSub2" ||
          itemReq === "loadsSub3" ||
          itemReq === "loadsSub4" ||
          itemReq === "loadsSub5") &&
        this.sBAR.loadsOpen &&
        !oneChildPolicy
      ) {
        if (this.sBAR.loadsOpen == false) {
          this.sBAR.loadsOpen = true;
          setTimeout(delayed.bind(this), 200, itemReq); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout
          function delayed() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        } else {
          this.sBAR[itemReq] = !this.sBAR[itemReq];
        }
      }

      //
      // oneChildPolicy === false; Open accordeon when closed
      //
      if (
        (itemReq === "locOpen" ||
          itemReq === "pvOpen" ||
          itemReq === "loadsOpen" ||
          itemReq === "batteryOpen" ||
          itemReq === "simCtrlOpen") &&
        !oneChildPolicy
      ) {
        if (this.sBAR.deskOpen == false) {
          this.sBAR.deskOpen = true;
          setTimeout(delayed.bind(this), 200, itemReq); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout
          function delayed() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        } else {
          this.sBAR[itemReq] = !this.sBAR[itemReq];
        }
      }

      //
      // Make shure the now set layer is written to the layerMemory
      //
      this.sBAR.layerMem = layerReq;

      //
      // Control Buttons
      //

      if (itemReq === "expBtn" || itemReq === "playBtn") {
        if (this.sBAR.deskOpen === true || this.sBAR.mobOpen === true) {
          // Call expBtn/ Export function
          if (itemReq === "expBtn") {
            if (mod_runCtrl.userDataExport.isInExportState) {
              sendNotification("info", "CSV export started");
              // Calling Export/ Data-Download Function
              dataExport();
              // End of export
            } else {
              sendNotification("warning", "Keine Daten zu exportieren");
            }
          }
          // Call playBtn function
          if (itemReq === "playBtn") {
            // checking if input files allow sim run
            if (checkInputFilesLoadingState()) {
              // Close sidebar to see results when finished
              this.sideBarCloser();

              if (this.sBAR.mobOpen) {
                this.sBAR.mobOpen = false;
                hrefCall(this.sBAR.mobOpen);
              }

              setTimeout(delayedLoadingScreen.bind(this), 200); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout
              function delayedLoadingScreen() {
                this.loadingScreen = true;
                // delaying sim start otherwise loading circle is lagging at the start
                setTimeout(delayedTrigger_simulation.bind(this), 200);
              }
              function delayedTrigger_simulation() {
                trigger_simulation();
              }
            }
          }
        }

        // If Sidebar is closed only open sidebar first (avoid unintentional action)
        if (this.sBAR.deskOpen === false) {
          this.sBAR.deskOpen = true;
          this.sBAR.expBtn = true;
        }
      }
    },

    // Closing whole sidebar on esc-key or clicking outside of the sidebar
    // It is not posible to fire all closing comands at once. "Intersecting" comands will lead to errors in the gui. == > Close in the same order as the accordeons are opened!
    // Since transitions are used the setTimeout will wait before calling the next item to close
    // Close Children of Sublevel Accordeon ==> Hide Children of Toplevel Accordeon  == > Close Sidebar

    sideBarCloser() {
      itemReq = "deskOpen";

      childrenTopLayer = [
        "locOpen",
        "pvOpen",
        "loadsOpen",
        "batteryOpen",
        "simCtrlOpen",
        "expBtn",
        "playBtn",
      ];

      if (this.sBAR.deskOpen === true) {
        // Closing all open subacordeons (Children of children) before closeing children
        if (
          this.sBAR.pvSub1 === true ||
          this.sBAR.pvSub2 === true ||
          this.sBAR.pvSub3 === true ||
          this.sBAR.pvSub4 === true ||
          this.sBAR.pvSub5 === true ||
          this.sBAR.pvSub6 === true ||
          this.sBAR.loadsSub1 === true ||
          this.sBAR.loadsSub2 === true ||
          this.sBAR.loadsSub3 === true ||
          this.sBAR.loadsSub4 === true ||
          this.sBAR.loadsSub5 === true
        ) {
          subAccordeonChildren = [
            "pvSub1",
            "pvSub2",
            "pvSub3",
            "pvSub4",
            "pvSub5",
            "pvSub6",
            "loadsSub1",
            "loadsSub2",
            "loadsSub3",
            "loadsSub4",
            "loadsSub5",
          ];

          for (i = 0; i < subAccordeonChildren.length; i++) {
            if (this.sBAR[subAccordeonChildren[i]] === true) {
              // console.log(
              //   `Is open and will be closed: ${subAccordeonChildren[i]}`
              // );
              this.sBAR[subAccordeonChildren[i]] = false;
            }
          }
          setTimeout(delayedFirstChildrenClose.bind(this), 400); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout

          // Closing Children an sidebar itself
          // Closing all Open Children befor closing sidebar
          function delayedFirstChildrenClose() {
            for (i = 0; i < childrenTopLayer.length; i++) {
              if (this.sBAR[childrenTopLayer[i]] === true) {
                // console.log(
                //   `Is open and will be closed: ${childrenTopLayer[i]}`
                // );
                this.sBAR[childrenTopLayer[i]] = false;
              }
            }
            // Calling the deylayed Sidebar Close
            setTimeout(delayedSidebarClose.bind(this), 400, itemReq); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout
          }

          // Closing the actual sidebar after a short delay
          function delayedSidebarClose() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        } else {
          // no subacordeon children to close
          // Closing all Open Children befor closing sidebar
          for (i = 0; i < childrenTopLayer.length; i++) {
            if (this.sBAR[childrenTopLayer[i]] === true) {
              // console.log(`Is open and will be closed: ${childrenTopLayer[i]}`);
              this.sBAR[childrenTopLayer[i]] = false;
            }
          }
          // Closing the actual sidebar after a short delay
          setTimeout(delayedSidebarClose.bind(this), 300, itemReq); // bind() makes the this aviable from the parent function, the last input param makes the itemReq aviable in the setTimeout
          function delayedSidebarClose() {
            this.sBAR[itemReq] = !this.sBAR[itemReq];
          }
        }
      }
    },
  }));
});

/*





    End of Alpine.js stuff, proceeding with additional guiControl





*/

// Template fix for using alpine.js, standard js functino
function hrefCall(mobOpen) {
  // alert(mobOpen)
  if (mobOpen) {
    window.location = "#sidenav-open";
  } else {
    window.location = "#sidenav-close";
  }
}

//
// Function Calls for the defaults (defined in the guiDefault.js) are made after the page has loaded (html ids need to exist)
//
function setDefaultAtGUI(pathResObj) {
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
    // console.log(value.val);
    // console.log(value.id);
    // Update Values from default
    document.getElementById(value.id).value = value.val;
  });
  // console.log(guiSettings.input);
}

/*
// On / Off "switch" based on parameter Value, i.e. setting photovoltaic active or passive via setting the area to the user value or ZERO m^2
*/
function isActiveToggleVIAParam(isActive, id, path) {
  // not active == > set 0
  if (!isActive) {
    // Set current user value at memory
    usrVal = Number(document.getElementById(id).value); // Gets String number from Gui and converts it into float or integer
    _.set(guiSettings, path + ".isNOTActiveMEM", usrVal);
    // set zero == > deactivate component
    _.set(guiSettings, path + ".val", 0);
    // check
    // console.log(
    //   `Parameter ${path}  is set to ${_.get(guiSettings, path + ".val")}`
    // );
  }

  // active == > set user value or default
  if (isActive) {
    // set value from memory
    usrVal = _.get(guiSettings, path + ".isNOTActiveMEM"); // Gets String number from Gui and converts it into float or integer
    _.set(guiSettings, path + ".val", usrVal); // Setting the number
    // check
    console.log(
      `Parameter ${path}  is set to ${_.get(guiSettings, path + ".val")}`
    );
  }
}

/*
// Setting user values from input type number fields
*/
function setUsrValue(id, path) {
  // console.log("Checkig user Input");
  // console.log(_.get(guiSettings, path));

  usrVal = Number(document.getElementById(id).value); // Gets String number from Gui and converts it into float or integer
  _.set(guiSettings, path, usrVal); // Setting the number

  // console.log(_.get(guiSettings, path));

  // handling exceptions. Writing time values to mod config
  // check if its a simCtrl parameter
  // Example input to understand code below from html: x-on:change="setUsrValue('simCtrl_stepSize', 'input.simCtrl.stepSize.val')"

  if (id.includes("simCtrl_")) {
    // console.log("simCtrl variable found");
    // console.log(mod_config); // check old

    path = id.replace(/simCtrl_/g, "");
    _.set(mod_config, path, usrVal); // Setting the number
    // console.log(mod_config); // check new
  }
}

/*
// checking loading state of input files
*/
function checkInputFilesLoadingState() {
  checkOK = true;
  // an check if the app is loaded or if the filesystem has been loaded completley is required...

  // check if filesystem is ready

  if (!mod_runCtrl.defaultFilesReady) {
    checkOK = false;
    //it seems that in chrome (edge and firefox work fine) there are cases where the loading of the wasm crashes
    // especially when you click in the browser even dough no wasm manipulation is called at first glance
    sendNotification(
      "warning",
      `Modell wird vorbereitet, einen Augenblick.<br> WASM is loaded = ${mod_runCtrl.wasmReady}<br> Filesystem is loaded: ${mod_runCtrl.defaultFilesReady}`
    );
  }

  // if filesystem is ready check if all required files and paths are there
  if (mod_runCtrl.defaultFilesReady) {
    // looping over all tables in combiTimeTablse
    _.forOwn(mod_runCtrl.combiTimeTables, function (value, key) {
      // check if isLoaded is true
      if (!value.isLoadedFS) {
        // File not loaded send notification
        sendNotification("warning", value.warningTxt);
        checkOK = false;
      }
    });
  }
  return checkOK;
}

// Simulation Control Buttons
function trigger_play() {
  mod_runCtrl.softRealTime.playButton = true;
}
function trigger_pause() {
  mod_runCtrl.softRealTime.pauseButton = true;
}
function trigger_reset() {
  mod_runCtrl.softRealTime.resetButton = true;
}
function trigger_simulation() {
  mod_runCtrl.oneShot.simulateButton = true;
}

// Initializing default data
setDefaultAtGUI("input.loc1");
setDefaultAtGUI("input.pv1");
setDefaultAtGUI("input.pv2");
setDefaultAtGUI("input.pv3");
setDefaultAtGUI("input.pv4");
setDefaultAtGUI("input.pv5");
setDefaultAtGUI("input.pv6");
setDefaultAtGUI("input.bat1");
// Default of simTime cant be called here

//
// start slider handler functinos
// Can be placed here since the init functions are callbacks of the DOMContentLoaded event
//
// The Week is outputed as string in order to introduce leading zeoros i.e. 09 instead of 9
function numSTROutput(numb, n_digits, outputDivID) {
  numSTR = numb.toString();
  while (numSTR.length < n_digits) {
    numSTR = "0" + numSTR;
  }
  // console.log(numSTR);
  document.getElementById(outputDivID).innerHTML = numSTR;
}

function setValueSlider(sliderID, setVal, outputDivID) {
  const $slider_x = document.getElementById(sliderID);
  $slider_x.value = setVal;
  numSTROutput(setVal, 2, outputDivID);
}

//
// end slider handler functinos
//

// Function that evaluates the digit and return result
function calcSolveInput(id) {
  // get user string
  let usrInputSTR = document.getElementById(id).value;
  // https://regex-generator.olafneumann.org/?sampleText=0123456799.%20%2F%20*%20%5E%20%2B%20-%20(%20)&flags=i
  let regex = /0123456799\. \/ \* \^ \+ - \( \)/i;
  // no letters allowed
  if (!regex.test(usrInputSTR)) {
    // evalute user string
    let resValue = math.evaluate(usrInputSTR);

    if (resValue >= 0 && resValue <= 31536000) {
      // Update the data structure
      // console.log("check mod config");
      // console.log(mod_config); // check old
      // get path
      path = id.replace(/simCtrl_/g, "");

      // save stirng in memory if the evaluated string differs from the old string...
      MemStr = _.get(guiSettings.input.simCtrl, path + ".inputSTRMem");

      // if Memory is not empty check stored value
      if (MemStr !== null) {
        MemSTRValue = math.evaluate(MemStr);
        // Store value if the new and memory value are not the same
        if (MemSTRValue !== resValue) {
          _.set(guiSettings.input.simCtrl, path + ".inputSTRMem", usrInputSTR);
        }
      }

      // if Memory is empty, store input value
      if (MemStr === null) {
        _.set(guiSettings.input.simCtrl, path + ".inputSTRMem", usrInputSTR);
      }

      // round
      resValue = math.round(resValue, 0);

      _.set(mod_config, path, resValue); // Setting the number
      // console.log(mod_config); // check new
      // show result in gui
      document.getElementById(id).value = resValue;
    } else {
      document.getElementById(id).value = "Invalid Input";
    }
  } else {
    document.getElementById(id).value = "Invalid Input";
  }
}
// Show input string for editing
function calcShowInputString(id) {
  path = id.replace(/simCtrl_/g, "");
  if (_.get(guiSettings.input.simCtrl, path + ".inputSTRMem") != null) {
    document.getElementById(id).value = _.get(
      guiSettings.input.simCtrl,
      path + ".inputSTRMem"
    );
  }
}
