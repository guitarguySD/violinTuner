# Violin Tuner — Requirements

## 1. Purpose and Background

Free violin tuners on the web and mobile app stores are functionally adequate but degraded by intrusive advertising — interstitials, banners that obscure the tuning display, and autoplay video ads — making them difficult to use during the actual act of tuning. This application aims to provide a fast, focused, ad-free violin tuner that prioritizes the tuning task above all else.

## 2. Target Users

- Adult beginner and intermediate violinists tuning at home before practice
- Fiddle players (same tuning as violin)
- Users who want to tune quickly without onboarding flows, account creation, or distractions

## 3. Functional Requirements

### 3.1 Microphone-based Tuning (primary mode)

- FR-1: The app captures audio from the device's default microphone.
- FR-2: The app detects the pitch of the played note and identifies the nearest target string (G, D, A, E) or, in chromatic mode, the nearest semitone.
- FR-3: The app displays a visual indicator (needle, meter, or equivalent) showing whether the played pitch is flat, sharp, or in tune relative to the target.
- FR-4: The app displays the detected note name and the deviation in cents.
- FR-5: The indicator updates in near real time (target latency: under 100 ms from sound to display).
- FR-6: The app indicates clearly when a string is "in tune" (within ±5 cents of target) via a visual cue.

### 3.2 Reference Tone Playback (secondary mode, for tuning by ear)

- FR-7: The app can play a reference tone for each of the four open strings (G, D, A, E) on demand.
- FR-8: The reference tone is a sustained pitch loud enough to hear over the violin, with a clear start/stop control.

### 3.3 String Selection and Mode

- FR-9: The app supports both auto-detect mode (identifies which string is being played) and manual string-select mode (user locks the target to one string).

### 3.4 Tuning Reference (Pitch Standard)

- FR-10: The app uses A=440 Hz as the default reference pitch.
- FR-11: The user can adjust the reference pitch within a reasonable range (415–466 Hz) to accommodate Baroque tuning, orchestra variants, or piano matching.

### 3.5 Microphone Permission Handling

- FR-12: On first use, the app requests microphone permission with a clear explanation of why it is needed.
- FR-13: If permission is denied, the app remains usable in reference-tone-only mode and explains how to re-enable the microphone.

### 3.6 Tuning Display

- FR-14: The primary tuning indicator is a traditional analog-style needle, centered when the pitch is on target, deflecting left when flat and right when sharp.
- FR-15: The needle's sensitive range covers roughly ±50 cents around the target pitch, giving fine resolution near center for precise tuning.
- FR-16: A secondary wide-range indicator is a horizontal bar showing absolute pitch position, with labeled tick marks at the four open-string targets (G, D, A, E). The detected dominant pitch appears as a moving marker along this bar, giving the user an at-a-glance view of which string they are near and how far off they are. The bar spans at least the range from a semitone below G3 to a semitone above E5 (the open-string range).
- FR-17: The wide-range indicator and the needle are visible simultaneously, not toggled.
- FR-18: When the detected pitch is within the needle's sensitive range, the needle is the primary point of focus; when it is outside that range, the wide-range indicator provides the guidance.
- FR-19: The wide-range horizontal bar always displays absolute pitch position regardless of the current mode (auto-detect or manual string-select). It does not have a "selected string" — the tick marks for G, D, A, and E are always visible as fixed reference points.

## 4. Non-Functional Requirements

### 4.1 No Advertising (core principle)

- NFR-1: The app contains no advertising of any kind — no banners, interstitials, video ads, sponsored content, or third-party ad SDKs.
- NFR-2: The app contains no analytics or tracking SDKs that exist primarily to support advertising.

### 4.2 Usability

- NFR-3: The tuner is fully usable within 2 taps/clicks of launch (e.g., "Start" → tune).
- NFR-4: The tuning display is legible at arm's length (large needle, large note name) so it can be read while holding the violin.
- NFR-5: No account creation, sign-in, or email capture is required to use any core feature.
- NFR-6: The app works offline once installed (no network round-trips required for tuning).

### 4.3 Accuracy

- NFR-7: Pitch detection is accurate to within ±2 cents under quiet conditions for sustained violin tones in the violin's playing range (roughly G3 to E7).
- NFR-8: The app handles violin harmonics and overtones without misidentifying the fundamental.

### 4.4 Performance

- NFR-9: Cold start to ready-to-tune in under 2 seconds on a typical modern device.
- NFR-10: CPU and battery usage are low enough for extended use (15+ minutes) without noticeable device heating.

### 4.5 Accessibility

- NFR-11: Color is not the sole indicator of "in tune" status (also use position, shape, or text) for color-vision-deficient users.
- NFR-12: Text scales with system font size settings.

## 5. Out of Scope (explicitly excluded for v1)

- Tuning instruments other than violin (no viola, cello, guitar, etc.)
- Recording or saving tuning sessions
- Lesson content, sheet music, or instructional video
- Social or sharing features
- User accounts or cloud sync
- Metronome

## 6. Platform (current direction)

- The initial target is a web application, accessed via browser on Android and desktop.
- The app should be installable as a Progressive Web App (PWA) so it can be launched from the Android home screen and used offline.
- HTTPS hosting is required for microphone access. Free options include GitHub Pages, Cloudflare Pages, Netlify, and Vercel.
- The app should request a screen wake lock while actively tuning to prevent the display from sleeping.
- A native Android app remains an option for a future version if web-based latency or permissions friction proves limiting.

## 7. Open Items

- Distribution model (deferred — premature to decide).
- Needle sensitivity range: ±50 cents is the current assumption; can be revisited.
- Wide-range bar extent: minimum spans G3 to E5 ±1 semitone; may extend further if useful.
