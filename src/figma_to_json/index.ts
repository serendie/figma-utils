import "dotenv/config";
import { FigmaClient } from "./lib/FigmaClient";
import { resolveValue } from "./lib/resolveValue";
import { resolveVariableAlias } from "./lib/resolveVariableAlias";
import fs from "fs";
import { slashToDot } from "./lib/utils";
import path from "path";
import { resolveType } from "./lib/resolveType";
import { pathToObject } from "./lib/pathToObject";
import { resolveTypographyValue } from "./lib/resolveTypographyValue";
import { W3CToken } from "./types";

export interface SyncOptions {
  outputDir?: string;
}

export const syncFromFigma = async (options: SyncOptions = {}) => {
  if (!process.env.PERSONAL_ACCESS_TOKEN || !process.env.FILE_KEY) {
    throw new Error(
      "PERSONAL_ACCESS_TOKEN and FILE_KEY environment variables are required."
    );
  }

  const OUTPUT_DIR = options.outputDir || "tokens";

  const client = new FigmaClient(
    process.env.PERSONAL_ACCESS_TOKEN as string,
    process.env.FILE_KEY as string
  );

  const { variableCollections, variables } = await client.getLocalVariables();

  /*
   * Figmaから取得したデータを、W3C Token like な JSONに変換
   */
  const values = Object.values(variableCollections)
    .filter((v) => !v.remote)
    .map((collection) => {
      const { name, modes, variableIds } = collection;
      return {
        name,
        modes: modes.map((mode) => {
          return {
            modeName: mode.name,
            values: Object.values(variableIds).map((variableId) => {
              const variable = variables[variableId];
              const type = resolveType(variable);
              return {
                name: slashToDot(variable.name),
                description: variable.description || undefined,
                type,
                value: resolveValue(
                  resolveVariableAlias(variable, mode.modeId, variables),
                  type
                ),
                extensions: {
                  "com.figma": {
                    scopes: variable.scopes || undefined,
                  },
                },
              } as W3CToken;
            }),
          };
        }),
      };
    });

  /*
   * 各モードごとにファイルを出力
   */
  values.forEach((collection) => {
    const { name, modes } = collection;

    const [typeName, categoryName] = name.split("-");

    const isReferenceToken = categoryName === "reference";

    modes.forEach((mode) => {
      const dir = path.resolve(OUTPUT_DIR, categoryName);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const outputPath = path.resolve(dir, `${typeName}.${mode.modeName}.json`);

      // タイポグラフィ関連のトークンを統合
      //const typographyValues = resolveTypographyValue(mode.values);
      const typographyValues = isReferenceToken
        ? mode.values
        : resolveTypographyValue(mode.values);

      const mergedValues = typographyValues.reduce((acc, value) => {
        return pathToObject(
          value.name,
          {
            $value: value.value,
            $type: value.type,
            $description: value.description,
            $extensions: value.extensions,
          },
          acc
        );
      }, {});

      fs.writeFileSync(outputPath, JSON.stringify(mergedValues, null, 2));
    });
  });
};
