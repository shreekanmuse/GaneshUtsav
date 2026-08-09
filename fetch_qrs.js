import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const instagramUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fwww.instagram.com%2Fganesh_mitra_mandal_ngo%3Figsh%3DajhlanB0OXN4ZW5i&color=1b0003&bgcolor=fffbf2&ecc=H';
const locationUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fmaps.app.goo.gl%2Fboy7Kb4CX3arMUzA6%3Fg_st%3Daw&color=1b0003&bgcolor=fffbf2&ecc=H';

const imgDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

const download = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    if (cb) cb(err);
  });
};

console.log('Downloading custom QR codes...');
download(instagramUrl, path.join(imgDir, 'qr_instagram.png'), (err) => {
  if (err) {
    console.error('Error downloading Instagram QR:', err.message);
  } else {
    console.log('Saved assets/images/qr_instagram.png');
  }
  
  download(locationUrl, path.join(imgDir, 'qr_location.png'), (err) => {
    if (err) {
      console.error('Error downloading Location QR:', err.message);
    } else {
      console.log('Saved assets/images/qr_location.png');
    }
  });
});
