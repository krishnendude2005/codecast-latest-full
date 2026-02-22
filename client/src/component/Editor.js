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

    useEffect(() => {
        const init = () => {
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
                // console.log('changes', instance, changes);
                const { origin } = changes;
                const code = instance.getValue(); //to get the code written
                onCodeChange(code);//get the previously writtem code


                if (origin !== 'setValue') {
                    socketRef.current.emit('code-change', {
                        roomId,
                        code,
                    });
                }
            })

        };

        init();
    }, [onCodeChange, roomId, socketRef]);

    useEffect(() => {
        const socket = socketRef.current;
        if (socket) {
            socket.on('code-change', ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            })
        }
        return ()=> {
            socket.off('code-change');
        }
    }, [socketRef])
    return (
        <div style={{ height: "800px" }}>
            <textarea id="realTimeEditor" style={{ height: "100%", width: "100%" }}></textarea>
        </div>

    );
}

export default Editor;
