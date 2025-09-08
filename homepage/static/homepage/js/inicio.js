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
    nombre: "Diego Cea",
    cargo: "QA / Tester",
    area: "Calidad",
    email: "diego.cea@example.com",
    bio: "Pruebas manuales y automatizadas. Aprendiendo Selenium."
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

  // Rellenamos el HTML interno de la tarjeta
  card.innerHTML = `
    <span class="area-pill">${p.area}</span>
    <h3>${p.nombre}</h3>
    <p class="cargo">${p.cargo}</p>
    <a class="email" href="mailto:${p.email}">${p.email}</a>
    <p class="bio">${p.bio}</p>
    <button class="btn" type="button">Saludar</button>
  `;

  // Seleccionamos el botón dentro de la tarjeta
  const boton = card.querySelector(".btn");

  // Agregamos un evento: cuando hagan clic, aparece un alert
  boton.addEventListener("click", function() {
    alert("Hola profe soy " + p.nombre + " 👋");
  });

  // Insertamos la tarjeta dentro del grid
  grid.appendChild(card);
});
