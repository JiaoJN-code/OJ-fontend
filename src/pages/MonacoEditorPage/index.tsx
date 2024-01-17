import { useState } from 'react';
import MonacoEditor from '../../components/MonacoEditor';

const MonacoEditorPage: React.FC = () => {
  const [value, setValue] = useState('');
  return (
    <div>
      <MonacoEditor setValue={setValue}></MonacoEditor>
    </div>
  );
};
export default MonacoEditorPage;
