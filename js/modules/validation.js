const REGEXPS = {
 EMAIL_REGEXP: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
 PASSWORD_REGEXP: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&~])[A-Za-z\d$@$!%*#?&~]{8,16}$/
}

const hasValue = (val) => val !== null && val !== undefined && val.trim().length > 0;
function isValidValue(val, type, passwordValue=null) {
  if(!hasValue(val)) return false;
  if(type === 'passwordCheck') {
    const result = (passwordValue === val) ? true : false;
    return result;
  }
  const typeKey = `${type.toUpperCase()}_REGEXP`;
  const result = REGEXPS[typeKey]?.test(val); 
  return result;
}

export {isValidValue};