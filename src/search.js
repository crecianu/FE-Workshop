const userFirstName = localStorage.getItem('userFirstName');
const userString = localStorage.getItem('userDetails');
const userObj = JSON.parse(userString);
console.log(userObj);


const endpointUrl = './src/data/users.json';

// fetch(endpointUrl)
//     .then((data) => {
//         if (data.ok) {
//             return data.json();
//         }
//         throw Error('An error occured');
//     })
//     .then((realData) => {
//         // console.log(realData);
//         // const user = realData.find((user) => {
//         //     return user.first_name.toLocaleLowerCase().startsWith(userFirstName);
//         // });

//         if(user){
//             const name = `${user.first_name} ${user.last_name}`;
//             createUser(name, user.email, user.avatar, user.id);
//         }else{
//             throw Error('An error occured');
//         }
//     })
//     .catch((err) => {
//         console.log('err');
//         console.log(err);
//     })

const userName = `${userObj.first_name} ${userObj.last_name}`;
createUser(userName, userObj.email, userObj.avatar, userObj.id);

function createUser(userName, userEmail, userImg, id) {
    const mainContainer = document.querySelector('#details');

    const articleContainer = document.createElement('article');
    const img = document.createElement('img');
    const name = document.createElement('div');
    const email = document.createElement('div');

    email.innerHTML = userEmail;
    name.innerHTML = userName;
    img.setAttribute('src', userImg);
    articleContainer.setAttribute('id', id);

    articleContainer.appendChild(img);
    articleContainer.appendChild(name);
    articleContainer.appendChild(email);

    mainContainer.appendChild(articleContainer);
}