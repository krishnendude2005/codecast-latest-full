import React, { useEffect, useRef } from 'react';
import 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import CodeMirror from 'codemirror';

function Editor({ socketRef, roomId, onCodeChange }) {
    const editorRef = useRef(null);

    // Effect 1: initialise CodeMirror and wire up the outgoing code-change emitter
    useEffect(() => {
        const editor = CodeMirror.fromTextArea(
            document.getElementById("realTimeEditor"),
            {
                mode: { name: "javascript", json: true },
                theme: "dracula",
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            }
        );
        editorRef.current = editor;
        editor.setSize(null, '100%');

        editor.on('change', (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();
            onCodeChange(code);
            // Always read socketRef.current at event time so we never hold a stale null reference
            if (origin !== 'setValue' && socketRef.current) {
                socketRef.current.emit('code-change', { roomId, code });
            }
        });

        // Effect 1 cleanup — destroy the editor instance
        return () => {
            editor.toTextArea();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once on mount; roomId/socketRef are read via ref at event time


    // Effect 2: register the incoming code-change listener on the socket.
    // socketRef.current is null on first render (async init in EditorPage), so we
    // watch socketRef.current via a polling-free approach: the parent passes the ref
    // and we re-run this effect whenever the ref object changes identity.
    // Because socketRef is a stable ref object, we instead rely on a small interval
    // to attach as soon as the socket becomes available.
    useEffect(() => {
        let cleanup = () => { };

        const attach = () => {
            const socket = socketRef.current;
            if (!socket) return false;

            const handler = ({ code }) => {
                if (code !== null && editorRef.current) {
                    editorRef.current.setValue(code);
                }
            };
            socket.on('code-change', handler);
            cleanup = () => socket.off('code-change', handler);
            return true;
        };

        // Try immediately — if socket is already up, we're done
        if (!attach()) {
            // Socket not ready yet; poll briefly until it is
            const interval = setInterval(() => {
                if (attach()) clearInterval(interval);
            }, 100);
            cleanup = () => clearInterval(interval);
        }

        return () => cleanup();
    }, [socketRef]);

    return (
        <div style={{ height: "100%" }}>
            <textarea id="realTimeEditor" style={{ height: "100%", width: "100%" }}></textarea>
        </div>
    );
}

export default Editor;
