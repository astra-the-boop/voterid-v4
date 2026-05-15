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

    otpSendBtn.addEventListener("click", async() => {
        const email = emailInput.value.trim().toLowerCase();

        if(!validateEmail(email)){
            alert("Please enter a valid email address.")
            return;
        }

        try{
            const response = await fetch("https://voterid.astr.ac/nrc-email-check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            });

            const data = await response.json();

            if(!data.ok){
                alert("This email address is not registered with a Non-residential Citizenship record. Please make sure you've entered the correct email address.");
                return;
            }

            otpSection.style.display = "block";
        }catch(err){
            console.log(err);
            alert(`Unable to verify email address
${err}`);
        }
    });
})