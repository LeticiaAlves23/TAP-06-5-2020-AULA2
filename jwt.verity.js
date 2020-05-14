var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded.foo) // bar
 
jwt.verify(token, 'shhhhh', function(err, decoded) {
  console.log(decoded.foo) // bar
});
 
try {
  var decoded = jwt.verify(token, 'wrong-secret');
} catch(err) {
}
 
jwt.verify(token, 'secret-key', function(err, decoded) {

});
 
var cert = fs.readFileSync('public.pem');  
jwt.verify(token, cert, function(err, decoded) {
  console.log(decoded.foo)
});
 
var cert = fs.readFileSync('public.pem');  
jwt.verify(token, cert, { audience: 'urn:foo' }, function(err, decoded) {
  // if audience mismatch, err == invalid audience
});
 
// verify issuer
var cert = fs.readFileSync('public.pem');  
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer' }, function(err, decoded) {
  // if issuer mismatch, err == invalid issuer
});
 
// verify jwt id
var cert = fs.readFileSync('public.pem'); 
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid' }, function(err, decoded) {
  // if jwt id mismatch, err == invalid jwt id
});
 

var cert = fs.readFileSync('public.pem');  
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid', subject: 'subject' }, function(err, decoded) {
  // if subject mismatch, err == invalid subject
});
 
var cert = fs.readFileSync('public.pem'); 
jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {
});
 
var jwksClient = require('jwks-rsa');
var client = jwksClient({
  jwksUri: 'https//localhost:3000/validartoken'
});
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
 
jwt.verify(token, getKey, options, function(err, decoded) {
  console.log(decoded.foo) 
});
 