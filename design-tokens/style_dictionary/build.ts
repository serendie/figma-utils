import StyleDictionary from "style-dictionary-utils";
import "./parser";
import "./formatter";
import "./transformer";
import "./filter";
import { customFileHeader } from "./customFileHeader";

StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      buildPath: "dist/",
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/css",
        "serendie/cssShadow",
        "serendie/cssTypography",
      ],
      options: {
        fileHeader: customFileHeader,
      },
      files: [
        {
          destination: "tokens.css",
          format: "serendie/cssWithTheme",
          filter: "serendie/excludeInternal",
        },
      ],
    },
    js: {
      buildPath: "dist/",
      options: {
        fileHeader: customFileHeader,
      },
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "time/seconds",
        "content/icon",
        "color/css",
      ],
      files: [
        {
          destination: "tokens.js",
          format: "serendie/jsModule",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "tokens.d.ts",
          format: "serendie/jsModuleDeclarations",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "panda-tokens.js",
          format: "serendie/pandaToken",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "panda-tokens.d.ts",
          format: "serendie/pandaTokenDeclarations",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "token-list.js",
          format: "serendie/tokenList",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "token-list.d.ts",
          format: "serendie/tokenListDeclarations",
          filter: "serendie/excludeInternal",
        },
      ],
    },
  },
}).buildAllPlatforms();
