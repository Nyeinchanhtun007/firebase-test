export function validateUsername(username) {
  const regex = /^[a-zA-Z0-9]{3,16}$/;
  return regex.test(username);
}


