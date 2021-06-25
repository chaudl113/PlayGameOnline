import { toDataURL } from 'qrcode';
import { authenticator } from 'otplib';

export const svName = "web-game"

export const generateUniqueSecret = () => {
  return authenticator.generateSecret();
};

/** Tạo mã OTP token */
export const generateOTPToken = (username: string, serviceName: string, secret: string) => {

  return authenticator.keyuri(username, serviceName, secret);
};

export const verifyOTPToken = (token: string, secret: string) => {
  return authenticator.verify({ token, secret });
  // return authenticator.check(token, secret)
};

export const generateQRCode = async (otpAuth: string) => {
  try {
    const QRCodeImageUrl = await toDataURL(otpAuth, {
      color: {
        dark: '#00F',
        light: '#0000'
      },
      width: 300,
      margin: 10,
      scale: 10
    });
    return QRCodeImageUrl;
  } catch (error) {
    console.log('Could not generate QR code', error);
    return;
  }
};

