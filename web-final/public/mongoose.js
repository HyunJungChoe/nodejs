



// 사용자 로딩
function getUser() {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      var users = JSON.parse(xhr.responseText);
      console.log(users);
      var tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(function (user) {
        var row = document.createElement('tr');
        row.addEventListener('click', function () {
          getComment(user._id);
        });
        var td = document.createElement('td');
        td.textContent = user._id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.pwd;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.nickname ;
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', '/users');
  xhr.send();
}



//로그인 하려고 했던 것 
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  var id = e.target.id.value;
  var pwd = e.target.pwd.value;

  if (!id) {
    return alert('아이디를 입력하세요');
  }
  if (!pwd) {
    return alert('비밀번호를 입력하세요');
  }
  
    

});



// 사용자 등록 시
document.getElementById('user-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var id = e.target.id.value;
  var pwd = e.target.pwd.value;
  var nickname = e.target.nickname.value;
  if (!id) {
    return alert('아이디를 입력하세요');
  }
  if (!pwd) {
    return alert('비밀번호를 입력하세요');
  }
  if (!nickname) {
    return alert('닉네임을 입력하세요');
  }


  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getUser();
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('POST', '/users');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ id: id, pwd: pwd, nickname: nickname }));
  e.target.id.value = '';
  e.target.pwd.value = '';
  e.target.nickname.value = '';
});


