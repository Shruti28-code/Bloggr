// import React from "react";
// import { HeadingNode } from "@lexical/rich-text";

// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
// import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
// import ToolbarPlugin from "./ToolbarPlugin";
// import { $getRoot } from "lexical";

// export default function RTE({ onChange }) {
//     return (
//         <LexicalComposer
//             initialConfig={{
//                 namespace: "MyEditor",
//                 theme: {},
//                 onError: console.error,
//                 nodes: [
//                     HorizontalRuleNode,
//                     HeadingNode,
//                 ],
//             }}
//         >
//             <div className="border p-2 rounded">
//                 <ToolbarPlugin />
//                 <RichTextPlugin
//                     contentEditable={<ContentEditable className="min-h-[150px] p-2 outline-none" />}
//                     placeholder={<div className="p-2 text-gray-400">Enter text...</div>}
//                     ErrorBoundary={LexicalErrorBoundary}
//                 />
//                 <HistoryPlugin />
//                 <ListPlugin />
//                 <LinkPlugin />
//                 <MarkdownShortcutPlugin />
//                 <OnChangePlugin
//                     onChange={editorState =>
//                         editorState.read(() => {
//                             const content = $getRoot().getTextContent();
//                             onChange?.(content);
//                         })
//                     }
//                 />
//             </div>
//         </LexicalComposer>
//     );
// }

// import React from "react";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { $getRoot } from "lexical"; // ✅ Import $getRoot

// export default function RTE({ onChange }) {
//     const initialConfig = {
//         namespace: "MyEditor",
//         theme: {},
//         onError(error) {
//             throw error;
//         },
//     };

//     return (
//         <LexicalComposer initialConfig={initialConfig}>
//             <RichTextPlugin
//                 contentEditable={
//                     <ContentEditable className="min-h-[150px] p-2 border rounded" />
//                 }
//                 placeholder={
//                     <div className="p-2 text-gray-400">
//                         Enter text...
//                         <div className="hidden sm:block text-sm text-gray-400">
//                             (Desktop: Press <kbd>Win</kbd> + <kbd>.</kbd> to open emoji picker)
//                         </div>
//                     </div>
//                 }

//             />
//             <HistoryPlugin />
//             <OnChangePlugin
//                 onChange={(editorState) => {
//                     editorState.read(() => {
//                         const root = $getRoot(); // ✅ Get root node correctly
//                         const content = root.getTextContent();
//                         onChange?.(content); // Call parent's onChange
//                     });
//                 }}
//             />
//         </LexicalComposer>
//     );
// }

// import React from "react";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { $getRoot, $getSelection } from "lexical";
// import { $generateHtmlFromNodes } from "@lexical/html";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// export default function RTE({ onChange }) {
//     const initialConfig = {
//         namespace: "MyEditor",
//         theme: {},
//         onError(error) {
//             throw error;
//         },
//     };
//     const [editor] = useLexicalComposerContext();
//     return (
//         <LexicalComposer initialConfig={initialConfig}>
//             <RichTextPlugin
//                 contentEditable={
//                     <ContentEditable className="min-h-[150px] p-2 border rounded" />
//                 }
//                 placeholder={
//                     <div className="p-2 text-gray-400">
//                         Enter text...
//                         <div className="hidden sm:block text-sm text-gray-400">
//                             (Desktop: Press <kbd>Win</kbd> + <kbd>.</kbd> to open emoji picker)
//                         </div>
//                     </div>
//                 }
//             />
//             <HistoryPlugin />
//             <OnChangePlugin
//                 onChange={(editorState) => {
//                     editorState.read(() => {
//                         const htmlString = $generateHtmlFromNodes(editor,);
//                         onChange?.(htmlString); // Save HTML instead of plain text
//                     });
//                 }}
//             />
//         </LexicalComposer>
//     );
// }
// import React from "react";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { $generateHtmlFromNodes } from "@lexical/html";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// export default function RTE({ setValue, name }) {
//     const initialConfig = {
//         namespace: "MyEditor",
//         theme: {},
//         onError(error) {
//             throw error;
//         },
//     };

//     return (
//         <LexicalComposer initialConfig={initialConfig}>
//             <RichTextPlugin
//                 contentEditable={
//                     <ContentEditable className="min-h-[150px] p-2 border rounded" />
//                 }
//                 placeholder={
//                     <div className="p-2 text-gray-400">
//                         Enter text...
//                         <div className="hidden sm:block text-sm text-gray-400">
//                             (Desktop: Press <kbd>Win</kbd> + <kbd>.</kbd> to open emoji picker)
//                         </div>
//                     </div>
//                 }
//             />
//             <HistoryPlugin />
//             <RTEOnChangePlugin setValue={setValue} name={name} />
//         </LexicalComposer>
//     );
// }

// // Custom plugin to handle HTML content change
// function RTEOnChangePlugin({ setValue, name }) {
//     const [editor] = useLexicalComposerContext();

//     return (
//         <OnChangePlugin
//             onChange={(editorState) => {
//                 editorState.read(() => {
//                     const html = $generateHtmlFromNodes(editor); // ✅ Convert to HTML
//                     setValue(name, html); // ✅ Update react-hook-form
//                 });
//             }}
//         />
//     );
// }


import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function RTE({ setValue, name, defaultValue = "" }) {
    const initialConfig = {
        namespace: "MyEditor",
        theme: {},
        onError(error) {
            throw error;
        },
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={
                    <ContentEditable className="min-h-[150px] p-2 border rounded" />
                }
                placeholder={
                    <div className="p-2 text-gray-400">
                        Enter text...
                        <div className="hidden sm:block text-sm text-gray-400">
                            (Desktop: Press <kbd>Win</kbd> + <kbd>.</kbd> to open emoji picker)
                        </div>
                    </div>
                }
            />
            <HistoryPlugin />
            <RTEOnChangePlugin setValue={setValue} name={name} />
            <RTEInitialContentPlugin defaultValue={defaultValue} />
        </LexicalComposer>
    );
}

// Sets initial HTML value into the editor
function RTEInitialContentPlugin({ defaultValue }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!defaultValue) return;

        editor.update(() => {
            const parser = new DOMParser();
            const dom = parser.parseFromString(defaultValue, "text/html");
            const nodes = $generateNodesFromDOM(editor, dom);
            const root = editor.getRootElement();
            if (root) {
                editor.setEditorState(
                    editor.parseEditorState(() => {
                        const selection = window.getSelection();
                        if (selection) selection.removeAllRanges();
                        return nodes;
                    })
                );
                editor.insertNodes(nodes);
            }
        });
    }, [editor, defaultValue]);

    return null;
}

// Handles onChange -> sends HTML back to react-hook-form
function RTEOnChangePlugin({ setValue, name }) {
    const [editor] = useLexicalComposerContext();

    return (
        <OnChangePlugin
            onChange={(editorState) => {
                editorState.read(() => {
                    const html = $generateHtmlFromNodes(editor);
                    setValue(name, html); // Update react-hook-form field
                });
            }}
        />
    );
}
