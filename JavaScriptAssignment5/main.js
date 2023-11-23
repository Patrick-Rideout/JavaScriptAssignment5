
const users_url = 'https://jsonplaceholder.typicode.com/users';

async function getUsers(url) {
      var studentSelector = document.querySelector("#studentSelector");
      studentSelector.innerHTML = "<h1>Student Selector<h1/>";
      var selectList = document.createElement("select");
      selectList.addEventListener("change", getAlbums);
      
      try {
            const response = await fetch(url);
            if (!response.ok) {
                  throw new Error('Network Error.');
            }
            const data = await response.json();
            console.log(data);
            data.forEach(user => {
                  var option = document.createElement("option");
                  option.value = user['id'];
                  option.text = user['name'];
                  selectList.appendChild(option);
            });
      } catch (error) {
            console.error('Error:', error);
      }
      studentSelector.appendChild(selectList);
}

async function getAlbums(evt) {
      const selectedUserId = evt.target.value;
      const albums_url = `https://jsonplaceholder.typicode.com/albums?userId=${selectedUserId}`;
    
      try {
            const response = await fetch(albums_url);
            if (!response.ok) {
                  throw new Error('Network Error.');
            }
            const albums = await response.json();
            let tab = 
            "<tr><th>UserID</th><th>ID</th><th>Title</th></tr>";
            albums.forEach(album => {
                  tab += `<tr><td>${album.userId} </td><td>${album.id}</td><td>${album.title}</td> </tr>`;
            });
            document.getElementById("albums").innerHTML = tab;
      } catch (error) {
            console.error('Error:', error);
      }

}

getUsers(users_url);

const loadFirstUser = { target: { value: '1' } };

getAlbums(loadFirstUser);
