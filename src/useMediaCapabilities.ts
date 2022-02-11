import { useEffect, useState } from "react";
import { CapabilityProfile } from "./common/types";
import { getMediaCapabilities } from "./common/utilities";

export function useAudioCapabilities(audioConfiguration: AudioConfiguration): {
  encodingProfile: CapabilityProfile;
  decodingProfile: CapabilityProfile;
} {
  const [encodingProfile, setEncodingProfile] = useState<CapabilityProfile>(
    () => {
      return {
        type: "unavailable",
      };
    }
  );
  const [decodingProfile, setDecodingProfile] = useState<CapabilityProfile>(
    () => {
      return {
        type: "unavailable",
      };
    }
  );
  const mediaCapabilities = getMediaCapabilities();

  useEffect(() => {
    const getEncodingInfo = async () => {
      if (mediaCapabilities && "encodingInfo" in mediaCapabilities) {
        const result = await mediaCapabilities
          .encodingInfo({
            type: "record",
            audio: audioConfiguration,
          })
          .catch((e) => e);
        if (result instanceof Error) {
          setEncodingProfile({
            type: "invalid",
          });
        } else {
          const { supported, smooth, powerEfficient } = result;
          setEncodingProfile({
            type: "valid",
            supported: supported,
            smooth: smooth,
            powerEfficient: powerEfficient,
          });
        }
      }
    };
    getEncodingInfo();
  }, []);

  useEffect(() => {
    const getDecodingInfo = async () => {
      if (mediaCapabilities && "decodingInfo" in mediaCapabilities) {
        const result = await mediaCapabilities
          .decodingInfo({
            type: "file",
            audio: audioConfiguration,
          })
          .catch((e) => e);
        if (result instanceof Error) {
          setDecodingProfile({
            type: "invalid",
          });
        } else {
          const { supported, smooth, powerEfficient } = result;
          setDecodingProfile({
            type: "valid",
            supported: supported,
            smooth: smooth,
            powerEfficient: powerEfficient,
          });
        }
      }
    };
    getDecodingInfo();
  }, []);

  return { encodingProfile, decodingProfile };
}

export function useVideoCapabilities(videoConfiguration: VideoConfiguration): {
  encodingProfile: CapabilityProfile;
  decodingProfile: CapabilityProfile;
} {
  const [encodingProfile, setEncodingProfile] = useState<CapabilityProfile>(
    () => {
      return {
        type: "unavailable",
      };
    }
  );
  const [decodingProfile, setDecodingProfile] = useState<CapabilityProfile>(
    () => {
      return {
        type: "unavailable",
      };
    }
  );

  const mediaCapabilities = getMediaCapabilities();

  useEffect(() => {
    const getEncodingInfo = async () => {
      if (mediaCapabilities && "encodingInfo" in mediaCapabilities) {
        const result = await mediaCapabilities
          .encodingInfo({
            type: "record",
            video: videoConfiguration,
          })
          .catch((e) => e);
        if (result instanceof Error) {
          setEncodingProfile({
            type: "invalid",
          });
        } else {
          const { supported, smooth, powerEfficient } = result;
          setEncodingProfile({
            type: "valid",
            supported: supported,
            smooth: smooth,
            powerEfficient: powerEfficient,
          });
        }
      }
    };
    getEncodingInfo();
  }, []);

  useEffect(() => {
    const getDecodingInfo = async () => {
      if (mediaCapabilities && "decodingInfo" in mediaCapabilities) {
        const result = await mediaCapabilities
          .decodingInfo({
            type: "file",
            video: videoConfiguration,
          })
          .catch((e) => e);
        if (result instanceof Error) {
          setDecodingProfile({
            type: "invalid",
          });
        } else {
          const { supported, smooth, powerEfficient } = result;
          setDecodingProfile({
            type: "valid",
            supported: supported,
            smooth: smooth,
            powerEfficient: powerEfficient,
          });
        }
      }
    };
    getDecodingInfo();
  }, []);

  return { encodingProfile, decodingProfile };
}
