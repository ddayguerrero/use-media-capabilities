import { renderHook } from "@testing-library/react-hooks";
import { jest } from "@jest/globals";
import {
  UnavailableCapabilityProfile,
  ValidCapabilityProfile,
} from "./common/types";
import {
  useAudioCapabilities,
  useVideoCapabilities,
} from "./useMediaCapabilities";

beforeEach(() => {
  Object.defineProperty(global, "navigator", {
    writable: true,
    value: {
      mediaCapabilities: {
        encodingInfo: jest.fn(() => {
          return new Promise((resolve) => {
            resolve({
              supported: true,
              powerEfficient: false,
              smooth: false,
            });
          });
        }),
        decodingInfo: jest.fn(async () => {
          return new Promise((resolve) => {
            resolve({
              supported: true,
              powerEfficient: false,
              smooth: false,
            });
          });
        }),
      },
    },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("useAudioCapabilities", () => {
  test("returns valid audio encoding/decoding profiles", async () => {
    const expectedProfile: ValidCapabilityProfile = {
      type: "valid",
      powerEfficient: false,
      smooth: false,
      supported: true,
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useAudioCapabilities({
        contentType: "audio/flac",
        channels: "2",
        bitrate: 128000,
        samplerate: 16000,
      })
    );

    // allow the test to wait for the hook to update
    await waitForNextUpdate();

    expect(result.current).toStrictEqual({
      decodingProfile: expectedProfile,
      encodingProfile: expectedProfile,
    });
  });

  test("returns invalid audio encoding/decoding profiles", async () => {
    Object.defineProperty(global.navigator, "mediaCapabilities", {
      value: undefined,
    });

    const expectedProfile: UnavailableCapabilityProfile = {
      type: "unavailable",
    };

    const { result } = renderHook(() =>
      useAudioCapabilities({
        contentType: "audio/flac",
        channels: "2",
        bitrate: 128000,
        samplerate: 16000,
      })
    );

    expect(result.current).toStrictEqual({
      encodingProfile: expectedProfile,
      decodingProfile: expectedProfile,
    });
  });
});

describe("useVideoCapabilities", () => {
  test("returns valid video encoding/decoding profiles", async () => {
    const expectedProfile: ValidCapabilityProfile = {
      type: "valid",
      powerEfficient: false,
      smooth: false,
      supported: true,
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useVideoCapabilities({
        contentType: "video/webm;codecs=vp8",
        width: 800,
        height: 600,
        bitrate: 10000,
        framerate: 30,
      })
    );
    // allow the test to wait for the hook to update
    await waitForNextUpdate();

    expect(result.current).toStrictEqual({
      encodingProfile: expectedProfile,
      decodingProfile: expectedProfile,
    });
  });

  test("returns invalid video encoding/decoding profiles", async () => {
    Object.defineProperty(global.navigator, "mediaCapabilities", {
      value: undefined,
    });

    const expectedProfile: UnavailableCapabilityProfile = {
      type: "unavailable",
    };

    const { result } = renderHook(() =>
      useAudioCapabilities({
        contentType: "audio/flac",
        channels: "2",
        bitrate: 128000,
        samplerate: 16000,
      })
    );

    expect(result.current).toStrictEqual({
      encodingProfile: expectedProfile,
      decodingProfile: expectedProfile,
    });
  });
});
