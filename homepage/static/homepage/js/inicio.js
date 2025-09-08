// Definimos un arreglo de perfiles /parte de yamii
const perfiles = [
  {
    nombre: "Yazmina Fuentes",
    cargo: "Desarrolladora Frontend",
    area: "Tecnología",
    email: "yazmina@example.com",
    bio: "Me gusta Django, MongoDB y aprender paso a paso."
  },

  {
    nombre: "Rodrigo Albornoz",
    cargo: "Diseñador UI",
    area: "Producto",
    email: "rodrigo.albornoz@example.com",
    bio: "Diseños simples y accesibles. Minimalismo y usabilidad."
  }
];

// Obtenemos el contenedor donde irán las tarjetas
const grid = document.getElementById("grid");

// Recorremos cada perfil y creamos una tarjeta
perfiles.forEach(function(p) {
  // Creamos un elemento <article> para la tarjeta
  const card = document.createElement("article");
  card.className = "card"; // le damos la clase CSS

// Genera un slug a partir del nombre
  const slug = p.nombre.toLowerCase().replace(/\s+/g, '-');


  // Rellenamos el HTML interno de la tarjeta
  card.innerHTML = `
    <span class="area-pill">${p.area}</span>
    <h3>${p.nombre}</h3>
    <p class="cargo">${p.cargo}</p>
    <a class="email" href="mailto:${p.email}">${p.email}</a>
    <p class="bio">${p.bio}</p>
    <button class="btn saludar" type="button">Saludar</button>
    <button class="btn perfil" type="button">Ver Perfil</button>

  `;

  // Seleccionamos el botón dentro de la tarjeta
  const botonSaludar = card.querySelector(".saludar");

  // Agregamos un evento: cuando hagan clic, aparece un alert
  botonSaludar.addEventListener("click", function() {
    alert("Hola profe soy " + p.nombre + " 👋");
  });

 // Botón Ver Perfil
const botonPerfil = card.querySelector(".perfil");
botonPerfil.addEventListener("click", function() {
  if (p.nombre === "Yazmina Fuentes") {
    window.location.href = "/perfil2/";
  }
  if (p.nombre === "Rodrigo Albornoz") {
    window.location.href = "/perfil/";
  }  
});

  // Insertamos la tarjeta dentro del grid
  grid.appendChild(card);
});
