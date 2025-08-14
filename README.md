[![Deploy Status](https://api.netlify.com/api/v1/badges/12003f20-8161-4f15-957d-2bb7893625ee/deploy-status)](https://app.netlify.com/projects/wellness-timer/deploys) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Lighthouse Performance](https://img.shields.io/endpoint?url=https%3A%2F%2Fwellness-timer.netlify.app%2Freports%2Flighthouse-performance.json&style=flat&logoColor=white&logo=lighthouse)](https://wellness-timer.netlify.app/reports/lighthouse.html) [![Lighthouse Accessibility](https://img.shields.io/endpoint?url=https%3A%2F%2Fwellness-timer.netlify.app%2Freports%2Flighthouse-accessibility.json&style=flat&logoColor=white&logo=lighthouse)](https://wellness-timer.netlify.app/reports/lighthouse.html) [![Lighthouse Best Practices](https://img.shields.io/endpoint?url=https%3A%2F%2Fwellness-timer.netlify.app%2Freports%2Flighthouse-best-practices.json&style=flat&logoColor=white&logo=lighthouse)](https://wellness-timer.netlify.app/reports/lighthouse.html) [![Lighthouse SEO](https://img.shields.io/endpoint?url=https%3A%2F%2Fwellness-timer.netlify.app%2Freports%2Flighthouse-seo.json&style=flat&logoColor=white&logo=lighthouse)](https://wellness-timer.netlify.app/reports/lighthouse.html)

<div align="center">
    <img src="src/images/lotus.png" alt="Logo" width="80" height="80">

  <h1 align="center">Wellness Timer</h1>

  <p align="center">
    An elegant timer app to aid in meditation or other wellness practices
    <br />
  </p>
</div>

<details>
<summary><strong>Table of Contents</strong></summary>

- [About this project](#about-this-project)
- [Getting Started](#getting-started)
  - [Live Demo](#live-demo)
  - [Development](#development)
- [Implementation notes](#implementation-notes)
  - [Application](#application)
  - [Testing](#testing)
  - [Infrastructure](#infrastructure)
- [Contact](#contact)

</details>

## About this project

<div align="center">
<img src="public/screenshots/timer_screen_shot.webp" height="500px" />
</div>

This codebase demonstrates good software development practices for a single page web application through a wellness timer with the following features:

- **Responsive Design** - Adaptive interface that works seamlessly across desktop, tablet, and mobile devices
- **Intuitive Timer Controls** - Interactive digit adjustment via swipe gestures on touch devices or click controls on desktop
- **Customizable Duration** - Set meditation sessions from 1 to 99 minutes with precise second-level control
- **Beautiful Themes** - Multiple visual themes including Aurora and Water backgrounds for ambiance
- **Progressive Web App** - Installable as a native app with offline functionality and service worker caching
- **Audio Feedback** - Gentle bell sound notification when meditation session completes
- **Screen Wake Lock** - Prevents device from sleeping during active meditation sessions
- **Accessibility** - Full ARIA label support and keyboard navigation for inclusive design

## Getting Started

### Live Demo

A live demonstration of the running application can be accessed here: https://wellness-timer.netlify.app/

### Development

A local containerised development environment can be set up in minutes using the supplied DevContainer config and Docker. DevContainer plugins are available for most major IDEs (including Visual Studio Code and IntelliJ).

#### Useful development commands

- `npm start` - Start the dev server on port 3000
- `npx cypress run` - Run the BDD test suite
- `npm run build` - Create a production build of the application

## Implementation notes

### Application

- **TypeScript** - Ensures type safety and better developer experience with compile-time error detection and enhanced IDE support
- **React** - Industry standard UI component building library providing declarative, component-based architecture
- **Material Design (MUI) library** - Professional UI components following Google's Material Design principles for consistent, accessible interfaces
- **Emotion** - CSS-in-JS library enabling dynamic styling and theme management with excellent performance

The application architecture follows modern React patterns with custom hooks for timer logic, separation of concerns through component composition, and responsive design principles. TypeScript provides compile-time safety while Emotion enables theming and responsive styling.

### Testing

- **Behaviour Driven Development** - User-story focused testing approach ensuring features meet real-world usage scenarios
- **Cucumber** - Gherkin syntax BDD framework allowing non-technical stakeholders to understand test scenarios
- **Cypress** - Modern end-to-end testing framework providing reliable browser automation and excellent debugging capabilities
- **Lighthouse** - Automated performance, accessibility, and SEO auditing integrated into the CI/CD pipeline for continuous quality monitoring

The testing strategy emphasises user behaviour over implementation details, with comprehensive scenarios covering timer functionality, user interactions, and edge cases. Cypress provides visual testing feedback and reliable cross-browser compatibility validation. Lighthouse ensures the application maintains high performance standards and accessibility compliance with every deployment.

### Infrastructure

- **GitHub** - Version control and CI/CD pipeline with automated testing, dependency management via Dependabot, and security scanning
- **Netlify** - Serverless deployment platform with automatic builds, branch previews, and global CDN distribution for optimal performance
- **Continuous Deployment** - Automated build and deployment pipeline triggered by git commits, including integrated testing and Lighthouse performance audits

The infrastructure emphasises automation and reliability with smart build optimisation (only rebuilding when source files change), comprehensive test integration, and performance monitoring. The setup demonstrates modern DevOps practices with minimal maintenance overhead.

Netlify streamlines the deployment process by automatically triggering builds on pushes to the main branch and pull requests. Each pull request receives a preview deployment link within GitHub, enabling stakeholders to review changes before merging. The platform provides dynamically scaling hosting with global CDN distribution and optimised infrastructure, requiring minimal configuration or maintenance effort.

The Lighthouse performance badges visible at the top are automatically updated during each deployment via a custom plugin.
