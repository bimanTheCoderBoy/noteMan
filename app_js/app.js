
showItems();

// time & logIn
if (localStorage.getItem('lastLogInTime') == null) {
  localStorage.setItem('lastLogInTime', 0);
}
const d = new Date();
const tCheck = BigInt(d.getTime());

if ((tCheck - BigInt(localStorage.getItem('lastLogInTime'))) > 1800000) { //here 60000 means 1 minute so 30 minutes means 30*60000
  logIn();
}
//time & logIn--end

// addNote to the local storage functionality
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
  let addTxt = document.getElementById('addTxt');
  let addTle = document.getElementById('addTle');
  let notes = localStorage.getItem('notes');
  let notesTitle = localStorage.getItem('notesTitle');
  let notesArray;
  let notesTitleArray;
  if (notes == null) {
    notesArray = [];

  }
  else {
    notesArray = JSON.parse(notes);

  }
  if (notesTitle == null) {

    notesTitleArray = [];
  }
  else {

    notesTitleArray = JSON.parse(notesTitle);
  }
  notesTitleArray.push(addTle.value);
  localStorage.setItem('notesTitle', JSON.stringify(notesTitleArray));
  addTle.value = "";

  notesArray.push(addTxt.value);
  localStorage.setItem('notes', JSON.stringify(notesArray));
  addTxt.value = "";
  showItems();

})

