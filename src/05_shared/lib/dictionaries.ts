import {
  AirCleanerType, AntiLagType, BopTrackClass, BrakeBalanceType, BrakePadsType, BrakeSystemType, CarClass, ClutchFlywheelType, CustomPartType, CustomWingType, DifferentialType, EcuType, ExhaustManifoldType, FourWheelSteeringType, HandbrakeType, IntercoolerType, NitroType, PropellerShaftType, SilencerType, SteeringAngleKitType, SuperchargerType, SuspensionType, TorqueVectoringType, TrackClass, TrackRegion, TrackSurface, TransmissionType, TurbochargerType, TyreType,
} from '@prisma/client';

export const REGION_LABEL: Record<TrackRegion, string> = {
  [TrackRegion.EUROPE_MIDDLE_EAST]: 'Europe & Middle East',
  [TrackRegion.AMERICAS]: 'Americas',
  [TrackRegion.ASIA_OCEANIA]: 'Asia-Oceania',
};

export const TRACK_CLASS_LABEL: Record<TrackClass, string> = {
  [TrackClass.TECHNICAL]: 'Technical',
  [TrackClass.SPEED]: 'Speed',
  [TrackClass.HYBRID]: 'Hybrid',
  [TrackClass.RALLY]: 'Rally',
};

export const BOP_CLASS_LABEL: Record<BopTrackClass, string> = {
  [BopTrackClass.LOW_SPEED]: 'Low-speed',
  [BopTrackClass.MID_SPEED]: 'Mid-speed',
  [BopTrackClass.HIGH_SPEED]: 'High-speed',
};

export const SURFACE_LABEL: Record<TrackSurface, string> = {
  [TrackSurface.DIRT]: 'Dirt',
  [TrackSurface.SNOW]: 'Snow',
  [TrackSurface.TARMAC]: 'Tarmac',
};

export const CAR_CLASS: Record<CarClass, string> = {
  [CarClass.GR_1]: 'Gr.1',
  [CarClass.GR_2]: 'Gr.2',
  [CarClass.GR_3]: 'Gr.3',
  [CarClass.GR_4]: 'Gr.4',
  [CarClass.GR_B]: 'Gr.B',
  [CarClass.ROAD]: 'Road Car',
};

export const CUSTOM_PART: Record<CustomPartType, string> = {
  [CustomPartType.STANDARD]: 'Standard Parts',
  [CustomPartType.TYPE_A]: 'Type A',
  [CustomPartType.TYPE_B]: 'Type B',
  [CustomPartType.TYPE_C]: 'Type C',
};

export const CUSTOM_WING: Record<CustomWingType, string> = {
  [CustomWingType.STANDARD]: 'Standard Parts',
  [CustomWingType.TYPE_A]: 'Type A',
  [CustomWingType.TYPE_B]: 'Type B',
  [CustomWingType.CUSTOM]: 'Custom Wing Set',
  [CustomWingType.WINGLESS]: 'Wingless',
};

export const SUSPENSION: Record<SuspensionType, string> = {
  [SuspensionType.NORMAL]: 'Normal',
  [SuspensionType.STREET]: 'Street',
  [SuspensionType.SPORTS]: 'Sports',
  [SuspensionType.HEIGHT_ADJUSTABLE_SPORTS]: 'Height-Adjustable Sports',
  [SuspensionType.FULLY_CUSTOMISABLE]: 'Fully Customisable',
};

export const DIFFERENTIAL: Record<DifferentialType, string> = {
  [DifferentialType.NORMAL]: 'Normal',
  [DifferentialType.ONE_WAY_LSD]: 'One-Way LSD',
  [DifferentialType.TWO_WAY_LSD]: 'Two-Way LSD',
  [DifferentialType.FULLY_CUSTOMISABLE]: 'Fully Customisable',
};

export const TORQUE_VECTORING: Record<TorqueVectoringType, string> = {
  [TorqueVectoringType.NONE]: 'None',
  [TorqueVectoringType.NORMAL]: 'Normal',
  [TorqueVectoringType.TORQUE_VECTORING_CENTRE]: 'TVCD',
};

export const ECU: Record<EcuType, string> = {
  [EcuType.NORMAL]: 'Normal',
  [EcuType.SPORTS]: 'Sports',
  [EcuType.FULLY_CUSTOMISABLE]: 'Fully Customisable',
};

export const NITROUS: Record<NitroType, string> = {
  [NitroType.NONE]: 'None',
  [NitroType.NORMAL]: 'Normal',
  [NitroType.NITROUS]: 'Nitrous',
};

export const ANTI_LAG: Record<AntiLagType, string> = {
  [AntiLagType.OFF]: 'Off',
  [AntiLagType.WEAK]: 'Weak',
  [AntiLagType.STRONG]: 'Strong',
};

export const TRANSMISSION: Record<TransmissionType, string> = {
  [TransmissionType.NORMAL]: 'Normal',
  [TransmissionType.CLOSE_RATIO_LOW]: 'Close-Ratio Low',
  [TransmissionType.CLOSE_RATIO_HIGH]: 'Close-Ratio High',
  [TransmissionType.FULLY_CUSTOMISABLE_MANUAL]: 'Fully Customisable Manual',
  [TransmissionType.FULLY_CUSTOMISABLE_RACING]: 'Fully Customisable Racing',
};

