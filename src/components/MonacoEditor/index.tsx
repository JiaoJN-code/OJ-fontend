import { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

// export type MonacoEditorProps = {
//   onChange: (v: string) => void;
// };

const MdEditor = (props: { setValue: any; height: any; languageType: string }) => {
  const [text, setText] = useState('');
  const { setValue, height, languageType } = props;
  return (
    <MonacoEditor
      width="100%"
      height={height}
      language={languageType}
      theme="vs"
      value={text}
      onChange={(v) => {
        setText(v);
        setValue(v);
      }}
      options={{
        selectOnLineNumbers: true,
        matchBrackets: 'near',
        colorDecorators: true,
        minimap: {
          enabled: true,
        },
      }}
    />
  );
};
export default MdEditor;
