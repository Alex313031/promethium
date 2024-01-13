#!/bin/bash

# Copyright(c) 2024 Alex313031

YEL='\033[1;33m' # Yellow
CYA='\033[1;96m' # Cyan
RED='\033[1;31m' # Red
GRE='\033[1;32m' # Green
c0='\033[0m' # Reset Text
bold='\033[1m' # Bold Text
underline='\033[4m' # Underline Text

# Error handling
yell() { echo "$0: $*" >&2; }
die() { yell "$*"; exit 111; }
try() { "$@" || die "${RED}Failed $*"; }

# Set msvs_version for node-gyp on Windows
export MSVS_VERSION="2022" &&
export GYP_MSVS_VERSION="2022" &&
# Download electron binaries here
export ELECTRON_CACHE="${PWD}/electron" &&
export electron_config_cache="${PWD}/electron" &&

# --help
displayHelp () {
	printf "\n" &&
	printf "${bold}${GRE}Script to clean node_modules and build artifacts.${c0}\n" &&
	printf "\n"
}
case $1 in
	--help) displayHelp; exit 0;;
esac

printf "\n" &&
printf "${bold}${YEL} Cleaning artifacts and node_modules...${c0}\n" &&
	
npm run clean &&

tput sgr0
