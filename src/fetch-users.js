let users = [];

// const endpointUrl = "https://reqres.in/api/users";
const endpointUrl = './src/data/users.json';

fetch(endpointUrl)
    .then((data) => {
        if (data.ok) {
            return data.json();
        }
        throw Error('An error occured');
    })
    .then((realData) => {
        users = realData;

        generateUsers(users.slice(0, 3));
    })
    .catch((err) => {
        console.log('err');
        console.log(err);
    })

const mainContainer = document.querySelector('#users');

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

function generateUsers(userList) {
    // for(let i = 0; i< userList.length; i++){
    //     const user = userList[i];  
    //     console.log(user);  
    // }
    const mainContainer = document.querySelector('#users');
    mainContainer.innerHTML = '';

    for (const user of userList) {
        const name = `${user.first_name} ${user.last_name}`;
        createUser(name, user.email, user.avatar, user.id);
    }
}


// filter

const filterUsers = document.querySelector('#filter_users');
filterUsers.addEventListener('input', (event) => {
    const input = event.target.value.toLocaleLowerCase().replace(/\s/g, '');

    const filterdUsers = users.filter((user) => {
        // const userFirstName = user.first_name.slice(0, input.length);
        // const userFirstName = user.first_name.substring(0, input.length);
        // console.log(userFirstName);

        // return userFirstName..toLocaleLowerCase() === input;

        const firstNameFilter = user.first_name.toLocaleLowerCase().startsWith(input);
        const lastNameFilter = user.last_name.toLocaleLowerCase().startsWith(input);

        const fullNameFilter = `${user.first_name}${user.last_name}`.toLocaleLowerCase().startsWith(input);
        return firstNameFilter || lastNameFilter || fullNameFilter;
    });

    generateUsers(filterdUsers);
});


const sortUsers = document.querySelector('#sorting');
sortUsers.addEventListener('change', (event) => {
    const input = event.target.value;

    // const testArray = [3, 2, 1, 6, 7];
    // let sortedArray = [];

    const copyArray = [...users];
    // const copyObj = {...users};
    // const copyArray1 = Object.assign([], users);
    // console.log(copyArray);
    // console.log(copyObj);
    // console.log(copyArray1);

    if (input === 'asc') {
        // copyArray.sort((a , b) => a.first_name.localeCompare(b.first_name));
        copyArray.sort((a, b) => {
            if (a.first_name > b.first_name) {
                return 1;
            } else if (a.first_name < b.first_name) {
                return -1;
            } else {
                return 0;
            }
        });

        // sortedArray = testArray.sort((a, b) => {
        //     if (a > b) {
        //         return 1;
        //     } else if (a < b) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        //     // return a > b ? 1 : a < b ? - 1 : 0;
        // })

    } else if (input === 'desc') {
        copyArray.sort((a, b) => b.first_name.localeCompare(a.first_name));

        // sortedArray = testArray.sort((a, b) => {
        //     return a > b ? -1 : a < b ? 1 : 0;
        // })

    }

    // console.log(users);

    generateUsers(copyArray);
});


// user details

mainContainer.addEventListener('click', (event) =>{
    const userId = event.target.parentElement.id;

    window.open(`/user-details.html?id=${userId}`, "_blank");
})



// search

const searchInput = document.querySelector('#search_by');
const searchButton = document.querySelector('#search_button');
searchButton.addEventListener('click', () =>{
    // console.log(searchInput.value);
    localStorage.setItem('userFirstName', searchInput.value);

    localStorage.setItem('userDetails', JSON.stringify(users[0]));

    window.open(`/search.html`, "_blank");
})


// paginare

const nextButton = document.querySelector('#next_button');
const prevButton = document.querySelector('#prev_button');
let contor = 0;


nextButton.addEventListener('click', () =>{
    contor++;
    generateUsers(users.slice(contor * 3, (contor * 3) + 3 ));
    if(contor * 3 > users.length / 3){
        nextButton.setAttribute('disabled', true);
        prevButton.removeAttribute('disabled');
    }
})
prevButton.addEventListener('click', () =>{
    contor--;
    generateUsers(users.slice(contor * 3, (contor * 3) + 3));
    if(contor <= 0){
        prevButton.setAttribute('disabled', true);
        nextButton.removeAttribute('disabled');
    }
})