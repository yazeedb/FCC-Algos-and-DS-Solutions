function palindrome(str) {
  const alphanumericOnly = str
    // 1) Lowercase the input
    .toLowerCase()
    // 2) Strip out non-alphanumeric characters
    .match(/[a-z0-9]/g);

  // 3) return string === reversedString
  return alphanumericOnly.join('') === alphanumericOnly.reverse().join('');
}

palindrome('eye');
