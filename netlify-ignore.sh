#!/bin/bash
# Netlify ignore script: skip build unless changes in public/, src/, or tests/

# If CACHED_COMMIT_REF is unset, empty, or equal to COMMIT_REF (which Netlify
# sets when running without cache), we can't determine what changed — build to be safe.
if [ -z "$CACHED_COMMIT_REF" ] || [ "$CACHED_COMMIT_REF" = "$COMMIT_REF" ]; then
  echo "CACHED_COMMIT_REF is unset or identical to COMMIT_REF; defaulting to build"
  exit 1
fi

# Get list of changed files between HEAD and the last deployed commit
CHANGED_FILES=$(git diff --name-only "$CACHED_COMMIT_REF" "$COMMIT_REF")

# Check if any files have been changed that require an app deploy
echo "$CHANGED_FILES" | grep -E '^(public/|src/|tests/|cypress/|netlify|pwa_manifest)' > /dev/null
if [ $? -eq 0 ]; then
  # There are changes in the watched directories, do not ignore build
  exit 1
else
  # No changes in watched directories, skip build
  exit 0
fi
