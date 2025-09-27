const otpMap = new Map(); // phone -> { otp, expiresAt }

const OTP_TTL_SECONDS = process.env.OTP_TTL_SECONDS
  ? parseInt(process.env.OTP_TTL_SECONDS)
  : 300;

function generateOTP() {
  return "" + Math.floor(100000 + Math.random() * 900000); // 6-digit
}

function saveOTP(phone) {
  const otp = generateOTP();
  const expiresAt = Date.now() + OTP_TTL_SECONDS * 1000;
  otpMap.set(phone, { otp, expiresAt });
  return otp;
}

function verifyOTP(phone, otp) {
  const entry = otpMap.get(phone);
  if (!entry) return { ok: false, reason: "no_otp" };
  if (Date.now() > entry.expiresAt) {
    otpMap.delete(phone);
    return { ok: false, reason: "expired" };
  }
  if (entry.otp !== otp) return { ok: false, reason: "wrong" };
  otpMap.delete(phone);
  return { ok: true };
}

module.exports = { saveOTP, verifyOTP };
