hash("TEST").then((hash1) => {
    console.log(hash1);
})


function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  });
}


async function hashcash() {
   const randstr = await fetch('http://localhost:7000/hashcash');
   var data  = await randstr.text();
   console.log(data);
}

hashcash();