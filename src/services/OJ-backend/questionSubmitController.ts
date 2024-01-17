// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** judgeQuestion POST /api/question/submit/run */
export async function judgeQuestionUsingPost(
  body: API.QuestionSubmitAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseJudgeInfo>('/api/question/submit/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
