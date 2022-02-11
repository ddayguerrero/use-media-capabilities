export type ValidCapabilityProfile = {
  type: "valid";
  supported: boolean;
  smooth: boolean;
  powerEfficient: boolean;
};

export type UnavailableCapabilityProfile = {
  type: "unavailable";
};

export type InvalidCapabilityProfile = {
  type: "invalid";
};

export type CapabilityProfile =
  | ValidCapabilityProfile
  | InvalidCapabilityProfile
  | UnavailableCapabilityProfile;
