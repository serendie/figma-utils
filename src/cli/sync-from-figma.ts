#!/usr/bin/env node
import { Command } from "commander";

import { syncFromFigma } from "../figma_to_json/index.js";

const program = new Command();

program
  .name("sync-from-figma")
  .description("Figmaからデザイントークンを同期します")
  .option("-o, --output <directory>", "出力ディレクトリを指定", "tokens")
  .action(async (options) => {
    try {
      await syncFromFigma({
        outputDir: options.output,
      });
      console.log("✨ デザイントークンの同期が完了しました");
    } catch (error) {
      console.error("❌ エラーが発生しました:", error);
      process.exit(1);
    }
  });

program.parse();
