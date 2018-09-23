/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const tasks_1 = require("./tasks");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
function runSelectedScript() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    let document = editor.document;
    let contents = document.getText();
    let selection = editor.selection;
    let offset = document.offsetAt(selection.anchor);
    let script = tasks_1.findScriptAtPosition(contents, offset);
    if (script) {
        tasks_1.runScript(script, document);
    }
    else {
        let message = localize(0, null);
        vscode.window.showErrorMessage(message);
    }
}
exports.runSelectedScript = runSelectedScript;
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f46c4c469d6e6d8c46f268d1553c5dc4b475840f/extensions/npm/out/commands.js.map
