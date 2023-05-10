// Electron process.versions exports for About Page

export const ElectronVer = process.versions.electron;
export const ChromiumVer = process.versions.chrome;
export const V8Ver = process.versions.v8;
export const NodeVer = process.versions.node;

// Get Application Version
const AppVerNo = process.env.npm_package_version;
export const AppVer = process.env.npm_package_version ? AppVerNo : '6.1.3';
