# re-nxapi

Display your Nintendo Switch gameplay activity and play time on your Discord Rich Presence in real time using [nxapi](https://github.com/samuelthomas2774/nxapi).

## Features

- See what game you're playing on Nintendo Switch on your Discord profile
- Automatic activity sync
- Works on Linux (AppImage) and Windows

## Installation

### Linux

Download the AppImage from [Releases](../../releases):

```bash
chmod +x re-nxapi.AppImage
./re-nxapi.AppImage
```

Or run the installation script for desktop integration:

```bash
bash linux-config/install.sh
```

### Windows

Download the zip from [Releases](../../releases), extract and run `re-nxapi.exe`.

## Usage

1. Open the application and log in with your Nintendo account.
2. After authenticating in the browser, copy the link from the **"Select this account"** button if prompted.
3. In the main application interface, enable **"Enable Discord Presence"** to sync your console with Discord.
4. You can enable **"Open at login"** to run it automatically in the background every time you start your computer.

## About

This project uses [nxapi](https://github.com/samuelthomas2774/nxapi), an unofficial API and CLI tool for Nintendo Switch Online, to connect your Switch activity to Discord.

## Repository Structure

```
├── assets/                  # Icons and graphic resources (PNG, SVG)
├── installers/              # Pre-built binaries for download
│   ├── re-nxapi.AppImage    # Linux portable executable
│   └── re-nxapi-Windows.zip # Windows portable (extract and run .exe)
├── linux-config/            # Linux desktop integration
│   ├── install.sh           # Auto-installer script
│   ├── nxapi.desktop        # Desktop shortcut
│   └── autostart-nxapi.desktop # Start on login
└── src/nxapi/               # nxapi source code (TypeScript/Electron)
```

## Privacy

This repository **does not include** session data, authentication tokens, or any private account information.

## Credits

- [nxapi](https://github.com/samuelthomas2774/nxapi) by samuelthomas2774

## License

See individual source directories for their respective licenses.
