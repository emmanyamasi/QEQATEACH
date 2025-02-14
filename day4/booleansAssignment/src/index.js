import  bcrypt from 'bcrypt'
//. Create a function called verifyPassword Purpose: This function will compare the user’s input password with the stored hashed password.  Input: User’s entered password, hashed password from the system. Output: Returns true if the passwords match, otherwise returns false
function verifyPassword(inputPassword, storedHashedPassword) {
    if (bcrypt.compareSync(inputPassword,storedHashedPassword) === true){
        return true;
    }
    else{
        return false;
    }
}

//Multi-factor  authentication
//Create a function called verifyMFA  Purpose: This function will compare the MFA code entered by the user with the correct code stored in the system. Input: User’s entered MFA code, correct MFA code. Output: Returns true if the codes match, otherwise returns false 
function verifyMFA(inputMfaCode, correctMfaCode) {
    if(inputMfaCode === correctMfaCode){
        return true;
    }
    else{
        return false;
    }
}



//Create a function called checkBalance ● Purpose: This function will verify whether the user has sufficient balance in their account toproceed with the withdrawal. Input: The withdrawal amount, the user’s current balance. Output: Returns true if the balance is sufficient, otherwise returns false
function checkBalance(balance, withdrawalAmount){
    if (balance >= withdrawalAmount){
        return true;

    }else{
        return false;
    }

}


function checkBalance(balance, withdrawalAmount){
    if (balance >= withdrawalAmount){
        return true;

    }else{
        return false;
    }

}


//Create a function called checkDailyLimit Purpose: This function will ensure that the withdrawal amount does not exceed the daily withdrawal limit. input: The withdrawal amount, the daily transaction limit. Output: Returns true if the withdrawal is within the limit, otherwise returns false. 

function checkDailyLimit(withdrawalAmount,dailyLimit){
    if (withdrawalAmount <=dailyLimit)
        {
            return true;
    
        }else{
            return false;
        }
    
}



//Create a function called processWithdrawal Purpose: This is the main function that will process the withdrawal by checking all the onditions sequentially. Input: User’s entered password, MFA code, withdrawal amount, actual MFA code, user’s balance, daily limit, and stored password hash. Output: Returns success message if all conditions pass, otherwise returns an error message.

function processWithdrawal(user, inputPassword,inputMfaCode,withdrawalAmount){
    if (!verifyPassword(inputPassword,user.storedHashedPassword)){
        return "transaction failed  incorect password";

    }
    if (!verifyMFA(inputMfaCode,user.correctMfaCode)){
        return "transaction failed  MFA FAILED";
        
    }

    if (!checkBalance(user.balance,withdrawalAmount)){
        return "transaction failed  insufficient balance";
        
    }

    if (!checkDailyLimit(withdrawalAmount,user.dailyLimit)){
        return "transaction failed .Amount exceeds daily limit";
        
    }
    user.balance -= withdrawalAmount;
    return "Transaction  Successful New Balance" + user.balance;
}

//UUSAGE

const password = "securepassword123";
const hashedPassword = bcrypt.hashSync(password,10);

const user ={
    storedHashedPassword:hashedPassword,
    correctMfaCode: "123456",
    balance :1000,
    dailyLimit :500


};

console.log(processWithdrawal(user,"securepassword123", "123456",200));
console.log(processWithdrawal(user,"wrongpassword", "123456",200));
console.log(processWithdrawal(user,"securepassword123", "654321",200));
console.log(processWithdrawal(user,"securepassword123", "123456",1200));
console.log(processWithdrawal(user,"securepassword123", "123456",600));








