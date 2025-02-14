console.log("hey you")


//. Check if a String is a PalindromeWrite a function to determine if a given string is a palindrome. A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).
function isPalindrome(str) {

    let mystr = str.toLowerCase().replace(/[^a-z0-9-]/g, ''); // Remove special characters
    let reversed = mystr.split('').reverse().join('');
    return mystr === reversed;

}
console.log(isPalindrome('A man , a plan, a canal, Panama'));

console.log(isPalindrome('Was it a car or a cat i saw ?'))

console.log(isPalindrome('Hello World'));


//2.Reverse a StringWrite a function to reverse a given string.
function reverseString(str){
    return str.split("").reverse().join('');
}
console.log(reverseString("hey you"));


//3.Find the Longest Palindromic SubstringWrite a function to find the longest palindromic substring in a given string.

function longestPalindromicSubstring(s) {
    if (!s) {
      return ""; // Handle empty string case
    }
  
    let longest = "";
  
    function expandAroundCenter(left, right) {
      while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
      }
      // Extract the palindrome (excluding the characters that made the loop stop)
      const palindrome = s.substring(left + 1, right);
      if (palindrome.length > longest.length) {
        longest = palindrome;
      }
    }
  
    for (let i = 0; i < s.length; i++) {
      // For odd length palindromes (e.g., "aba")
      expandAroundCenter(i, i);
      // For even length palindromes (e.g., "abba")
      expandAroundCenter(i, i + 1);
    }
  
    return longest;
  }
  
  // Test cases
  console.log(longestPalindromicSubstring('babad')); // Output: "bab" or "aba"
  console.log(longestPalindromicSubstring('cbbd'));  // Output: "bb"
  


// 5. Remove Duplicate Characters While Preserving Order
function removeDuplicate(str, n) {
  let seen = new Set();
  let result = "";
  for (let i = 0; i < n; i++) {
      if (!seen.has(str[i])) {
          seen.add(str[i]);
          result += str[i];
      }
  }
  return result;
}

console.log(removeDuplicate("banana", 6)); // Output: "ban"

// 6. Count Distinct Palindromes in a String
function countPalindromes(str) {
  let palindromes = new Set();
  
  for (let i = 0; i < str.length; i++) {
      // Odd length palindromes
      expandAroundCenter(str, i, i, palindromes);
      // Even length palindromes
      expandAroundCenter(str, i, i + 1, palindromes);
  }
  
  return palindromes.size;

}

console.log(countPalindromes("abba")); // Output: 6 -> {"a", "b", "bb", "abba", "bba", "aba"}

function expandAroundCenter(str, left, right, palindromes) {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
      palindromes.add(str.substring(left, right + 1));
      left--;
      right++;
  }
}



// 7. Longest Common Prefix
function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  
  let prefix = strs[0];
  
  for (let i = 1; i < strs.length; i++) {
      while (strs[i].indexOf(prefix) !== 0) {
          prefix = prefix.substring(0, prefix.length - 1);
          if (!prefix) return "";
      }
  }
  
  return prefix;
}
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"

// 8. Case Insensitive Palindrome
function isPalindromeCaseInsensitive(str) {
  str = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Normalize string
  let left = 0, right = str.length - 1;
  
  while (left < right) {
      if (str[left] !== str[right]) {
          return false;
      }
      left++;
      right--;
  }
  
  return true;
}
console.log(isPalindromeCaseInsensitive("A man, a plan, a canal: Panama")); // Output: true





