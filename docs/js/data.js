let takePhoto = document.getElementById('canvas');
    let dataPhoto = takePhoto.toDataURL();
    console.log(dataPhoto);
   
  
 

 

 

//DATOS INGRESADOS QUE SE GUARDAN EN TABLA
firebase.database().ref('visitas')
  .limitToLast(50) //filtro para no obtener todos los mensajes
  .once('value')
  .then((messages) => {
    console.log("Mensajes >" + JSON.stringify(visitas));
  })
  .catch(() => {

  });

firebase.database().ref('visitas')
  .limitToLast(50)
  .on('child_added', (newMessage) => {
    const time = new Date(newMessage.val().time);
    invitadosContainer.innerHTML = `
    <tr>
    <td>${newMessage.val().names}</td>
    <td>${newMessage.val().ruts}</td>
    <td>${newMessage.val().patentes} </td>
    <td>${time.getHours()}:${time.getMinutes()} del día ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}</td>
    <td><img src="${dataPhoto}" alt="algo" style="width:200px; height:auto;" ></td>
    </tr> 
          `+ invitadosContainer.innerHTML;
  });


// Firebase Database
// Guarda  ela info en database, llamada visitas
function sendMessage() {
  if (inputName.value.length === 0 || null && inputRut.value.length === 0 || null) {
    alert('Debes ingresar todos los datos solicitados')
  } else {

    const name = inputName.value;
    const rut = inputRut.value;
    const patente = inputPatente.value;
    
    //Para tener una nueva llave en la colección visitas
    const newMessageKey = firebase.database().ref().child('visitas').push().key;

    firebase.database().ref(`visitas/${newMessageKey}`).set({
      names: name,
      ruts: rut,
      patentes: patente,
      time: Date.now(),
      foto: dataPhoto
    });
    inputName.value = '';
    inputRut.value = '';
    inputPatente.value = '';
    alert('Datos ingresados correctamente, y notificación enviada con éxito');
  }
}


//FETCH 
//Llamando a local.json, donde se encuentran las personas pertenecientes al IF
let optionsMenu = document.getElementById('optionsContainer');
optionsMenu.length = 0;

let options = document.createElement('option');
options.text = '¿A quién visitas?';

optionsMenu.add(options);

optionsMenu.selectedIndex = '';

const dataJson = '../data/local.json';

fetch(dataJson)
  .then(
    function (response) {
      if (response.status !== 200) {
        console.error('Error: no se puede cargar la información' +
          response.status);
        return;
      }

      //Revisa la información con "response" 
      response.json().then(function (data) {
        let option;

        for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
          //option.classList.add('opcionVisita');
          option.text = `
          ${data[i].name} (${data[i].empresa})
          `;

          optionsMenu.add(option);


          // Tabla de datos de personas y con sus respectivas empresas
          empresasContainer.innerHTML = `
           <tr>
            <td>${data[i].name}</td>
            <td>${data[i].email}</td>
            <td>${data[i].empresa}</td>
            </tr> 
          `+ empresasContainer.innerHTML;
        }
      });
    }
  )
  .catch(function (err) {
    console.error('Fetch Error -', err);
  });





//imprime a quien se visita en la tabla
/*
const select = document.getElementById('optionsContainer');
select.addEventListener('change',
  function () {
    const selectOption = this.options[select.selectedIndex];
    document.getElementById('visitNN').innerHTML = `
<tr>
<td></td>
</tr> 
      `+ document.getElementById('visitNN').innerHTML
  }
); */ 