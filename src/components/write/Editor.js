import {useEffect, useRef} from "react";
import Quill from "quill";
import '../../styles/editor.scss';
import 'quill/dist/quill.bubble.css'

const Editor = ({title, body, onChangeField}) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요.',
            value: body,
            modules: {
                toolbar: [
                    // Ref: https://quilljs.com/docs/modules/toolbar
                    [{header: '1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{list: 'ordered'}, {list:'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image']
                ]
            }
        })
    }, [onChangeField]);

    // quill에 text-change 이벤트 핸들러 등록
    // ref: https://quilljs.com/docs/api/#events
    useEffect(() => {
        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChangeField({key: 'body', value: quill.root.innerHTML});
            }
        });
    }, [onChangeField]);

    const mounted = useRef(false);
    useEffect(() => {
        if(mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
    }, [body]);

    const onChangeTitle = e => {
        onChangeField({key: 'title', value: e.target.value});
    }

    return (
        <div className="editorBlock">
            <input className="titleInput" placeholder="제목을 입력하세요." onChange={onChangeTitle} value={title}/>
            <div className="quillWrapper">
                <div ref={quillElement}/>
            </div>
        </div>
    );
};

export default Editor;