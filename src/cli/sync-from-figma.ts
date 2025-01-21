#!/usr/bin/env node
import { Command } from "commander";

import { syncFromFigma } from "../figma_to_json/index.js";
import chalk from "chalk";

const program = new Command();

program
  .name("sync-from-figma")
  .description("Figmaからデザイントークンを同期します")
  .option("-o, --output <directory>", "出力ディレクトリを指定", "tokens")
  .action(async (options) => {
    try {
      await syncFromFigma({
        outputDir: options.output,
      }).catch((error) => {
        throw error;
      });
      console.log(chalk.green("✨ デザイントークンの同期が完了しました"));
    } catch (error) {
      console.error(chalk.red("❌ エラーが発生しました:", error));
      process.exit(1);
    }
  });

program.parse();