// showItems
let flag_2 = 0;//initialization for nav star click
function showItems() {
  //greeting
  if (localStorage.getItem('userData') != null) {
    document.getElementById('greet').innerText = `Hi ${JSON.parse(localStorage.getItem('userData'))[0]}, Welcome to noteMan`;
  }

  // taking Items from local 

  let notes = localStorage.getItem('notes');
  let notesTitle = localStorage.getItem('notesTitle');
  let notesArray;
  let notesTitleArray;
  if (notes != null) {
    // convert it into a array
    notesArray = JSON.parse(notes);
    notesTitleArray = JSON.parse(notesTitle);
    document.getElementById('total-num').innerHTML = `Your Notes [<h3 style="color:black;display:inline;text-shadow:0 0 20px yellow;"><b>${notesArray.length}</b></h3>]`;

  } if (notes == null || notesArray.length == 0) {

    document.getElementById('notes').innerHTML = `<h3>You don't have any note!..</h3>`;
    return;
  } else {
    document.getElementById('notes').innerHTML = `
                                                  <div class="col" id="col1"></div>
                                                  <div class="col" id="col2"></div>
                                                  <div class="col" id="col3"></div>
                                                  <div class="col" id="col4"></div>`;

  }
  let iterator = notesArray;

  let html1 = "";
  let html2 = "";
  let html3 = "";
  let html4 = "";
  let starCount = 0;
  let dailyCount = 0;
  //making a html-code which contains all cards 
  iterator.forEach(function (element, index) {
    //nav star button
    if (document.getElementById('navStar').style.backgroundColor == 'rgb(241, 132, 8)') {
      if (localStorage.getItem('star') != null) {
        if (!localStorage.getItem('star').includes(`"${index}"`)) {
          if (index == notesArray.length - 1 && starCount == 0) { document.getElementById('notes').innerHTML = '<h3>You did not marked any Note as ⭐'; }
          return;
        }
        else { starCount++; }
      }
    }
    let Title = notesTitleArray[index];
    if (Title == "") { Title = `Note #${index + 1}` }
    let mod = (index + 1) % 4;
    //star-section
    let bgColour = 'rgb(17, 16, 16)';
    let bgShadow = '0 0 11px rgb(3, 180, 12)';
    let bgStarClour = 'rgb(70, 72, 71)';
    let star = localStorage.getItem('star');
    if (localStorage.getItem('star') != null && star.includes(`"${index}"`)) {
      // bgColour='rgba(2, 160, 20,0.3)';
      bgShadow = '0 0 8px rgb(3, 180, 12),0 0 25px rgb(235, 135, 20)';
      bgStarClour = 'rgb(230, 130, 20)';
    }
    // complete task and daily task stuff
    if (Title.toLowerCase().includes("done")) {
      bgShadow = '0 0 20px blue';

    }
    if (Title.toLowerCase().includes("daily")) {
      bgShadow = '0 0 20px white';

    }
    if (Title.toLowerCase().includes("daily") && Title.toLowerCase().includes("done")) {
      bgShadow = '0 0 10px white,0 0 25px blue';

    }
    if (document.getElementById('navDaily').style.backgroundColor == 'darkgray') {
      if (!Title.toLowerCase().includes("daily")) {
        if (index == notesArray.length - 1 && dailyCount == 0) { document.getElementById('notes').innerHTML = '<h3>You do not have any Daily Note...!'; }
        return;
      } else {
        dailyCount++;
      }
    }
    //no star no daily notes Zone
    // if(index==notesArray.length-1&&starCount==0){document.getElementById('notes').innerHTML='<h3>You did not marked any Note as ⭐';return;}
    // if(index==notesArray.length-1&&dailyCount==0){document.getElementById('notes').innerHTML='<h3>You do not have any Daily Note';return;}
    if (mod == 0) {
      html4 += `<div class="card noteCards" id="c${index}"style=" display:flex; margin-bottom: 2.3rem; width: 18rem; background-color: ${bgColour}; box-shadow: ${bgShadow}; border-radius: 10px;">
        <div class="card-body ex-card-body">
          <h5 class="card-title" style="width:77.5%;margin-right:2%; display:inline-block;" id="t${index}" contenteditable="true"><b>${Title}</b></h5>

          <button id="${index}" onclick="starClick(this.id)" class="btn  ex-card-button ex-card-star" style="background-color:${bgStarClour};height:3rem;width:3rem;border-radius:100%; "><img style="width:2rem"src="img/star.png" alt="star"></button>
           <br><br>
          <p contenteditable="true" class="card-text" id="p${index}">${element}</p>

          <button id="${index}" onclick="removeNote(this.id)" class="btn  ex-card-button ex-card-button1" style="height:3rem;width:3rem;border-radius:100%; "><img style="width:2rem"src="img/delete_button.png" alt="Update"></button>

          <button id="${index}" onclick="updateNote(this.id)" class="btn  ex-card-button ex-card-button2" style="height:3rem;width:3rem;border-radius:100%; margin-left:3.1rem"><img style="width:2rem"src="img/update-icon-png.jpg" alt="Update"></button>

          <button id="${index}" onclick="logIn('maximize',this.id)" class="btn  ex-card-button ex-card-button2 maximize" style="height:3rem;width:3rem;border-radius:100%; margin-left:3rem"><img style="width:2rem"src="img/maximize.png" alt="Maximize"></button>

        </div>
      </div>`
    }
    else if (mod == 3) {
      html3 += `<div class="card noteCards"id="c${index}" style=" display:flex; margin-bottom: 2.3rem; width: 18rem; background-color: ${bgColour}; box-shadow: ${bgShadow}; border-radius: 10px;">
        <div class="card-body ex-card-body">

        <h5 class="card-title" style="width:77.5%;margin-right:2%; display:inline-block;" id="t${index}" contenteditable="true"><b>${Title}</b></h5>

        <button id="${index}" onclick="starClick(this.id)" class="btn  ex-card-button ex-card-star" style="background-color:${bgStarClour};height:3rem;width:3rem;border-radius:100%; "><img style="width:2rem"src="img/star.png" alt="star"></button>
        <br><br>
          
          <p contenteditable="true" class="card-text" id="p${index}">${element}</p>

          <button id="${index}" onclick="removeNote(this.id)" class="btn  ex-card-button ex-card-button1" style="height:3rem;width:3rem;border-radius:100%; "><img style="width:2rem"src="img/delete_button.png" alt="Update"></button>

          <button id="${index}" onclick="updateNote(this.id)" class="btn  ex-card-button ex-card-button2" style="height:3rem;width:3rem;border-radius:100%; margin-left:3.1rem"><img style="width:2rem"src="img/update-icon-png.jpg" alt="Update"></button>

          <button id="${index}" onclick="logIn('maximize',this.id)" class="btn  ex-card-button ex-card-button2 maximize" style="height:3rem;width:3rem;border-radius:100%; margin-left:3rem"><img style="width:2rem"src="img/maximize.png" alt="Maximize"></button>
        </div>
      </div>`
    }
    else if (mod == 2) {
      html2 += `<div class="card noteCards" id="c${index}"style=" display:flex;margin-bottom: 2.3rem; width: 18rem; background-color:${bgColour}; box-shadow: ${bgShadow}; border-radius: 10px;">
        <div class="card-body ex-card-body">

        <h5 class="card-title" style="width:77.5%;margin-right:2%; display:inline-block;" id="t${index}" contenteditable="true"><b>${Title}</b></h5>

        <button id="${index}" onclick="starClick(this.id)" class="btn  ex-card-button ex-card-star" style="background-color:${bgStarClour};height:3rem;width:3rem;border-radius:100%; "><img style="width:2rem"src="img/star.png" alt="star"></button>
        <br><br>
          
          <p contenteditable="true" class="card-text" id="p${index}">${element}</p>

          <button id="${index}" onclick="removeNote(this.id)" class="btn  ex-card-button ex-card-button1" style="height:3rem;width:3rem;border-radius:100%; "><img style="width:2rem"src="img/delete_button.png" alt="Update"></button>

          <button id="${index}" onclick="updateNote(this.id)" class="btn  ex-card-button ex-card-button2" style="height:3rem;width:3rem;border-radius:100%; margin-left:3.1rem"><img style="width:2rem"src="img/update-icon-png.jpg" alt="Update"></button>

          <button id="${index}" onclick="logIn('maximize',this.id)" class="btn  ex-card-button ex-card-button2 maximize" style="height:3rem;width:3rem;border-radius:100%; margin-left:3rem"><img style="width:2rem"src="img/maximize.png" alt="Maximize"></button>

        </div>
      </div>`
    }
    else {
      html1 += `<div class="card noteCards"id="c${index}" style=" display:flex; margin-bottom: 2.3rem; width: 18rem; background-color: ${bgColour}; box-shadow: ${bgShadow}; border-radius: 10px;">
        <div class="card-body ex-card-body">

        <h5 class="card-title" style="width:77.5%;margin-right:2%; display:inline-block;" id="t${index}" contenteditable="true"><b>${Title}</b></h5>

        <button id="${index}" onclick="starClick(this.id)" class="btn  ex-card-button ex-card-star" style="background-color:${bgStarClour};height:3rem;width:3rem;border-radius:100%; "><img style="width:2rem"src="img/star.png" alt="star"></button>
        <br><br>
          
          <p contenteditable="true" class="card-text" id="p${index}">${element}</p>

          <button id="${index}" onclick="removeNote(this.id)" class="btn  ex-card-button ex-card-button1" style="height:3rem;width:3rem;border-radius:100%; "><img style="width:2rem"src="img/delete_button.png" alt="Update"></button>
          
          <button id="${index}" onclick="updateNote(this.id)" class="btn  ex-card-button ex-card-button2" style="height:3rem;width:3rem;border-radius:100%; margin-left:3.1rem"><img style="width:2rem"src="img/update-icon-png.jpg" alt="Update"></button>

          <button id="${index}" onclick="logIn('maximize',this.id)" class="btn  ex-card-button ex-card-button2 maximize" style="height:3rem;width:3rem;border-radius:100%; margin-left:3rem"><img style="width:2rem"src="img/maximize.png" alt="Maximize"></button>

        </div>
      </div>`
    }

  });
  //putting the code on notes container
  if (document.getElementById('col1') != null && document.getElementById('col2') != null && document.getElementById('col3') != null && document.getElementById('col4') != null) {
    document.getElementById('col1').innerHTML = html1;
    document.getElementById('col2').innerHTML = html2;
    document.getElementById('col3').innerHTML = html3;
    document.getElementById('col4').innerHTML = html4;
  }
}

