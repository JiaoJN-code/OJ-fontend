import MonacoEditor from '@/components/MonacoEditor';
import { getQuestionByIdUsingGet } from '@/services/OJ-backend/questionController';
import { judgeQuestionUsingPost } from '@/services/OJ-backend/questionSubmitController';
import { history, useParams } from '@umijs/max';
import { Button, message, Select, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const QuestionInfo: React.FC = () => {
  const [data, setData] = useState<API.QuestionVo>();
  const [value, setValue] = useState('');
  const [languageType, setLanguageType] = useState<string>('java');

  const param = useParams();

  /**
   * 加载数据
   */
  const loadData = async () => {
    const res = await getQuestionByIdUsingGet({
      id: param.id,
    });
    if (res.data) {
      setData(res.data);
      console.log(data);
    } else {
      message.error(res.msg);
    }
  };

  // /**
  //  * 布局高度设置
  //  */
  // const layout = () => {
  //   let height = Number(document.getElementById('root')?.style.height);
  //   console.log(height);

  //   let leftElement = document.getElementById('left');
  //   if (leftElement !== null) {
  //     leftElement.style.height = String(height - 20);
  //   }

  //   let rightElement = document.getElementById('right');
  //   if (rightElement !== null) {
  //     rightElement.style.height = String(height - 20);
  //   }
  // };

  useEffect(() => {
    loadData();
  }, []);

  const getColor = () => {
    let r = Math.floor(Math.random() * 100 + 100);
    let g = Math.floor(Math.random() * 100 + 100);
    let b = Math.floor(Math.random() * 100 + 100);
    let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
  };

  const listItems = data?.tags?.map((item, index) => (
    <Tag color={getColor()} key={index}>
      {item}
    </Tag>
  ));

  const runHandler = async () => {
    const questionSubmitValue: API.QuestionSubmitAddRequest = {
      code: value,
      language: 'javascript',
      questionId: data?.id,
    };
    const res = await judgeQuestionUsingPost(questionSubmitValue);
    if (res.data?.state?.localeCompare('Accepted')) {
      message.success(res.data.memory);
      history.push('/question/bank');
    } else {
      message.error(res.data?.message);
    }
  };

  const handleChangeLanguage = (value: string) => {
    setLanguageType(value);
  };

  return (
    <div
      id="root"
      style={{ backgroundColor: '#f0f2f5', padding: '10px', width: '100%', height: '100%' }}
    >
      <div
        id="left"
        style={{
          width: '49.8%',
          height: '100%',
          float: 'left',
          borderRadius: '10px',
          backgroundColor: '#ffff',
          paddingLeft: '15px',
        }}
      >
        <h2 style={{ marginTop: '10px' }}>{data?.title}</h2>
        <hr style={{ border: 0, borderTop: '1px solid #d0d0d5' }}></hr>
        <Space style={{ marginBottom: '15px' }}>{listItems}</Space>
        <ReactMarkdown>{data?.content}</ReactMarkdown>
        <div>
          <p style={{ fontWeight: 'bold' }}>示例：</p>
          <p>输入：{data?.judgeCase?.input}</p>
          <p>输出：{data?.judgeCase?.output}</p>
        </div>
        <div>
          <p style={{ fontWeight: 'bold' }}>题目限制：</p>
          <p>时间限制：{data?.judgeConfig?.timeLimit}</p>
          <p>内存限制：{data?.judgeConfig?.memoryLimit}</p>
        </div>
        <div style={{ position: 'absolute', bottom: '20px' }}>
          <Space>
            <span>提交次数：{data?.submitNum}</span>
            <span>|</span>
            <span>通过次数：{data?.acceptedNum}</span>
            <span>|</span>
            <span>收藏数：{data?.favourNum}</span>
          </Space>
        </div>
      </div>

      <div
        id="right"
        style={{
          width: '49.8%',
          height: '100%',
          float: 'right',
          borderRadius: '10px',
          backgroundColor: '#ffff',
        }}
      >
        <div style={{ width: '100%', height: '8%' }}>
          <h2 style={{ marginTop: '10px', paddingLeft: '15px' }}>代码编辑</h2>
          <Select
            defaultValue="java"
            style={{ width: 120, position: 'absolute', top: '20px', right: '30px' }}
            onChange={handleChangeLanguage}
            options={[
              { value: 'java', label: 'java' },
              { value: 'cpp', label: 'c++' },
              { value: 'javascript', label: 'javascript' },
              { value: 'typescript', label: 'typescript' },
            ]}
          />
          <hr style={{ border: 0, borderTop: '1px solid #d0d0d5' }}></hr>
        </div>
        <div id="editor" style={{ width: '100%', height: '90%' }}>
          <MonacoEditor
            setValue={setValue}
            height={(document.getElementById('editor')?.offsetHeight as number) - 40}
            languageType={languageType}
          ></MonacoEditor>
          <div style={{ position: 'absolute', bottom: '20px', right: '30px' }}>
            <Space>
              <Button type="default" style={{ backgroundColor: '#f2f3f4' }} onClick={runHandler}>
                运行
              </Button>
              <Button type="default" style={{ backgroundColor: '#2db55d' }}>
                提交
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionInfo;
