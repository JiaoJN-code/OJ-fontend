import Footer from '@/components/Footer';
import { userRegisterUsingPost } from '@/services/OJ-backend/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
const Register: React.FC = () => {
  const [type, setType] = useState<string>('register');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const handleRegister = async (values: API.UserRegisterRequest) => {
    try {
      // 登录
      const res = await userRegisterUsingPost({
        ...values,
      });
      if (res.data) {
        const defaultLoginSuccessMessage = '注册成功';
        message.success(defaultLoginSuccessMessage);
        history.push('/user/login');
        return;
      } else {
        const defaultLoginFailureMessage = res.msg;
        message.error(defaultLoginFailureMessage);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="OJ系统"
          subTitle={'自动判题系统'}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
            // submitButtonProps: {
            //   style: {
            //     width: '100%',
            //   },
            // },
            // resetButtonProps: false,
          }}
          onFinish={async (values) => {
            await handleRegister(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'register',
                label: '注册',
              },
            ]}
          />

          {type === 'register' && (
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户昵称'}
                rules={[
                  {
                    required: true,
                    message: '昵称是必填项是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="userProfile"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户简介'}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          ></div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
