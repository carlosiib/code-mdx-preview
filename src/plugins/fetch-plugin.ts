import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // onLoad: Fetch content of module
      // Handle Version: import React from 'react@16.0.0'
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        // Cached layer
        const cachedResult =
          await fileCache.getItem<esbuild.OnLoadResult>(
            args.path
          );

        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(
          args.path
        );

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL)
            .pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
