# Robot Framework + Appium Mobile Automation

## Overview
This project evaluates an AI's ability to structure and write Robot Framework keywords using Appium for the Sauce Labs My Demo App (React Native).

## Prerequisites
* Python 3.11+
* Appium 2.x server running
* Android SDK or Xcode installed and configured

## Setup
```bash
pip install -r requirements.txt
appium
```

## Folder Structure
* `resources/` - Robot Framework keyword resource files
* `tests/` - Test suite files
* `variables/` - Environment/Platform specific variable files
* `reports/` - Generated execution reports
* `apps/` - Local app binaries (.apk, .app)

## Running Tests
Run Android tests:
```bash
robot -d reports -V variables/android_vars.robot tests/
```

Run iOS tests:
```bash
robot -d reports -V variables/ios_vars.robot tests/
```
