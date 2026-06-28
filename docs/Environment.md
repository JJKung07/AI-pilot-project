# Environment Setup Guide

## Overview
This guide details the hardware and software requirements necessary to run the generated automation code and evaluate the AI assistants.

## Hardware Requirements
* Minimum 8GB RAM (16GB recommended for running emulators/simulators)
* Minimum 4 CPU Cores
* 20GB free disk space

## Software Prerequisites

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 20+ | Execution environment for Playwright |
| npm | 10+ | Package manager for Node dependencies |
| Python | 3.11+ | Execution environment for Robot Framework |
| pip | Latest | Package manager for Python dependencies |
| Java | 17 | Required for Appium Android testing |
| Android SDK | API 33+ | Android emulation |
| Xcode | 15+ (macOS only)| iOS simulation |
| Appium | 2.x | Mobile automation server |
| Robot Framework | 7.x | Keyword-driven testing framework |
| Playwright | 1.44+ | Web and API automation |

## Installation Steps

### 1. VS Code Extensions (Recommended)
Install the following for optimal AI interaction and code execution:
* Playwright Test for VS Code
* Robot Framework Language Server
* Python
* ESLint
* *Target AI Extension* (GitHub Copilot, Amazon Q, or Kiro)

### 2. Environment Variables
Create a `.env` file in the root of each sample project. Example for Web:
```bash
BASE_URL=https://www.saucedemo.com
API_URL=https://restful-booker.herokuapp.com
AUTH_TOKEN=
STANDARD_USER=standard_user
PASSWORD=secret_sauce
```

### 3. Playwright Setup (Web & API)
```bash
cd sample-project/playwright-web
npm install
npx playwright install --with-deps

cd ../playwright-api
npm install
npx playwright install --with-deps
```

### 4. Robot Framework Setup
```bash
cd sample-project/robot-framework
pip install -r requirements.txt
# Alternatively:
# pip install robotframework
# pip install robotframework-appiumlibrary
```

### 5. Appium Setup
```bash
npm install -g appium
appium driver install uiautomator2
# On macOS only:
appium driver install xcuitest
```

#### Android Emulator Notes
Ensure you have an AVD (Android Virtual Device) created in Android Studio and running before executing Appium tests.

#### iOS Simulator Notes (macOS Only)
Ensure Xcode is installed and run `xcrun simctl list` to find a valid simulator UDID.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `playwright: command not found` | Ensure you ran `npm install` and Node `bin` is in your PATH. |
| Appium cannot connect to emulator | Verify `adb devices` shows your running emulator. |
| Robot Framework module not found | Ensure you activate your Python virtual environment. |

## Cross-References
* [Pilot Guide](Pilot-Guide.md)
* [How to Test](How-to-Test.md)
