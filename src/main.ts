import { PitchDetector } from 'pitchy'

const A4_HZ = 440
const IN_TUNE_CENTS = 5
const BUFFER_SIZE = 2048
const MIN_CLARITY = 0.85

const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const

const startBtn = document.querySelector<HTMLButtonElement>('#start-btn')!
const statusEl = document.querySelector<HTMLDivElement>('#status')!
const outputEl = document.querySelector<HTMLDivElement>('#output')!

const detector = PitchDetector.forFloat32Array(BUFFER_SIZE)
const timeDomainBuffer = new Float32Array(BUFFER_SIZE)

let audioContext: AudioContext | null = null
let analyser: AnalyserNode | null = null

function frequencyToMidi(frequency: number): number {
  return 69 + 12 * Math.log2(frequency / A4_HZ)
}

function midiToFrequency(midi: number): number {
  return A4_HZ * 2 ** ((midi - 69) / 12)
}

function noteNameFromMidi(midi: number): string {
  const rounded = Math.round(midi)
  const name = NOTE_NAMES[((rounded % 12) + 12) % 12]
  const octave = Math.floor(rounded / 12) - 1
  return `${name}${octave}`
}

function centsFromFrequency(frequency: number): { cents: number; midi: number } {
  const midi = frequencyToMidi(frequency)
  const nearestMidi = Math.round(midi)
  const nearestHz = midiToFrequency(nearestMidi)
  const cents = 1200 * Math.log2(frequency / nearestHz)
  return { cents, midi: nearestMidi }
}

function setStatus(message: string): void {
  statusEl.textContent = message
}

function renderOutput(
  note: string,
  frequency: number,
  cents: number,
  inTune: boolean,
): void {
  const centsRounded = Math.round(cents)
  const sign = centsRounded > 0 ? '+' : ''
  outputEl.innerHTML = [
    `Note: ${note}`,
    `Frequency: ${frequency.toFixed(1)} Hz`,
    `Cents: ${sign}${centsRounded}`,
    inTune ? '<div id="in-tune">IN TUNE</div>' : '',
  ].join('\n')
}

function renderIdle(): void {
  outputEl.textContent = [
    'Note: —',
    'Frequency: —',
    'Cents: —',
  ].join('\n')
}

function updateDisplay(): void {
  if (!analyser || !audioContext) {
    return
  }

  analyser.getFloatTimeDomainData(timeDomainBuffer)
  const [frequency, clarity] = detector.findPitch(
    timeDomainBuffer,
    audioContext.sampleRate,
  )

  if (frequency <= 0 || clarity < MIN_CLARITY) {
    renderIdle()
    requestAnimationFrame(updateDisplay)
    return
  }

  const { cents, midi } = centsFromFrequency(frequency)
  const note = noteNameFromMidi(midi)
  const inTune = Math.abs(cents) <= IN_TUNE_CENTS
  renderOutput(note, frequency, cents, inTune)
  requestAnimationFrame(updateDisplay)
}

async function startTuning(): Promise<void> {
  startBtn.disabled = true
  setStatus('Requesting microphone access…')

  if (!navigator.mediaDevices?.getUserMedia) {
    setStatus('Microphone access is not supported in this browser.')
    startBtn.disabled = false
    return
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    audioContext = new AudioContext()
    if (audioContext.state === 'suspended') {
      await audioContext.resume()
    }

    const source = audioContext.createMediaStreamSource(stream)
    analyser = audioContext.createAnalyser()
    analyser.fftSize = BUFFER_SIZE
    source.connect(analyser)

    setStatus('Listening… play a note on your violin.')
    renderIdle()
    requestAnimationFrame(updateDisplay)
  } catch (err) {
    startBtn.disabled = false
    renderIdle()

    if (err instanceof DOMException && err.name === 'NotAllowedError') {
      setStatus(
        'Microphone access was denied. Allow microphone access in your browser settings, then tap Start again.',
      )
      return
    }

    const detail = err instanceof Error ? err.message : String(err)
    setStatus(`Could not start tuning: ${detail}`)
  }
}

startBtn.addEventListener('click', () => {
  void startTuning()
})

renderIdle()