export const INTERCOOLER: Record<IntercoolerType, string> = {
  [IntercoolerType.NONE]: 'None',
  [IntercoolerType.NORMAL]: 'Normal',
  [IntercoolerType.SPORTS]: 'Sports',
  [IntercoolerType.RACING]: 'Racing',
};

export const AIR_CLEANER: Record<AirCleanerType, string> = {
  [AirCleanerType.NONE]: 'None',
  [AirCleanerType.NORMAL]: 'Normal',
  [AirCleanerType.SPORTS]: 'Sports',
  [AirCleanerType.RACING]: 'Racing',
};

export const SILENCER: Record<SilencerType, string> = {
  [SilencerType.NORMAL]: 'Normal',
  [SilencerType.SPORTS]: 'Sports',
  [SilencerType.SEMI_RACING]: 'Semi-Racing',
  [SilencerType.RACING]: 'Racing',
};

export const CLUTCH: Record<ClutchFlywheelType, string> = {
  [ClutchFlywheelType.NORMAL]: 'Normal',
  [ClutchFlywheelType.SPORTS]: 'Sports',
  [ClutchFlywheelType.SEMI_RACING]: 'Semi-Racing',
  [ClutchFlywheelType.RACING]: 'Racing',
};

export const EXHAUST_MANIFOLD: Record<ExhaustManifoldType, string> = {
  [ExhaustManifoldType.NONE]: 'None',
  [ExhaustManifoldType.NORMAL]: 'Normal',
  [ExhaustManifoldType.RACING]: 'Racing',
};

export const BRAKE_PADS: Record<BrakePadsType, string> = {
  [BrakePadsType.NORMAL]: 'Normal',
  [BrakePadsType.SPORTS]: 'Sports',
  [BrakePadsType.RACING]: 'Racing',
};

export const PROPELLER_SHAFT: Record<PropellerShaftType, string> = {
  [PropellerShaftType.NONE]: 'None',
  [PropellerShaftType.NORMAL]: 'Normal',
  [PropellerShaftType.CARBON]: 'Carbon',
};

export const HANDBRAKE: Record<HandbrakeType, string> = {
  [HandbrakeType.NORMAL]: 'Normal',
  [HandbrakeType.HYDRAULIC]: 'Sports',
};

export const STEERING: Record<SteeringAngleKitType, string> = {
  [SteeringAngleKitType.NORMAL]: 'Normal',
  [SteeringAngleKitType.ADAPTER]: 'Adapter',
};

export const AWS: Record<FourWheelSteeringType, string> = {
  [FourWheelSteeringType.NONE]: 'None',
  [FourWheelSteeringType.FOUR_WHEEL_STEERING]: 'Four Wheel Steering',
};

export const BRAKE_BALANCE: Record<BrakeBalanceType, string> = {
  [BrakeBalanceType.NORMAL]: 'Normal',
  [BrakeBalanceType.CONTROLLER]: 'Sports',
};

export const TURBO: Record<TurbochargerType, string> = {
  [TurbochargerType.NONE]: 'None',
  [TurbochargerType.NORMAL]: 'Normal',
  [TurbochargerType.LOW_RPM]: 'Low-RPM',
  [TurbochargerType.MEDIUM_RPM]: 'Medium-RPM',
  [TurbochargerType.HIGH_RPM]: 'High-RPM',
  [TurbochargerType.ULTRA_HIGH_RPM]: 'Ultra-High-RPM',
};

export const BRAKE_SYSTEM: Record<BrakeSystemType, string> = {
  [BrakeSystemType.NORMAL]: 'Normal',
  [BrakeSystemType.SPORTS]: 'Sports',
  [BrakeSystemType.RACING_SLOTTED]: 'Racing (Slotted Disks)',
  [BrakeSystemType.RACING_DRILLED]: 'Racing (Drilled Disks)',
  [BrakeSystemType.CARBON]: 'Carbon',
};

export const SUPERCHARGER: Record<SuperchargerType, string> = {
  [SuperchargerType.NONE]: 'None',
  [SuperchargerType.NORMAL]: 'Normal',
  [SuperchargerType.LOW_END_TORQUE]: 'Low-End Torque',
  [SuperchargerType.HIGH_END_TORQUE]: 'High-End Torque',
  [SuperchargerType.HIGH_RPM]: 'High-RPM',
};

export const TYRES: Record<TyreType, string> = {
  [TyreType.CH]: 'Comfort Hard',
  [TyreType.CM]: 'Comfort Medium',
  [TyreType.CS]: 'Comfort Soft',
  [TyreType.SH]: 'Sports Hard',
  [TyreType.SM]: 'Sports Medium',
  [TyreType.SS]: 'Sports Soft',
  [TyreType.RH]: 'Racing Hard',
  [TyreType.RM]: 'Racing Medium',
  [TyreType.RS]: 'Racing Soft',
  [TyreType.IM]: 'Intermediate',
  [TyreType.W]: 'Heavy Wet',
  [TyreType.D]: 'Dirt',
  [TyreType.S]: 'Snow',
};
