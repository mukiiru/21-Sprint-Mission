import {isValidValue} from './modules/validation.js';
import {displayErrorMessage} from './modules/utils.js';
import formValidResult from './modules/state.js';

const form = document.querySelector('#form');
const passwordWrap = document.querySelector('#passwordWrap');
const passwordInput = document.querySelector('#password');
const passwordCheckWrap = document.querySelector('#passwordCheckWrap');
const passwordCheckInput = document.querySelector('#passwordCheck');
const passwordCheckErrorMessage = document.querySelector('#passwordCheckErrorMessage');
const submitBtn = document.querySelector('.submit-btn');  

// FormValid
function isFormValid() {
  const {email, password, passwordCheck} = formValidResult.results;
  let result = false; 
  if(form.classList.contains('signup-form')) { 
    result = email.isValid && password.isValid && passwordCheck.isValid ? true : false;
  } else if(form.classList.contains('login-form')) {
    result = email.isValid && password.isValid ? true : false;
  }
  if(result) {
    submitBtn.classList.remove('disabled');
  } else {
    submitBtn.classList.add('disabled');
  }
}

// UpdateState
function updateValidStatus(val, type) {
  if(formValidResult.results[type]) {
    formValidResult.results[type].isValid = val;

    // Current Valid
    const targetElement = passwordCheckErrorMessage;
    if(targetElement) {
      const isCurrentPwdCheckValid = isValidValue(passwordCheckInput.value, 'passwordCheck', passwordInput.value);
      formValidResult.results.passwordCheck.isValid = isCurrentPwdCheckValid;
      if(type === 'password') {
        displayErrorMessage(targetElement, formValidResult.results.passwordCheck, 'passwordCheck', isCurrentPwdCheckValid);
      }
    }

    isFormValid();
  }
}

// EventHandler
function formValidationHandler({target: {name}, currentTarget}) {
  if(!name) return;
  const targetVal = currentTarget[name].value; 

  let isValid;
  if(name === 'passwordCheck') {
      isValid = isValidValue(targetVal, name, passwordInput.value); 
  } else {
      isValid = isValidValue(targetVal, name);
  }
  updateValidStatus(isValid, name); 

  const targetElement = document.querySelector(`#${name}ErrorMessage`);
  
  if(targetElement) {
    displayErrorMessage(targetElement, formValidResult.results[name], name, isValid);
  }
}

function passWordVisibleHandler(e) {
  e.preventDefault(); 
  if(e.target.tagName === 'BUTTON') {
    e.currentTarget.querySelector('.input-wrap').classList.toggle('visible');
    if(e.currentTarget.querySelector('.input-wrap').classList.contains('visible')) {
      e.target.closest('.input-wrap').querySelector('input').type = 'text';
    } else {
      e.target.closest('.input-wrap').querySelector('input').type = 'password';
    }
  }
}

function submitHandler (e) {
  e.preventDefault(); 
  if(!e.target.classList.contains('disabled')) {
    if(form.classList.contains('signup-form')) {
      window.location.href = '/pages/login.html';
    } else if(form.classList.contains('login-form')) {
      window.location.href = '/pages/items.html';
    }
  }
}

// EventListener
form.addEventListener('focusout', formValidationHandler);
passwordWrap.addEventListener('click', passWordVisibleHandler);
if(form.classList.contains('signup-form')) {
  passwordCheckWrap.addEventListener('click', passWordVisibleHandler); 
}
submitBtn.addEventListener('click', submitHandler);




