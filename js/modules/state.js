const formValidationResult = {
  results: {
    email: {
        isValid: false,
        message: '잘못된 이메일입니다.'
    },
    password: {
        isValid: false,
        message: '비밀번호를 8자 이상 입력해주세요.'
    },
    passwordCheck: {
        isValid: false,
        message: '비밀번호가 일치하지 않습니다.'
    },
  }
};

export default formValidationResult;