//deleting a Note
function removeNote(de_index) {
  //update local storage
  removeStar(de_index);
  // taking Items from local 
  let notesTitle = localStorage.getItem('notesTitle');
  let notes = localStorage.getItem('notes');
  let notesTitleArray;
  let notesArray;
  if (notes != null) {
    // convert it into a array
    notesTitleArray = JSON.parse(notesTitle);
    notesArray = JSON.parse(notes);

  }
  //maintaining star 
    starFix(de_index);


  //removing de-element from array
  notesTitleArray.splice(de_index, 1);
  notesArray.splice(de_index, 1);
  localStorage.setItem('notesTitle', JSON.stringify(notesTitleArray));
  localStorage.setItem('notes', JSON.stringify(notesArray));

  showItems();

}


//editing a note
function updateNote(indexx) {
  // taking Items from local 
  let notesTitle = localStorage.getItem('notesTitle');
  let notes = localStorage.getItem('notes');
  let notesTitleArray;
  let notesArray;
  if (notes != null) {
    // convert it into a array
    notesTitleArray = JSON.parse(notesTitle);
    notesArray = JSON.parse(notes);

  }
  let tmp = document.getElementById(`p${indexx}`).innerText;
  let temp = document.getElementById(`t${indexx}`).innerText;
  if (tmp == null) { return; }
  notesTitleArray[indexx] = temp;
  notesArray[indexx] = tmp;
  localStorage.setItem('notesTitle', JSON.stringify(notesTitleArray));
  localStorage.setItem('notes', JSON.stringify(notesArray));
  showItems();
}


