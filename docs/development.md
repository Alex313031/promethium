# Development

## IPC

The preferred way to communicate between processes is to use the [`promethium-rpc`](https://github.com/Alex313031/promethium-rpc) package (Also forked by me). It is still under the name `@wexond/rpc-electron` for compatibility.

Examples:

Handling the IPC message in the main process:

[`src/main/network/network-service-handler.ts`](../src/main/network/network-service-handler.ts)


Sending the IPC message to the main process:

```ts
const { data } = await networkMainChannel.getInvoker().request('http://localhost');
```

Common RPC interface

[`src/common/rpc/network.ts`](../src/common/rpc/network.ts)

## Remote module

As Electron deprecated the `remote` module, I am now using the `@electron/remote` package.

## Node integration

We are going to turn off `nodeIntegration`, enable `contextIsolation` and `sandbox` in the UI webContents,
therefore we prefer not having requires to node.js built-in modules in renderers.

## Project structure

Common interfaces, etc. should land into the `common` directory. \
Common constants should land into the `constants` directory. \
Much of the UI (hosted in Electorn renderer processes) will be in the `renderer` directory.
