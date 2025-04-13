/*
 * Copyright (c) 1986-2025 Ecmel Ercan (https://ecmel.dev/)
 * All rights reserved.
 */

import {
  ExtensionContext,
  Uri,
  commands,
  debug,
  window,
  workspace,
} from "vscode";

let name: string | undefined;
let timeout: any;

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("vscode-launcher.run", () => {
      if (name) {
        const uri = getUri();
        if (uri) {
          debug.startDebugging(workspace.getWorkspaceFolder(uri), name);
        }
      }
    }),
    window.onDidChangeActiveTextEditor((editor) => {
      update(editor?.document.uri);
    })
  );
  update(getUri());
}

export function deactivate() {
  update();
}

interface PatternMap {
  name: string;
  pattern: string;
}

function getUri(): Uri | undefined {
  return window.activeTextEditor?.document.uri;
}

function update(uri?: Uri): void {
  clearTimeout(timeout);
  name = getDebugConfigName(uri);
  if (name) {
    setContext();
  } else {
    timeout = setTimeout(setContext, 250);
  }
}

function setContext() {
  commands.executeCommand("setContext", "launcher.name", name);
}

function getDebugConfigName(uri?: Uri): string | undefined {
  if (uri) {
    const folder = workspace.getWorkspaceFolder(uri);
    if (folder) {
      const config = workspace.getConfiguration("launcher", folder);
      for (const mapping of config.get<PatternMap[]>("mappings", [])) {
        const regex = new RegExp(mapping.pattern);
        if (regex.test(uri.fsPath)) {
          return mapping.name;
        }
      }
    }
  }
  return undefined;
}
