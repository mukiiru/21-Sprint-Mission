function displayErrorMessage(errorMessageElement, {message}, type, isValid=true) {
  errorMessageElement.textContent = message;
  errorMessageElement.classList.toggle('show', !isValid);
  if(!isValid) {
    document.querySelector(`#${type}`).style.border = '1px solid red'; 
  } else {
    document.querySelector(`#${type}`).style.border = 'none'; 
  }
}

export {displayErrorMessage};