//searching feature-locked
let search = document.getElementById('search_input');// search element

search.addEventListener("input", function searchNote() {

  let allNotes = document.getElementsByClassName('noteCards');//taking all cards
  console.log(search.value);

  showItems();
  //main search Iteration
  let tp = 0;
  Array.from(allNotes).forEach(function (element, index) {

    let tmp = document.getElementById(`p${index}`).innerText;
    let temp = document.getElementById(`t${index}`).innerText;

    if ((tmp.toLowerCase().includes(search.value.toLowerCase()) || temp.toLowerCase().includes(search.value.toLowerCase()))) {
      document.getElementById(`c${index}`).style.display = 'block';
      tp++;
    } else { document.getElementById(`c${index}`).style.display = 'none'; }
  });


  if (tp == 0) { document.getElementById('notes').innerHTML = `<div><h3><b>No search results for "${search.value}"</b></h3></div>`; }

});


//star stuff
function starClick(index) {
  // let clickCard = document.getElementById(`c${index}`);


  if (!removeStar(index)) {
    addStar(index);
  }

  showItems();

}
// add starData to local Storage--locked
function addStar(cardIndex) {
  let star = localStorage.getItem('star');
  let starArray;
  if (star == null || star == undefined) {
    starArray = [];
  }
  else {
    starArray = JSON.parse(star);
  }
  starArray.push(cardIndex);
  localStorage.setItem('star', JSON.stringify(starArray));

}

//remove star from local storage--locked
function removeStar(cardIndex) {
  let star = localStorage.getItem('star');
  let starArray;
  let flag = 0;
  if (star == null || star == undefined) {
    starArray = [];
  }
  else {
    starArray = JSON.parse(star);
  }
  starArray.forEach(function (element, index) {

    if (element == cardIndex) {
      starArray.splice(index, 1);
      localStorage.setItem('star', JSON.stringify(starArray));

      flag = 1;

    }
  });
  if (flag == 1) {
    return true;
  }
  else {
    return false;
  }
}

// nav-star-click


function navStarClick(query) {
  if (flag_2 == 0 && query == 1) {
    flag_2 = 1;
    document.getElementById('navStar').style.backgroundColor = 'rgb(241, 132, 8)';
    showItems();
  }
  else if (flag_2 == 1 && query == 1) {
    flag_2 = 0;
    document.getElementById('navStar').style.backgroundColor = 'rgb(70, 72, 71)';
    showItems();
  }
  return flag_2;

}
// nav-Daily-click
let flag_3 = 0;
function navDailyClick(query) {
  if (flag_3 == 0 && query == 1) {
    flag_3 = 1;
    document.getElementById('navDaily').style.backgroundColor = 'darkgray';
    showItems();
  }
  else if (flag_3 == 1 && query == 1) {
    flag_3 = 0;
    document.getElementById('navDaily').style.backgroundColor = 'rgb(70, 72, 71)';
    showItems();
  }
  return flag_3;

}
//------------------------------------------------LOG-IN--AREA------------------------------------------------\\


