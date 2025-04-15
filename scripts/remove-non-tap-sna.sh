#!/bin/bash

# Clean script for Spectrum files
# Usage: ./clean_spectrum_files.sh [directory]

set -euo pipefail

TARGET_DIR="${1:-.}"

echo "Cleaning directory: $TARGET_DIR"

# Safety check - prevent running on root directory
if [[ "$TARGET_DIR" == "/" ]]; then
  echo "ERROR: Refusing to run on root directory!" >&2
  exit 1
fi

# Delete files that match any of these conditions:
# 1. Not *.tap or *.sna files
# 2. Have "128k" in their filename (case insensitive)
# 3. Have [a], [a1], [a2], etc. pattern in filename
# 4. Have language tags like (fr), (de), (pt), (es) in any case
echo "Finding and removing files..."
find "$TARGET_DIR" -type f \( \
    \( -not -name "*.tap" -and -not -name "*.sna" \) -or \
    -iname "*128k*" -or \
    -name "*\[a*\]*" -or \
    \( -iname "*(fr)*" -o -iname "*(de)*" -o -iname "*(pt)*" -o -iname "*(es)*" \) \
\) -print -delete

# Remove empty directories (including those that become empty after file deletion)
echo "Removing empty directories..."
find "$TARGET_DIR" -type d -empty -print -delete

echo "Cleanup complete!"
