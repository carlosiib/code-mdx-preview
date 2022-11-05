import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

// Cache layer
const fileCache = localforage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = () => {
  // onResolve: Tries to find the path of a given module
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve(
        { filter: /.*/ },
        async (args: any) => {
          console.log("onResolve", args);
          if (args.path === "index.js") {
            return { path: args.path, namespace: "a" };
          }

          if (
            args.path.includes("./") ||
            args.path.includes("../")
          ) {
            return {
              namespace: "a",
              path: new URL(
                args.path,
                "https://unpkg.com" + args.resolveDir + "/"
              ).href,
            };
          }

          return {
            namespace: "a",
            path: `https://unpkg.com/${args.path}`,
          };
        }
      );

      // onLoad: Fetch content of module
      // Handle Version: import React from 'react@16.0.0'
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              const react = require('react');
              console.log(message);
            `,
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
