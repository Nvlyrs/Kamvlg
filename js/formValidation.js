"use strict"


const form = document.querySelector(".js-form"),
    formInputs = form.querySelectorAll(".js-input"),
    inputTel = form.querySelector(".js-input-tel"),
    checkboxes = form.querySelectorAll("[type = checkbox]");

const telMask = new IMask(inputTel, {
    mask: '+7(000)000-00-00',
});

function validateEmail(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateTel(tel){
    let re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    return re.test(String(tel));
}

function generateErrorMessage(message){
    let  error = document.createElement('div');
    error.className = 'error-msg';
    error.innerHTML = message;
    return error;
}

function generateSuccessMessage(message){
    let success = document.createElement('div');
    success.className = "success-msg";
    success.innerHTML = message;
    return success;
}

function clearValidation(){
    const errors = form.querySelectorAll(".error-msg");
    if (errors){
        errors.forEach(error => {
            error.remove();
        });
    }
}

function checkInputs(){
    formInputs.forEach((input)=>{
        if (input.value === '' && input.hasAttribute("data-not-required")){
            return;
        }
        if ((input.value === '' || input.value == null)){
            input.error = true;
            input.errorMessage = "Поле обязательно для заполнения!"
        } else if (input.classList.contains("js-input-email")){
            input.error = !validateEmail(input.value);
            input.errorMessage = "Укажите корректный адрес электронной почты!"
        } else if (input.classList.contains("js-input-tel")){
            input.error = !validateTel(input.value);
            input.errorMessage = "Укажите корректный номер телефона!"
        } else input.error = false;
    });
}

function validateInputs(){
    let errorCount = 0;
    formInputs.forEach(input =>{
        if (input.value === '' && input.hasAttribute("data-not-required")){
            input.classList.remove("error");
            return;
        }
        if (input.error === true){
            input.after(generateErrorMessage(input.errorMessage));
            input.classList.remove("correct");
            input.classList.add("error");
            errorCount++;
        } else if (input.error === false) {
            input.classList.remove("error");
            input.classList.add("correct");
        }
    });
    return errorCount;
}

function createObject(){
    let mail = {};
    formInputs.forEach(input => {
        if (input.value && input.error === false){
            mail[input.getAttribute("name")] = input.value;
        }
    });
    return mail;
}

function clearInputs(){
    formInputs.forEach(input => {
        input.value = '';
        input.classList.remove("error");
        input.classList.remove("correct");
    });
    checkboxes.forEach(checkbox =>{
        if (checkbox.checked){
            checkbox.checked = false;
        }
    });
}

function sendRequest(){
    const formData = new FormData(form);
    let data = {};
    formData.forEach((value, key)=>{
        data[key] = value;
    });

    const request = new XMLHttpRequest();

    // Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
    const url = "/";
     
    // Так же как и в GET составляем строку с данными, но уже без пути к файлу 
    const params = JSON.stringify(data);
     
    /* Указываем что соединение	у нас будет POST, говорим что путь к файлу в переменной url, и что запрос у нас
    асинхронный, по умолчанию так и есть не стоит его указывать, еще есть 4-й параметр пароль авторизации, но этот
        параметр тоже необязателен.*/ 
    request.open("POST", url, true);
     
    //В заголовке говорим что тип передаваемых данных закодирован. 
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
     
    request.addEventListener("readystatechange", () => {
        if(request.status === 200) {       
            console.log(request.responseText);
        }
    });
    request.send(params);
}


form.onsubmit = (event)=>{
    event.preventDefault();
    clearValidation();
    checkInputs();
    const errorCount = validateInputs();
    if (errorCount === 0){
        sendRequest();
        clearInputs();
        form.querySelector("[type = submit]") .after(generateSuccessMessage("<h1>Спасибо за заявку!</h1>"))
    }
}





