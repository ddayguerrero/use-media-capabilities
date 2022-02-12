<br>

<h1 align="center">use-media-capabilities</h1>
<h4 align="center">A <a href="https://reactjs.org">React</a> hook to extract information about the decoding and encoding capabilities of a given audio or video format.</h3>
<br>

## Getting Started

### Quick Start

```shell
npm install use-media-capabilities
```

### Example
```tsx
import { useAudioCapabilities } from 'use-media-capabilities';

function EncodingStatus() {
  const {encodingProfile} = useAudioCapabilities({
    contentType: "audio/flac",
    channels: "2",
    bitrate: 128000,
    samplerate: 16000,
  });

  return (
   <div> Encoding for audio configuration is {encodingProfile.type === 'valid' && encodingProfile.powerEfficient ? '' : 'not' } power efficient.
    </div>
  );
}
```