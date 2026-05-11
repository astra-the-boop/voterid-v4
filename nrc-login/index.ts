function validateEmail(input:string):boolean{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

document.addEventListener('DOMContentLoaded', () => {
    const emailInput:HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const emailError:HTMLSpanElement = document.getElementById('email-error') as HTMLSpanElement;
    const otpSendBtn:HTMLButtonElement = document.getElementById('send-code') as HTMLButtonElement;
    const otpSection:HTMLDivElement = document.getElementById('otp') as HTMLDivElement;
    emailInput.addEventListener('input', () => {
        if(!validateEmail(emailInput.value) && emailInput.value){
            emailError.innerHTML = "Please enter a valid email address<br><br>";
        }else{
            emailError.innerHTML = "";
        }
    });


})