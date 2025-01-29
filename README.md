# SDS Figma Utilities

[![GitHub](https://img.shields.io/github/license/serendie/figma-utils?style=flat)](https://github.com/serendie/figma-utils/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/%40serendie%2Ffigma-utils)](https://www.npmjs.com/package/@serendie/figma-utils)
[![X](https://img.shields.io/twitter/follow/SerendieDesign)](https://x.com/SerendieDesign/)

[Serendie Design System](https://serendie.design/)で使われるFigma用ユーティリティーです。
[`@serendie/design-token`](https://github.com/serendie/design-tokens)の中で定義される[W3C Design Tokens Spec](https://tr.designtokens.org/format/)準拠のJSONを、Figma VariablesにImport/Exportするスクリプトが含まれています。

なお、Figma REST APIを前提としており、利用にはFigmaエンタープライズプランが必要です。

## Usage

### Prepare

`.env`に下記を設定してください。

- `PERSONAL_ACCESS_TOKEN`
  - Variablesの[Read/Write Scope](https://www.figma.com/developers/api#authentication-scopes)を有するFigmaのpersonal access token
- `FILE_KEY`
  - Import/Export先のVariablesを有するFigmaファイルのKey
  - FigmaファイルのURLに含まれます (`https://www.figma.com/file/{FILE_KEY}/...`)

### Commands

**JSON to Figma Variables (Import)**
```
npm run sync-json-to-figma
```

**Figma Variables to JSON (Export)**
```
npm run sync-figma-to-json
```

## Spec

W3C Design Tokens Specではテーマ (Variablesモード) の扱いが定まっていないため、独自の命名規則を採用しています。詳しくは[こちら](https://github.com/serendie/serendie/tree/main/design-tokens#%E4%BB%95%E6%A7%98)を参照してください。
