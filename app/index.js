(async function init() {
    const response = await fetch('http://localhost:3000/get-profile');
    console.log("response", response);
    const user = await response.json();
    console.log(JSON.stringify(user));

    // document.getElementById('name').textContent = user.name ? user.name : 'Anna Smith';
    // document.getElementById('email').textContent = user.email ? user.email : 'anna.smith@example.com';
    // document.getElementById('interests').textContent = user.interests ? user.interests : 'coding';

    // const cont = document.getElementById('container');
    // cont.style.display = 'block';
})();
