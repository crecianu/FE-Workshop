const urlParam = new URLSearchParams(window.location.search);
const idUser = urlParam.get('id');
const endpointUrl = './src/data/users.json';

fetch(endpointUrl)
    .then((data) => {
        if (data.ok) {
            return data.json();
        }
        throw Error('An error occured');
    })
    .then((realData) => {
        // console.log(realData);
        const user = realData.find((user) => {
            return user.id === idUser
        });
        console.log(user);
        if(user){
            const name = `${user.first_name} ${user.last_name}`;
            createUser(name, user.email, user.avatar, user.id);
        }else{
            throw Error('An error occured');
        }
    })
    .catch((err) => {
        console.log('err');
        console.log(err);
    })

const mainContainer = document.querySelector('#details');

function createUser(userName, userEmail, userImg, id) {

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