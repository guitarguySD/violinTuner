# Violin Tuner

A focused, ad-free violin tuner web app.

## Motivation

Free violin tuners on the web and mobile app stores are functionally adequate but degraded by intrusive advertising — interstitials, banners that obscure the tuning display, and autoplay video ads. This project aims to provide a fast, ad-free tuner that prioritizes the tuning task above all else.

## Status

Early development. Requirements drafted; implementation not yet started.

## Features (planned)

- Microphone-based pitch detection for the four violin strings (G, D, A, E)
- Traditional analog-style needle for fine tuning (±50 cents range)
- Horizontal bar showing absolute pitch position with G/D/A/E tick marks for wide-range guidance
- Reference tone playback for each open string
- Auto-detect and manual string-select modes
- Adjustable reference pitch (415–466 Hz, default A=440)
- No ads, no tracking, no account required
- Installable as a Progressive Web App

## Platform

Web app, installable as a PWA. Primary target is Android via browser; works on desktop browsers as well. Requires HTTPS for microphone access.

## Documentation

See [`violin-tuner-requirements.md`](./violin-tuner-requirements.md) for the full requirements specification.

## License

TBD
