const users = new Map();
users.set('Felipe', 'Admin');
users.set('Miriam Kozey', 'User');
users.set('Edmond Wuckert', 'User');
users.set('Justin Larkin', 'User');
users.set('Teresa Pfannerstill', 'Admin');
users.set('Gail Green', 'Admin');

const getAdmins = (data) => {
    const isAdmin = [];
    for ([key, value] of data) {
        if (value === 'Admin') isAdmin.push(key);
    }
    return isAdmin;
}

console.log(getAdmins(users));