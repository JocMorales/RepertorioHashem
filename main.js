
//Variables globales

const songList = document.getElementById("songList");

const modalContainer = document.getElementById('modalContainer');

//Venta para abrir info de cada nota

 //Ventana emergente______________________________________________

  // Función para abrir el modal
  const openModal = () => {
      modalContainer.classList.remove('opacity-0', 'pointer-events-none');
      modalContainer.querySelector('div').classList.remove('translate-y-10');
  };


  // Función para cerrar el modal
  const closeModal = () => {
      modalContainer.classList.add('opacity-0', 'pointer-events-none');
      modalContainer.querySelector('div').classList.add('translate-y-10');
  };

  // Cerrar al hacer clic fuera del contenido
  modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
          closeModal();
      }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalContainer.classList.contains('opacity-0')) {
          closeModal();
      }
  });


 //Abrir modal

const abrirModal = (song) =>{

  modalContainer. innerHTML = "";
  const modal = document.createElement("div");
  modal.className = `bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[100vh] overflow-hidden transform translate-y-10 transition-all duration-300`
  modal.innerHTML = `
     <!-- Cabecera -->
    <div class="text-white cabecera-modal p-2 flex justify-between items-center">
        <h2 class="text-xl pl-3 text-modal font-bold">${song.cancion}</h2>
        <button id="closeModal" class="text-white pr-3 hover:text-gray-200 text-2xl">&times;</button>
    </div>
    
    <!-- Contenido -->
    <div id="contenido-modal" class="p-6 h-[calc(100%-56px)] overflow-y-auto">
      <div class="m-4">
        <p class="text-gray-600"><strong>Artista:</strong> ${song.artista}</p>
        <p class="text-gray-600"><strong>Álbum:</strong> ${song.album}</p>
        <p class="text-gray-600"><strong>Nota:</strong> ${song.nota}</p>
        <p class="text-gray-600"><strong>Tipo:</strong> ${song.tipo}</p>

        <div class="mt-4">

          <div class="mt-4 mb-4">
            <embed src="notes/${song.acordes}" type="application/pdf" width="100%" height="600px" />
          </div>

          <iframe style="mt-4 border-radius:12px" src="${song.spot}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          <a href="${song.link}" target="_blank" class="block m-5 custom-button inline-block">Buscar Notas</a>
        </div>
      </div> 
    </div>
  `;
    
  modalContainer.appendChild(modal);

  openModal();
  document.getElementById('closeModal').addEventListener('click', closeModal);
}

//____________________________________________________

// Función para renderizar las canciones
function renderSongs(filteredSongs) {
  
  songList.innerHTML = "";

  filteredSongs.forEach((song) => {
    
    const songCard = document.createElement("div");
    songCard.className = "song-card";
    songCard.innerHTML = `
    <div class="cursor-pointer w-full bg-white  p-2 flex items-center justify-between">
      <h3 class="block text-xl font-semibold text-gray-700">${song.cancion}</h3>
      <img src="img/barra-de-menus.png" alt="Barra de menu" class="w-6 h-auto">
    </div>
      `;

    //funcion para mostrar targeta de spotify
    songCard.addEventListener("click", () => {

      abrirModal(song);
    });
    
    songList.appendChild(songCard);
  });
}


// Función para filtrar las canciones
function filterSongs(songs) {

  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const selectedNote = document.getElementById("noteFilter").value;
  const selectedType = document.getElementById("typeFilter").value;

  const filteredSongs = songs.filter(
    (song) =>
      (song.cancion.toLowerCase().includes(searchTerm) ||
      song.artista.toLowerCase().includes(searchTerm)) &&
      (selectedNote === "" || song.nota === selectedNote) &&
      (selectedType === "" || song.tipo === selectedType)
  );

  if(filteredSongs.length > 0){

    renderSongs(filteredSongs);
  } else{

    songList.innerHTML = "";

    const songCard = document.createElement("div");
    songCard.className = "song-card";
    songCard.innerHTML = `
    <div class="cursor-pointer w-full bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
      <h1>Cancion no encontrada!</h1>
    </div>  
      `;

      songList.appendChild(songCard);
  }
}

// Cargar el archivo JSON y mostrar las canciones
fetch("data.json")
  .then((response) => response.json())
  .then((songs) => {
    // Mostrar todas las canciones al inicio
    renderSongs(songs);

    // Escuchar cambios en la barra de búsqueda y los filtros
    document.getElementById("searchInput").addEventListener("input", () => filterSongs(songs));
    document.getElementById("noteFilter").addEventListener("change", () => filterSongs(songs));
    document.getElementById("typeFilter").addEventListener("change", () => filterSongs(songs));
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });


// Ntn de Scroll
//_________________________________________________________________________
  const scrollToTopButton = document.getElementById("scrollToTopButton");

  // Mostrar u ocultar el botón según la posición del scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopButton.classList.remove("hidden");
    } else {
      scrollToTopButton.classList.add("hidden");
    }
  });

    // Función para hacer scroll al principio de la página
    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Scroll suave
      });
    });


  //Lista desplegable____________________________________________________
    function toggleDropdown(id) {
      const el = document.getElementById(id);
      el.classList.toggle('hidden');
    }

      //Activar y desactivar occiones de busqueda

    //Bnt de busqueda
    document.getElementById("btn-busqueda").addEventListener('click',()=>{

      toggleDropdown('notasDropdown');
    });

    //Btn de quitar menu de busqueda
    document.getElementById("btn-quitar-menu").addEventListener('click', ()=>{
      
      toggleDropdown('notasDropdown');
    });


    //loader___________________________________________________________

    window.addEventListener("load", () => {
      document.getElementById("loaderContainer").style.display = "none";
      // Mostrar el contenido de la página
      document.getElementById("content").style.display = "block";
    });


    //Ventana de menu_________________________________________________

    document.getElementById("btn-menu").addEventListener('click', ()=>{

      Swal.fire({
        title: "",
        cancelButtonText: "Cerrar",
        html: ` 
          <div clas="w-full flex items-center justify-center">
            <h2 class="block text-xl font-semibold text-gray-700 m-5">Compartir Pagina</h2>
            <img src="img/qr.png" alt="Compartir" class="inline w-50 h-auto">
          </div>
        `,
        showCancelButton: false,
        showCloseButton: true,
        showConfirmButton: false
      });
    });