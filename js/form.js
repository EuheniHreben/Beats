const myForm = document.querySelector('#myForm');
const sendButton = document.querySelector('#sendButton');
const formSection = document.querySelector('#form-section');

sendButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (validateForm(myForm)) {

    const data = {
      name: myForm.elements.name.value,
      phone: myForm.elements.phone.value,
      to: myForm.elements.to.value,
      comment: myForm.elements.comment.value
    };

    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', () => {

      console.log(xhr.response);
      console.log(xhr.status);

      const content = document.createElement('div');
      content.classList.add('content');
      formSection.appendChild(content);
      
      const window = document.createElement('div');
      window.classList.add('window');
      content.appendChild(window);
      
      const message = document.createElement('p');
      window.appendChild(message);

      if (xhr.response.status) {
      message.innerHTML = 'Сообщение отправлено!';
      } else {
      message.innerHTML = 'Попробуйте ещё раз!';
      }
    
      const closeClick = document.createElement('a');
      closeClick.classList.add('btn');
      window.appendChild(closeClick);
      closeClick.innerHTML = 'Закрыть';
    
      closeClick.addEventListener('click', event => {
    
        event.preventDefault();
        formSection.removeChild(content);
    
      })
    
      content.addEventListener('click', event => {
        event.preventDefault();
    
        if (event.target == content) {
          formSection.removeChild(content);
        }
        
      });
    
    });
  };
});

function validateForm(myForm) {
  let valid = true;

  if (!validateField(myForm.elements.name)) {
    valid = false;
  }

  if (!validateField(myForm.elements.phone)) {
    valid = false;
  }

  if (!validateField(myForm.elements.comment)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  field.nextElementSibling.textContent = field.validationMessage;
  return field.checkValidity();
}