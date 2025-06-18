import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    FORMAT_TEXT_COMMAND,

} from "lexical";

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();

    return (
        <div className="flex gap-2 mb-2 border-b pb-2">
            <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>Bold</button>
            <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>Italic</button>
            <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>Underline</button>
            <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}>Strike</button>

        </div>
    );
}
