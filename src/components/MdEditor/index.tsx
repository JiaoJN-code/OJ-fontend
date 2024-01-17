import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.css';
import { useState } from 'react';

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

export type MdEditorProps = {
  setValue: any;
};

const MdEditor: React.FC<MdEditorProps> = (props) => {
  const [v, setV] = useState('');
  const setValue = props.setValue;
  return (
    <Editor
      value={v}
      plugins={plugins}
      onChange={(v) => {
        setV(v);
        setValue(v);
      }}
    />
  );
};
export default MdEditor;
