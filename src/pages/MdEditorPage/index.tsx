import { useState } from 'react';
import MyEditor from '../../components/MdEditor';

const MdEditor: React.FC = () => {
  const [value, setValue] = useState('');
  return <MyEditor setValue={setValue}></MyEditor>;
};
export default MdEditor;