//password-check card
//password update card
function logIn(flagUpdate = "none", maxIndex = 0) {
  let body = document.getElementsByTagName('body')[0];
  // console.log(body);
  let bigDiv = document.createElement('div');
  //password sign-in card
  let signIn = document.createElement('div');
  signIn.id = "signIn";
  signIn.innerHTML =
    `
            <div class="c-in" id="signInCard">
            <div class="input-group flex-nowrap in">
            <span class="input-group-text" id="addon-wrapping" style="background-color:rgb(169, 162, 162);">Name</span>
            <input type="text"id="signInUserName" class="form-control"style="background-color:rgbrgb(233,236,239);" placeholder="enter your FirstName..." aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div class="input-group flex-nowrap in">
            <span class="input-group-text"style="background-color:rgb(169, 162, 162);" id="addon-wrapping">Create Password</span>
            <input type="text" id="password"class="form-control" style="background-color:rgbrgb(233,236,239);"placeholder="enter your New Password.." aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div class="input-group flex-nowrap in">
            <span class="input-group-text" id="addon-wrapping"style="background-color:rgb(169, 162, 162);">Confirm Password</span>
            <input type="text"id="rePassword" class="form-control"style="background-color:rgbrgb(233,236,239);" placeholder="Re-enter your Password.." aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            </div>
            <div class="b-in" >
            <button type="button" onClick="signInSet()"style="padding:0.5rem;padding-top:0.7rem;width:5.5rem; height:2.8rem;border-radius:10px;"class="btn btn-outline-info"><h6>Sign in</h6></button>
            </div>
            
            `


  //password log-in card
  let logIn = document.createElement('div');
  logIn.id = "logIn";
  let de_userData = localStorage.getItem('userData');
  if (de_userData != null) { de_userData = JSON.parse(de_userData)[0]; }
  else { de_userData = "Dear User"; }
  logIn.innerHTML =
    `
            <h3><b style="text-shadow:0 0 10px green;">noteMan</b></h3>
            <h5><b style="text-shadow:0 0 2px blue;">${de_userData} Please enter your Password</b></h5>
            
            <div class="c-in">
            <div class="input-group flex-nowrap in">
            <span class="input-group-text" id="addon-wrapping"style="background-color:rgb(169, 162, 162);">Password</span>
            <input type="text" id="logInInput" class="form-control"style="background-color:rgbrgb(233,236,239);" placeholder="enter your Password.." aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            </div>
            
            <button type="button" onClick="logInSet()" style="margin-top:0.9rem;padding:0.5rem;padding-top:0.7rem;width:5.5rem; height:2.8rem;border-radius:10px;"class="btn btn-outline-info"><h6>Log in</h6></button>
            `

  //user data update card
  let updateData = document.createElement('div');
  let placeholder = localStorage.getItem('userData');
  if (placeholder != null) { placeholder = JSON.parse(placeholder); }
  else { placeholder = ["write your name here", 'enter new password']; }

  updateData.id = 'updateData';
  updateData.innerHTML =
    `
          <button type="button" id="updateClose" onClick="closeUpdate()" style="float:right;position:relative;left:-1rem;top:-0.1rem;"class="btn-close btn-close-white" aria-label="Close"></button>
          <br>
          <h4 style="position:relative;top:-1rem;"><b style="text-shadow:0 0 2px blue;">Update User data</b></h4>
          <div class="update-main-div-element">
          <div class="c-in " >
            <div class="input-group flex-nowrap in">
            <span class="input-group-text" id="addon-wrapping" style="background-color:rgb(169, 162, 162);">Name</span>
            <input type="text"id="updateName" class="form-control"style="background-color:rgbrgb(233,236,239);" placeholder="${placeholder[0]}" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div class="input-group flex-nowrap in">
            <span class="input-group-text"style="background-color:rgb(169, 162, 162);" id="addon-wrapping">Update Password</span>
            <input type="text" id="updatePassword"class="form-control" style="background-color:rgbrgb(233,236,239);"placeholder="${placeholder[1]}" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div class="input-group flex-nowrap in">
            <span class="input-group-text" id="addon-wrapping"style="background-color:rgb(169, 162, 162);">Confirm Password</span>
            <input type="text"id="updateRePassword" class="form-control"style="background-color:rgbrgb(233,236,239);" placeholder="${placeholder[1]}" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            </div>
            <div class="b-in" >
            <button type="button" onClick="updateData()"style="padding:0.5rem;padding-top:0.7rem;width:5.5rem; height:2.8rem;border-radius:10px;"class="btn btn-outline-info"><h6>Update</h6></button>
            </div>
            </div>
          `
  //maximize stuff
  let maximize = document.createElement('div');
  let de_title = document.getElementById(`t${maxIndex}`);
  let de_para = document.getElementById(`p${maxIndex}`);
  if (de_title != null && de_para != null) {
    de_para = de_para.innerText;
    de_title = de_title.innerText;
  } else {
    de_para = "wrong!";
    de_title = "wrong!"
  }
  maximize.id = 'maximize-div';
  maximize.innerHTML =
    `
            <button type="button" id="updateClose" onClick="closeUpdate()" style="float:right;position:relative;left:-1rem;top:-0.1rem;"class="btn-close btn-close-white" aria-label="Close"></button>
          
            <h5 id="tMax${maxIndex}" style="width:90%; margin:5%;max-height:10vh;overflow-y: scroll;" contenteditable="true"><b>${de_title}</b></h5>
            <p id="pMax${maxIndex}" style="width:90%;max-height:37vh;overflow-y: scroll; margin:5%;font-size:larger;"contenteditable="true" >${de_para}</p>
            
            <button type="button" onClick="maximzeOkOnClick(${maxIndex})" style="margin-top:-1rem;padding:0.5rem;padding-top:0.7rem;width:5.5rem; height:2.8rem;border-radius:10px;"class="btn btn-outline-warning"><h6>OK</h6></button>
            <br><br>
            `
  bigDiv.id = "bigDiv";
  let userCheck = localStorage.getItem('userData');
  if (flagUpdate == "maximize") {
    bigDiv.appendChild(maximize);
  }

  else if (flagUpdate == "update") {
    bigDiv.appendChild(updateData);
  }
  else if (userCheck == null) {
    bigDiv.appendChild(signIn);

  }
  else {
    bigDiv.appendChild(logIn);


  }


  body.appendChild(bigDiv);
  body.style.overflow = 'hidden';

}

