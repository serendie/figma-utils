import { Command } from "commander";
import { syncToFigma } from "../json_to_figma/sync_tokens_to_figma.js";

const program = new Command();

program
  .name("sync-to-figma")
  .description("デザイントークンをFigmaに同期します")
  .option("-s, --silent", "詳細なログ出力を抑制します")
  .action(async (options) => {
    try {
      await syncToFigma({
        silent: options.silent,
      });
    } catch (error) {
      console.error("❌ エラーが発生しました:", error);
      process.exit(1);
    }
  });

program.parse();
