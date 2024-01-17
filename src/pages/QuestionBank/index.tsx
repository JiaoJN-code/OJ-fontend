import { listQuestionByPageUsingPost } from '@/services/OJ-backend/questionController';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Space } from 'antd';
import { useRef } from 'react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const column: ProColumns<API.QuestionVo>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '提交数',
    dataIndex: 'submitNum',
    sorter: true,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    disable: true,
    title: '通过率',
    dataIndex: 'acceptedNum',
    sorter: true,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'tags',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => <Space>{record.tags}</Space>,
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createTime',
    valueType: 'date',
    sorter: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record) => (
      <a key="editable" href={`/question/info/${record.id}`}>
        查看题目
      </a>
    ),
  },
];

const QuestionBank: React.FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.QuestionVo>
      columns={column}
      actionRef={actionRef}
      cardBordered
      // request={async (params, sort, filter) => {
      //   console.log('sort' + sort, 'filter' + filter);
      //   await waitTime(2000);
      //   return request<{
      //     data: GithubIssueItem[];
      //   }>('https://proapi.azurewebsites.net/github/issues', {
      //     params,
      //   });
      // }}
      request={async (
        params: API.PageParams & {
          pageSize?: number | undefined;
          current?: number | undefined;
          keyword?: string | undefined;
        },
      ) => {
        console.log(params);

        const res = await listQuestionByPageUsingPost({
          ...params,
        });
        console.log(res.data?.records);
        if (res.data) {
          return {
            data: res.data?.records,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.data?.total,
          };
        } else {
          return {
            data: [],
          };
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

export default QuestionBank;