function signInSet() {
  let name = document.getElementById('signInUserName');
  let password = document.getElementById('password');
  let rePassword = document.getElementById('rePassword');
  if (password.value !== rePassword.value) {
    document.getElementById('signIn').style.boxShadow = '0 0 20px red';
    alert("Passwords are not matched");
    return;
  }
  else if (password.value.length < 4 || name.value.length < 3) { alert("password and name length should be greater then 3"); return; }
  else {
    let tmpo = [name.value, password.value];
    localStorage.setItem('userData', JSON.stringify(tmpo));
    document.getElementsByTagName('body')[0].removeChild(bigDiv);
    document.getElementsByTagName('body')[0].style.overflow = 'visible';

    //time
    const d = new Date();
    const time = d.getTime();
    localStorage.setItem('lastLogInTime', time);
  }

}

function logInSet() {
  let orgPassword = JSON.parse(localStorage.getItem('userData'))[1];
  if (orgPassword != document.getElementById('logInInput').value) {
    document.getElementById('logIn').style.boxShadow = '0 0 20px red';
    alert("Wrong Password !");
    return;
  } else {

    document.getElementsByTagName('body')[0].removeChild(bigDiv);
    document.getElementsByTagName('body')[0].style.overflow = 'visible';
    //time
    const d = new Date();
    const time = d.getTime();
    localStorage.setItem('lastLogInTime', time);
  }
}


function updateData() {

  // I just copied here from signIn area and changed name,password,rePassword
  let name = document.getElementById('updateName');
  let password = document.getElementById('updatePassword');
  let rePassword = document.getElementById('updateRePassword');
  if (password.value !== rePassword.value) {
    document.getElementById('updateData').style.boxShadow = '0 0 20px red';
    alert("Passwords are not matched");
    return;
  }
  else if (password.value.length < 4 || name.value.length < 3) { alert("password and name length should be greater then 3"); return; }
  else {
    let tmpo = [name.value, password.value];
    localStorage.setItem('userData', JSON.stringify(tmpo));
    document.getElementsByTagName('body')[0].removeChild(bigDiv);
    document.getElementsByTagName('body')[0].style.overflow = 'visible';


  }
}

function closeUpdate() {
  document.getElementsByTagName('body')[0].removeChild(bigDiv);
  document.getElementsByTagName('body')[0].style.overflow = 'visible';
}
// ------------------------------------------------ maximize suff------------------------------------------------
function maximzeOkOnClick(index) {
  // taking Items from local 
  let notesTitle = localStorage.getItem('notesTitle');
  let notes = localStorage.getItem('notes');
  let notesTitleArray;
  let notesArray;
  if (notes != null) {
    // convert it into a array
    notesTitleArray = JSON.parse(notesTitle);
    notesArray = JSON.parse(notes);

  }
  let tmp = document.getElementById(`pMax${index}`).innerText;
  let temp = document.getElementById(`tMax${index}`).innerText;
  if (tmp == null) { return; }
  notesTitleArray[index] = temp;
  notesArray[index] = tmp;
  localStorage.setItem('notesTitle', JSON.stringify(notesTitleArray));
  localStorage.setItem('notes', JSON.stringify(notesArray));
  showItems();
  closeUpdate();
}

//starUpdate bug fix
  function starFix(indexxx) {
   
    let starData=localStorage.getItem('star');
    if(starData!=null){
      
      let stardataArray=JSON.parse(starData);
      stardataArray.forEach(function(element,index){
        console.log(indexxx);
        console.log(element);
        if(element>indexxx){
          element=element-1;
         stardataArray[index]=`${element}`;

        }
      });
      localStorage.setItem('star',JSON.stringify(stardataArray));

    }
    
    
  }