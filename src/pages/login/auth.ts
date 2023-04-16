function signIn(email: string, password: string) {
  // First check if the password matches the stored password
  // for the given email.
  const passwords = getPasswords();
  if (password !== passwords[email]) {
    throw new Error("Invalid email or password");
  }
  localStorage.setItem("email", email);
}

function signUp(email: string, password: string) {
  const passwords = getPasswords();
  passwords[email] = password;
  localStorage.setItem("passwords", JSON.stringify(passwords));
  localStorage.setItem("email", email);
}

function getPasswords() {
  const passwords = localStorage.getItem("passwords") || "{}";
  return JSON.parse(passwords);
}

function signOut() {
  localStorage.removeItem("email");
}

function getSignedInEmail() {
  return localStorage.getItem("email");
}

function isSignedIn() {
  return getSignedInEmail() !== null;
}

export { signIn, signUp, signOut, getSignedInEmail, isSignedIn };
