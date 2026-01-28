export default function maskedEmail(email) {
  // 1. Keep the last 13 characters (ev29@gmail.com)
  // 2. Pad the start until the total length is 21 (to add 8 asterisks)
  return email.slice(-14).padStart(22, "*"); // "********ev29@gmail.com"
}
