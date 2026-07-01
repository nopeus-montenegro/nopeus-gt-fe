export const enum SORT_DIRECTION {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export const enum SORT_TYPE {
  DIRECTION = 'sortDir',
  DATA = 'sortBy',
}

export const enum LAP_TIME_FILTER {
  HAS_TIME = 'time',
  IS_VERIFIED = 'verified',
}

export const enum LAP_TIME_SORT {
  LAP_TIME = 'lapTime',
}

export const enum SETUP_SORT {
  PP = 'pp',
  POWER = 'power',
  TORQUE = 'torque',
  WEIGHT = 'weight',
  WPR = 'wpr',
}

export const enum SETUP_FILTER {
  PP_LIM_MIN = 'ppMin',
  PP_LIM_MAX = 'ppMax',
  POWER_LIM_MIN = 'powerMin',
  POWER_LIM_MAX = 'powerMax',
  TORQUE_LIM_MIN = 'torqueMin',
  TORQUE_LIM_MAX = 'torqueMax',
  WEIGHT_LIM_MIN = 'weightMin',
  WEIGHT_LIM_MAX = 'weightMax',
  WPR_LIM_MIN = 'wprMin',
  WPR_LIM_MAX = 'wprMax',
}

export const enum TRACK_SORT {
  NAME = 'name',
  LENGTH = 'length',
  STRAIGHT = 'straight',
  CORNERS = 'corner',
  ELEVATION = 'elev',
}

export const enum TRACK_FILTER {
  REGION = 'region',
  COUNTRY = 'country',
  SURFACE = 'surface',
  TRACK_CLASS = 'class',
  BOP = 'bop',
  RAIN = 'rain',
  SOPHY = 'sophy',
}

export const enum CAR_SORT {
  NAME = 'name',
  YEAR = 'year',
  DISPLACEMENT = 'disp',
  GEARBOX = 'gear',
}

export const enum CAR_FILTER {
  MANUFACTURER = 'man',
  COUNTRY = 'country',
  CAR_CLASS = 'class',
  DRIVETRAIN = 'drivetrain',
  ENGINE_LAYOUT = 'engineLayout',
  ASPIRATION = 'asp',
  OVERTAKE = 'overtake',
  HYBRID = 'hybrid',
}
