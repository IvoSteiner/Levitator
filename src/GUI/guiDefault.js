// DropDonw Defaults are set in the GUI control (Alpinejs)
// the gui default object is not changed, it store the default values
const guiDefault = {
  selectiveInput: {
    // swtich states (needs to be done besides the alpine definition)
    switch_is_r: true,
    switch_is_r1: true,
    switch_is_s1: true,

    rVal: 0.1, //m
    sVal: 4500, //rpm

    stepOrDirValvePos: 1, // valve position

    // // values for either input slider or input fields depending on device
    // // r in meter
    // r1:{
    //   def: 0.1, 
    //   max: 0.26, 
    //   min: 0, 
    //   step:0.001,

    //   mobId:'inpF1M', 
    //   desId:'slider1',
    // }, 

    // r2:{
    //   def: 0.2, 
    //   max: 0.26, 
    //   min: 0, 
    //   step:0.001,
    // }, 
  },

  input: {
    // ranges

    slider1: {
      val: 0.1, // r1, height in m
      id: "slider1",
      // levitator specific
      max: 0.26, 
      min: 0, 
      step:0.001,
      conversion: 1000, // conversion factor from modelInput to GUI display
    },
    slider2: {
      val: 0.25, // r2, height in m
      id: "slider2",
       // levitator specific
       max: 0.26, 
       min: 0, 
       step:0.001,
       conversion: 1000, // conversion factor from modelInput to GUI display
    },
    slider3: {
      val: 4500, // s1
      id: "slider3",
      // levitator specific
      max: 11000, 
      min: 0, 
      step:1,
      conversion: 1, // conversion factor from modelInput to GUI display
    },
    slider4: {
      val: 2000, // s2
      id: "slider4",
      // levitator specific
      max: 11000, 
      min: 0, 
      step:1,
      conversion: 1, // conversion factor from modelInput to GUI display
    },
    slider5: {
      val: 5000, // ar
      id: "slider5",
      // levitator specific
      max: 11000, 
      min: 0, 
      step:1,
      conversion: 1, // conversion factor from modelInput to GUI display
    },

    // PID

    pid_p: {
      val: 150000, // r1, decimal value
      id: "pid_p",
    },
    pid_i: {
      val: 0.5, // r1, decimal value
      id: "pid_i",
    },
    pid_d: {
      val: 0.3, // r1, decimal value
      id: "pid_d",
    },
  },
  // anim: {
  //   text: {
  //     v_Flow: 0,
  //     TL1_valveOp: 0,
  //     T_water: 0,
  //     TL1_dp: 0,
  //     TL1_rpm: 0,
  //     TL1_torque: 0,
  //     TL1_El_P: 0,
  //   },
  // },

  textOutput: {},

  diagrams: {
    //https://intelligaia.com/using-colors-for-data-visualization-with-large-categories
    colors: {
      blue: "#4770B3",
      green: "#267278",
      orange: "#E4B031",
      lightblue: "#50AED3",
      lightgreen: "#CAD93F",
      grey: "#9E9EA2",
      pruple: "#65338D",
      darkorange: "#E57438",
    },
  },
};

// the gui setting object stores the user requested data
// At first the settings correspond to the default
var guiSettings = structuredClone(guiDefault);
