import bcrypt from 'bcrypt';

// Function to verify password
async function verifyPassword(inputPassword, storedHashedPassword) {
    return await bcrypt.compare(inputPassword, storedHashedPassword);
}

// Function to verify Multi-Factor Authentication (MFA) code
function verifyMFA(inputMFA, correctMFA) {
    return inputMFA === correctMFA;
}

// Function to check if the user has enough balance
function checkBalance(withdrawalAmount, balance) {
    return withdrawalAmount <= balance;
}

// Function to check if the withdrawal amount is within the daily limit
function checkDailyLimit(withdrawalAmount, dailyLimit) {
    return withdrawalAmount <= dailyLimit;
}

// Main function to process the withdrawal
async function processWithdrawal(inputPassword, storedHashedPassword, inputMFA, correctMFA, withdrawalAmount, balance, dailyLimit) {
    if (!await verifyPassword(inputPassword, storedHashedPassword)) {
        return "Transaction Failed: Incorrect password.";
    }

    if (!verifyMFA(inputMFA, correctMFA)) {
        return "Transaction Failed: MFA failed.";
    }

    if (!checkBalance(withdrawalAmount, balance)) {
        return "Transaction Failed: Insufficient balance.";
    }

    if (!checkDailyLimit(withdrawalAmount, dailyLimit)) {
        return "Transaction Failed: Amount exceeds daily limit.";
    }

    // Deduct the withdrawal amount from the balance
    balance -= withdrawalAmount;

    return `Transaction Successful. Remaining balance: ${balance}`;
}

// Example Usage:
async function main() {
    const userPassword = "securePassword";
    const storedHashedPassword = await bcrypt.hash(userPassword, 10); // Simulated stored hash
    const inputMFA = "123456";
    const correctMFA = "123456";
    const withdrawalAmount = 500;
    const userBalance = 1000;
    const dailyLimit = 700;

    console.log(await processWithdrawal("securePassword", storedHashedPassword, inputMFA, correctMFA, withdrawalAmount, userBalance, dailyLimit));
}

main();
