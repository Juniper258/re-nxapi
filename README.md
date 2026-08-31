# Nintendo Switch Discord Presence

Multiplatform tool (Linux and Windows) to display your Nintendo Switch gameplay activity and play time on your Discord Rich Presence in real time.

## Repository Structure

```
├── assets/                  # Icons and graphic resources
├── linux-config/            # Installation scripts and desktop shortcuts for Linux
│   ├── install.sh
│   ├── nxapi.desktop
│   └── autostart-nxapi.desktop
└── src/                     # Source code
    ├── nxapi/               # Official nxapi source code (TypeScript / Electron)
    └── nso-rpc-python/      # Alternative Python implementation (NSO-RPC fork)
```

## Installation

### Linux

1. Run the automatic installation script:
   ```bash
   bash linux-config/install.sh
   ```
2. Or run the AppImage directly (download from [Releases](../../releases)):
   ```bash
   chmod +x installers/Nintendo.Switch.Online-Linux.AppImage
   ./installers/Nintendo.Switch.Online-Linux.AppImage
   ```

### Windows

1. Run the installer from [Releases](../../releases).
2. Follow the installer instructions.

## Initial Setup

1. Open the application and log in with your Nintendo account.
2. After authenticating in the browser, copy the link from the **"Select this account"** button if prompted.
3. In the main application interface, enable **"Enable Discord Presence"** to sync your console with Discord.
4. You can enable **"Open at login"** to run it automatically in the background every time you start your computer.

## Python Implementation (NSO-RPC)

An alternative implementation in Python is available under `src/nso-rpc-python/`. This is a patched fork of [NSO-RPC](https://github.com/MCMi460/NSO-RPC) with:

- SSL verification bypass (workaround for expired `api.imink.app` certificate)
- Fallback to `nxapi-znca-api` if the primary f-token API is unavailable

### Running the Python version

```bash
cd src/nso-rpc-python
pip install -r requirements.txt

# CLI mode
python cli.py

# GUI mode (requires PyQt6)
python app.py
```

> **Note:** Nintendo has recently broken third-party authentication. Automatic login may not work at this time.

## Privacy

This repository **does not include** session data, authentication tokens, or any private account information.

## Credits

- [nxapi](https://github.com/samuelthomas2774/nxapi) by samuelthomas2774
- [NSO-RPC](https://github.com/MCMi460/NSO-RPC) by MCMi460
- [SwitchRPCUpdated](https://github.com/queenbiscuit311/SwitchRPCUpdated) by queenbiscuit311

## License

See individual source directories for their respective licenses.
