import MonocoWebpackPlugin from 'monaco-editor-webpack-plugin';

export const chainWebpack = {
  chainWebpack(memo: any) {
    memo.plugins('monaco-editor').use(
      new MonocoWebpackPlugin({
        languages: ['json', 'javascript', 'java'],
      }),
    );
    console.log('webpack Config', memo.toConfig());
    return memo;
  },
};


