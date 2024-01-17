declare namespace API {
  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type BaseResponseJudgeInfo = {
    code?: number;
    data?: JudgeInfo;
    msg?: string;
  };

  type BaseResponseLoginUserVo = {
    code?: number;
    data?: LoginUserVo;
    msg?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: string;
    msg?: string;
  };

  type BaseResponsePageQuestionVo = {
    code?: number;
    data?: PageQuestionVo;
    msg?: string;
  };

  type BaseResponseQuestionVo = {
    code?: number;
    data?: QuestionVo;
    msg?: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type getQuestionByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type JudgeCase = {
    input?: string;
    output?: string;
  };

  type JudgeConfig = {
    memoryLimit?: string;
    timeLimit?: string;
  };

  type JudgeInfo = {
    memory?: string;
    message?: string;
    state?: string;
    time?: string;
  };

  type LoginUserVo = {
    createTime?: string;
    id?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageQuestionVo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: QuestionVo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type QuestionAddRequest = {
    answer?: string;
    content?: string;
    judgeCase?: JudgeCase;
    judgeConfig?: JudgeConfig;
    tags?: string[];
    title?: string;
  };

  type QuestionQueryRequest = {
    content?: string;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userid?: string;
  };

  type QuestionSubmitAddRequest = {
    code?: string;
    language?: string;
    questionId?: string;
  };

  type QuestionUpdateRequest = {
    answer?: string;
    content?: string;
    id?: string;
    judgeCase?: JudgeCase;
    judgeConfig?: JudgeConfig;
    tags?: string[];
    title?: string;
    userid?: string;
  };

  type QuestionVo = {
    acceptedNum?: number;
    answer?: string;
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: string;
    judgeCase?: JudgeCase;
    judgeConfig?: JudgeConfig;
    submitNum?: number;
    tags?: string[];
    thumbNum?: number;
    title?: string;
    userid?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
  };
}
