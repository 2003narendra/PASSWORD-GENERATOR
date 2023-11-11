const strengthMeter = document.getElementById('strength-meter') ;
const passwordInput = document.getElementById('password-input') ;
const reasonsContainer = document.getElementById('problems') ;

passwordInput.addEventListener('input', updateStrengthMeter) ;
updateStrengthMeter() ;
function updateStrengthMeter() {
    const weakness = calculatePasswordStrength(passwordInput.value) ;
    console.log(weakness) ;
    let strength = 100 ;
    reasonsContainer.innerHTML = '' ;
    
         weakness.forEach(weak => {
        if(weak === undefined) {

        } 
        else if(weak == null) {
            return
        } else {
            strength = strength - weak.deduction ;
        const messageElement = document.createElement('div') ;
        messageElement.innerText = weak.message ;
        reasonsContainer.appendChild(messageElement) ;
        }
        
    })

    strengthMeter.style.setProperty('--strength' , strength) ;

}
function passwordDisplayHandler() {
    var x = document.getElementById("password-input");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function calculatePasswordStrength(password)  {
    const weakness = [] ;
    weakness.push(lengthWeakness(password)) ;
    weakness.push(lowercaseWeakness(password)) ;
    weakness.push(uppercaseWeakness(password)) ;
    weakness.push(numberWeakness(password)) ;
    weakness.push(specialCharacterWeakness(password)) ;
    weakness.push(repeatCharacterWeakness (password) ) ;
    return weakness ;
}


function lengthWeakness(password) {
     const length = password.length ;
     if(length<=5) {
         return {
             message : "Your Password is too short" ,
             deduction: 40 

         }
     }

     if(length<=10) {
        return {
            message : "Your Password should be longer" ,
            deduction: 15 

        }
    }
    if(length>=16) {
        return {
            
            deduction: - ((length-16)*3)

        }
    }
}

function lowercaseWeakness(password) {
    return characterTypeWeakness(password ,/[a-z]/g , "lowercase characters" )

}

function uppercaseWeakness(password) {
    return characterTypeWeakness(password ,/[A-Z]/g , "uppercase characters" )


}

function numberWeakness(password) {
    return characterTypeWeakness(password ,/[0-9]/g , "numbers" )


}

function specialCharacterWeakness(password) {
    return characterTypeWeakness(password ,/[^0-9a-zA-Z\s]/g , "special chracters" )


}

function characterTypeWeakness (password, regex , type) {
    const matches = password.match(regex) || [] ;
    if(matches.length ===0) {
        return {
            message: `Your Password has no ${type} `,
            deduction: 15
        }
    }
    if(matches.length<=2) {
        return {
            message: `You should add few more ${type} ` ,
            deduction: 5
        }
    }
}

function repeatCharacterWeakness (password) {
    const matches = password.match(/(.)\1/g) || [] ;
    if(matches.length > 0) {
        return {
            message : "your password has repeat chracters" ,
            deduction : matches.length * 2 
        }
    }
}