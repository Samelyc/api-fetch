const usersContainer = document.getElementById("users");
const spinner = document.getElementById("spinner");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageInfo = document.getElementById("page-info");
const loadUsersButton = document.getElementById("load-users");
const usersTable = document.getElementById("users-table");

let currentPage = 1;
const totalPages = 2;



async function showSpinner() {
  spinner.classList.remove(`hidden`);
  await new Promise(resolve => setTimeout(resolve, 3000)); 
}

function hideSpinner() {
  spinner.classList.add(`hidden`);
}


// Función para mostrar los datos de los usuarios en la tabla
function displayUsers(users) {
  usersContainer.innerHTML = ""; // Limpiar contenido previo
  
  users.forEach(user => {
    const userRow = `
      <tr>
        <td>${user.id}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td><img src="${user.avatar}" alt="${user.first_name}" width="50" height="50"></td>
      </tr>`;
    usersContainer.innerHTML += userRow; 
  });
}



// Función para cargar los datos de la página seleccionada
async function loadUsers(page) {
  await showSpinner(); 
  try {
    const response = await fetch(`https://reqres.in/api/users?delay=1&page=${page}`);
    const data = await response.json();
    displayUsers(data.data);
    pageInfo.textContent = `Página ${page}`;
    usersTable.classList.remove("hidden"); // Mostrar la tabla de usuarios
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  } finally {
    hideSpinner();
  }
}



loadUsersButton.addEventListener("click", () => {
  loadUsers(currentPage);
  loadUsersButton.classList.add("hidden"); 
});

// Botón para ir a la página anterior
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadUsers(currentPage);
    nextButton.disabled = false;
  }
  if (currentPage === 1) {
    prevButton.disabled = true;
  }
});

// Botón para ir a la siguiente página
nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadUsers(currentPage);
    prevButton.disabled = false;
  }
  if (currentPage === totalPages) {
    nextButton.disabled = true;
  }
});

// Inicializar la primera carga en la primera página (opcional)
loadUsers(currentPage);
