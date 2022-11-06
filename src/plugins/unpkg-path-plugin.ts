import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file, no module required
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      // Handle relative path in a module - nested files
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a",
          path: new URL(
            args.path,
            "https://unpkg.com" + args.resolveDir + "/"
          ).href,
        };
      });

      // Handle main file of a module
      build.onResolve(
        { filter: /.*/ },
        async (args: any) => {
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
