export default class FormError {  
  static appendErrorElement(parentElement, inputType = 'مقدار') {
    this.removeErrorMessage(parentElement);
    const message = document.createElement('small');
    message.classList.add('text-red-500', 'dark:text-red-300');
    message.textContent = `واردکردن ${inputType} اجباری است!`;
    parentElement.append(message);
  }

  static appendCustomErrorElement(parentElement, errorMessage) {
    this.removeErrorMessage(parentElement);
    const message = document.createElement('small');
    message.classList.add('text-red-500', 'dark:text-red-300');
    message.textContent = errorMessage;
    parentElement.append(message);
  }

  static removeErrorMessage(parentElement) {
    if (parentElement.lastElementChild.tagName === 'SMALL')
      parentElement.lastElementChild.remove();
  }

  static removeAllErrorMessages(formElement) {
    [...formElement.children].forEach((field) => {
      this.removeErrorMessage(field);
    });
  }
}