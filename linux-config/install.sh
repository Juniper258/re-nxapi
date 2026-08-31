#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$HOME/Applications/nxapi"
ICON_DIR="$HOME/.local/share/icons/hicolor"
APPS_DIR="$HOME/.local/share/applications"
AUTOSTART_DIR="$HOME/.config/autostart"

echo "Installing Nintendo Switch Online (nxapi)..."
mkdir -p "$APP_DIR" "$APPS_DIR" "$AUTOSTART_DIR"

cp "$DIR/installers/Nintendo.Switch.Online-Linux.AppImage" "$APP_DIR/nxapi.AppImage"
chmod +x "$APP_DIR/nxapi.AppImage"

cp "$DIR/assets/icon.png" "$APP_DIR/icon.png"

for size in 16 32 48 64 128 256; do
  mkdir -p "$ICON_DIR/${size}x${size}/apps"
  cp "$DIR/assets/icon.png" "$ICON_DIR/${size}x${size}/apps/nxapi.png"
done

sed -e "s|Nintendo.Switch.Online-Linux.AppImage|$APP_DIR/nxapi.AppImage|g" \
    -e "s|Icon=nxapi|Icon=$APP_DIR/icon.png|g" \
    "$DIR/linux-config/nxapi.desktop" > "$APPS_DIR/nxapi.desktop"
chmod +x "$APPS_DIR/nxapi.desktop"

sed -e "s|Nintendo.Switch.Online-Linux.AppImage|$APP_DIR/nxapi.AppImage|g" \
    -e "s|Icon=nxapi|Icon=$APP_DIR/icon.png|g" \
    "$DIR/linux-config/autostart-nxapi.desktop" > "$AUTOSTART_DIR/nxapi.desktop"
chmod +x "$AUTOSTART_DIR/nxapi.desktop"

update-desktop-database "$APPS_DIR" 2>/dev/null || true
gtk-update-icon-cache -f "$ICON_DIR" 2>/dev/null || true

echo "Installation finished! nxapi is ready to use."
