/*
 * Copyright (c) 1986-2025 Ecmel Ercan (https://ecmel.dev/)
 * All rights reserved.
 */

import * as sinon from "sinon";
import * as assert from "assert";
import * as vscode from "vscode";

describe("Extension Test Suite", () => {
  let launched = "";

  function setConfig(name: string, pattern: string) {
    sinon
      .stub(vscode.workspace, "getConfiguration")
      .value(() => ({ get: () => [{ name, pattern }] }));
    return name;
  }

  async function open() {
    const document = await vscode.workspace.openTextDocument({});
    await vscode.window.showTextDocument(document);
  }

  async function run() {
    await vscode.commands.executeCommand("vscode-launcher.run");
  }

  beforeEach(() => {
    launched = "";
    sinon
      .stub(vscode.debug, "startDebugging")
      .value((_: any, config: string) => {
        launched = config;
      });
    sinon.stub(vscode.workspace, "getWorkspaceFolder").value(() => ({}));
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should not reject when no context", async () => {
    await assert.doesNotReject(() => run());
  });

  it("should run when context available", async () => {
    const name = setConfig("Test", ".");
    await open();
    await run();
    assert.strictEqual(launched, name);
  });

  it("should not run when pattern does not match", async () => {
    setConfig("Test", "none");
    await open();
    await run();
    assert.strictEqual(launched, "");
  });
});
