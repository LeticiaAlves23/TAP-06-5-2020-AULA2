const crypto = require('crypto');
 
const header = JSON.stringify({
    'alg': 'HS256',
    'typ': 'JWT'
});
 
const payload = JSON.stringify({
    'email': 'aylan@boscarino.com',
    'password': 'ya0gsqhy4wzvuvb4'
});
 
const base64Header = Buffer.from(header).toString('base64').replace(/=/g, '');
const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
const secret = 'my-custom-secret';
 
const data = base64Header + '.' + base64Payload;
 
const signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64');
 
const signatureUrl = signature
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
 
console.log(signatureUrl);