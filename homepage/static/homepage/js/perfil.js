function MostrarAlerta() {
    alert("¡Hola! Has hecho clic en el botón.");
}


function Expandir(idElemento) /*Debe usarse en un solo elemnto, ya que requiere tamaño minimo y maximo especificos*/
{
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        if (elemento.style.maxHeight === "42px") {
            elemento.style.maxHeight = "500px";
            elemento.style.transition = "max-height 0.5s ease-in-out";
        } else {
            elemento.style.maxHeight = "42px";
        }
    }
}

function IrArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    /* top indica la posición vertical a la que quieres mover la página | behavior: 'smooth' indica que el desplazamiento será suave, no instantáneo*/
}