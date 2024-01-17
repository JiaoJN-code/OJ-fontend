import { addQuestionUsingPost } from '@/services/OJ-backend/questionController';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Form, Input, InputNumber, message, Space } from 'antd';
import React, { useState } from 'react';
import MyEditor from '../../components/MdEditor';

// type SizeType = Parameters<typeof Form>[0]['size'];

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 4 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 20 },
//   },
// };

// const formItemLayoutWithOutLabel = {
//   wrapperCol: {
//     xs: { span: 24, offset: 0 },
//     sm: { span: 20, offset: 4 },
//   },
// };

const QuestionAdd: React.FC = () => {
  const [contents, setContent] = useState('');
  const [answers, setAnswer] = useState('');

  const onFinish = async (values: any) => {
    const value: API.QuestionAddRequest = {
      title: values.title,
      content: contents,
      answer: answers,
      tags: values.tags,
      judgeConfig: {
        timeLimit: values.timeLimit,
        memoryLimit: values.memoryLimit,
      },
      judgeCase: {
        input: values.input,
        output: values.output,
      },
    };
    const res = await addQuestionUsingPost(value);
    if (res.data) {
      message.success('添加题目成功');
      history.push('/question/add');
    } else {
      message.error(res.msg);
    }
    console.log(value);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      onFinish={onFinish}
      // style={{ maxWidth: 600 }}
    >
      <Form.Item<API.QuestionAddRequest> label="题目标题" name="title">
        <Input name="title" />
      </Form.Item>
      <Form.Item<API.QuestionAddRequest> label="题目标签" name="tags">
        <Form.List
          name="tags"
          // rules={[
          //   {
          //     validator: async (_, names) => {
          //       if (!names || names.length < 2) {
          //         return Promise.reject(new Error('At least 2 passengers'));
          //       }
          //     },
          //   },
          // ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: '请输入题目标签或者删除该项',
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="请输入题目标签" style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Button
                  type="dashed"
                  onClick={() => {
                    add('The head item', 0);
                  }}
                  style={{ width: '60%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  Add field at head
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item<API.QuestionAddRequest> label="题目内容" name="content">
        <MyEditor setValue={setContent}></MyEditor>
      </Form.Item>
      <Form.Item<API.QuestionAddRequest> label="题目答案" name="answer">
        <MyEditor setValue={setAnswer}></MyEditor>
      </Form.Item>
      <Form.Item<API.JudgeConfig> label="判题配置" name="timeLimit">
        <Space>
          时间限制：
          <InputNumber name="timeLimit" />
        </Space>
      </Form.Item>
      <Form.Item<API.JudgeConfig> wrapperCol={{ offset: 4 }} name="memoryLimit">
        <Space>
          内存限制：
          <InputNumber name="memoryLimit" />
        </Space>
      </Form.Item>
      <Form.Item<API.JudgeCase> label="用例配置" name="input">
        输入用例：
        <Input style={{ width: '500px' }} />
      </Form.Item>
      <Form.Item<API.JudgeCase> wrapperCol={{ offset: 4 }} name="output">
        输出用例：
        <Input style={{ width: '500px' }} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          添加题目
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionAdd;
