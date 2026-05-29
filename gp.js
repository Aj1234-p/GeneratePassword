// ============================================
// MY APPROACH
// ============================================

const generateButton = document.querySelector('#generate-btn');
const rangeButton = document.querySelector('#range-btn');
const showRange = document.querySelector('#show-range');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const result = document.querySelector('#res');
const showStrength = document.querySelector('#show-strength');
const indicator = document.querySelector('#indicator');

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

let password = "";
let passwordCheck = false;
let passwordLength = 6;
let cnt = 0;


rangeButton.addEventListener('input',()=>{
  passwordLength = rangeButton.value;
  showRange.textContent = passwordLength;
  passwordCheck = true;
})

function buildCharacterPool(){
  password ="";
  cnt=0;
  if(uppercase.checked){
     password+=uppercaseLetters;
     console.log(password);
     cnt++;
    }
    if(lowercase.checked){ 
      password+=lowercaseLetters; 
      console.log(password);
      cnt++; 
    }
    if(numbers.checked) { 
      password+=numberCharacters;
      console.log(password);
      cnt++;
    }
    if(symbols.checked) {
      password+=symbolCharacters;
      console.log(password);
     cnt++;
  }
}

uppercase.addEventListener('change', buildCharacterPool);
lowercase.addEventListener('change', buildCharacterPool);
numbers.addEventListener  ('change', buildCharacterPool);
symbols.addEventListener  ('change', buildCharacterPool);


let res = "";
generateButton.addEventListener('click',()=>{
  res = "";
  let n = password.length;
  if(n==0){
    console.log(password);
    alert("Please check above at least one");
    return;
  }
  let len = passwordLength;
  for(let i=0;i<len;i++)
       res+= password[Math.floor(Math.random()*n)];
   result.textContent = res;
   console.log(cnt);
   if(cnt<=1){
     showStrength.innerText = "Weak";
     indicator.value=25;
   }
   else if(cnt==2){
     showStrength.innerText = "Medium";
     indicator.value=50;
   }
   else{
    showStrength.innerText = "Strong";
    indicator.value=100; 
  }
})



// ============================================
// TUTORIAL APPROACH (for comparison)
// ============================================

// const passwordInput = document.getElementById("password");
// const lengthSlider = document.getElementById("length");
// const lengthDisplay = document.getElementById("length-value");
// const uppercaseCheckbox = document.getElementById("uppercase");
// const lowercaseCheckbox = document.getElementById("lowercase");
// const numbersCheckbox = document.getElementById("numbers");
// const symbolsCheckbox = document.getElementById("symbols");
// const generateButton = document.getElementById("generate-btn");
// const copyButton = document.getElementById("copy-btn");
// const strengthBar = document.querySelector(".strength-bar");
// const strengthText = document.querySelector(".strength-container p");
// const strengthLabel = document.getElementById("strength-label");

// // Character sets
// const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
// const numberCharacters = "0123456789";
// const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";


// lengthSlider.addEventListener('input',()=>{
//   lengthDisplay.textContent = lengthSlider.value;
// })

// generateButton.addEventListener('click',makePassword);

// function makePassword(){
//   const length = Number(lengthSlider.value);
//   const includeUppercase = uppercaseCheckbox.checked;
//   const includeLowercase = lowercaseCheckbox.checked;
//   const includeNumbers   = numbersCheckbox.checked;
//   const includeSymbols   = symbolsCheckbox.checked;

//   if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
//     alert('Please check at least one type');
//     return;
//   }

//   const newPassword = createRandomPassword(
//     length,
//     includeUppercase,
//     includeLowercase,
//     includeNumbers,
//     includeSymbols
//   )

//   passwordInput.value = newPassword;
// }


// function createRandomPassword(length,includeUppercase,includeLowercase,includeNumbers,includeSymbols){
//   let allCharcters = "";
//   if(includeUppercase) allCharcters+=uppercaseLetters;
//   if(includeLowercase) allCharcters+=lowercaseLetters;
//   if(includeNumbers)   allCharcters+=numberCharacters;
//   if(includeSymbols)   allCharcters+=symbolCharacters;

//   let password = "";
//   for(let i=0;i<length;i++){
//     let randomIndex = Math.floor(Math.random()*allCharcters.length);
//     password+=allCharcters[randomIndex];
//   }
//   return password;
//   updateStrengthMeter(password);
// }

// function updateStrengthMeter(password){
//   const passwordLength = password.length;
//   const hasUppercase = /[A-Z]/.test(password);
//   const hasLowercase = /[a-z]/.test(password);
//   const hasNumbers = /[0-9]/.test(password);
//   const hasSymbols = /!@#$%^&*()-_=+[]{}|;:,.<>?/.test(password);

//   let strengthScore = 0;
//   strengthScore+=Math.min(passwordLength*2,40);

//   if(hasUppercase) strengthScore+=15;
//   if(hasLowercase) strengthScore+=15;
//   if(hasNumbers) strengthScore+=15;
//   if(hasSymbols) strengthScore+=15;

//   if(passwordLength<8){
//     strengthScore = Math.min(strengthScore,40);
//   }

//   const safeScore = Math.max(5,Math.min(100,strengthScore));
//   strengthBar.style.width = safeScore + "%";

//   let strengthLabelText = "";
//   let barColor = "";
//   if(safeScore<40){
//     strengthLabelText = "Weak";
//     barColor = "#fc8181";
//   }
//   else if(safeScore<70){
//     barColor = "#fbd38d";
//     strengthLabelText = "Medium";
//   }
//   else{
//     barColor = "#68d391";
//     strengthLabelText = "Strong";
//   }
  
//   strengthBar.style.backgroundColor = barColor;
//   strengthLabel.innerText = strengthLabelText;
// }