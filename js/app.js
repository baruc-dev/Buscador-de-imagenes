

const formulario = document.querySelector('#formulario');
const inputBusqueda = document.querySelector('#termino');
const btnBuscar = document.querySelector('#btnBuscar');
const divResultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');
divResultado.classList.add('divflex');


let paginaActual = 1;
let paginasTotales;


window.onload = () =>
{
    formulario.addEventListener('submit', validarFormulario);
}


function validarFormulario(e)
{
    e.preventDefault();
    if(inputBusqueda.value === '')
    {
        alerta('Error en Término de Búsqueda');
    }
    else
    {
        buscar(inputBusqueda.value);
    }

}

function alerta(mensaje)
{
    limpiarHTML(divResultado);
    const parrafo = document.createElement('P');
    parrafo.textContent = mensaje;
    parrafo.classList.add('alertaroja')
    divResultado.appendChild(parrafo);

    setTimeout(() => {
        parrafo.remove();
    }, 3000);
}



function buscar(termino)
{
    const key = '';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&image_type=photo&per_page=50&page=${paginaActual}`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => 
        {
            inyectar(resultado.hits, resultado.total); 
            
        })
}


function inyectar(imagenes, total)
{
let arregloimg = [];
arregloimg = imagenes;
paginasTotales = calcularPaginador(total);
limpiarHTML(divResultado);
arregloimg.forEach(imagen => 
{




    const imgContenedor = document.createElement('div');
    const imgapi = document.createElement('img');
    const plikes = document.createElement('p');
    const enlace = document.createElement('a');

    imgContenedor.classList.add('divimg');
    imgapi.classList.add('imagenmini');
    imgapi.src = imagen.previewURL;
    plikes.textContent = `Likes: ${imagen.likes}`;
    enlace.classList.add('btnenlace');
    enlace.href = imagen.largeImageURL;
    enlace.textContent = 'Ver Imagen';

   
    imgContenedor.appendChild(imgapi);
    imgContenedor.appendChild(plikes);
    imgContenedor.appendChild(enlace);

    divResultado.appendChild(imgContenedor);
});

 imprimirPaginador();

}


function limpiarHTML(target)
{
    while(target.firstChild)
    {
        target.removeChild(target.firstChild);
        
    }
}


function calcularPaginador(total)
{
    return Math.ceil(total / 50);
    
}




function *paginador(totalpaginas)
{
    for(let i=0; i<= totalpaginas; i++)
    {
        yield i;
        
    }
}


function imprimirPaginador()
{
    let iterador;
    iterador = paginador(paginasTotales);
    console.log(iterador.next());
    limpiarHTML(paginacionDiv);
    while(true)
    {
        const {value, done} = iterador.next();
        if(done) return;

        const boton = document.createElement('a');
        boton.href = '#',
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-10', 'uppercase', 'rounded');
        paginacionDiv.appendChild(boton);

        boton.onclick = () =>
        {


            paginaActual = value;

            buscar(inputBusqueda.value);
        }


    }
}






