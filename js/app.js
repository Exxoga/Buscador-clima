const container = document.querySelector('.container');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

window.addEventListener('load', () => {

  formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  limpiarHTML();

  if (ciudad === '' || pais === '') {
    mostrarAlerta('Ambos campos son obligatorios');
    const documento = document.querySelector('.background');
    documento.classList.remove('argentina', 'colombia', 'costa', 'españa', 'usa', 'mexico', 'peru', 'todos')
    return;
  }

  consultarAPI(ciudad, pais);
  formulario.reset();
}

function mostrarAlerta(mensaje) {

  const alerta = document.querySelector('.alerta');
  if (!alerta) {
    const alerta = document.createElement('div');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');
    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
  `;
    container.appendChild(alerta);
    setTimeout(() => {
      alerta.remove()
    }, 1500);
  }
};

function consultarAPI(ciudad, pais) {

  const appId = '0a056beda458df541d8737f46fba05a0';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  Spinner()
  setTimeout(() => {
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(datos => {
        if (datos.cod === '404') {
          mostrarAlerta('Ciudad no encontrada');
          return;
        }

        mostrarClima(datos);
        cambiarFondo(pais);
      })
  }, 1000);
};

function mostrarClima(datos) {
  const { name, main: { temp, temp_max, temp_min } } = datos;

  const centigrados = kelvinAGrados(temp);
  const max = kelvinAGrados(temp_max);
  const min = kelvinAGrados(temp_min);

  const ciudadClima = document.createElement('p');
  ciudadClima.textContent = `Clima en ${name}`
  ciudadClima.classList.add('font-bold', 'text-2xl');

  const actual = document.createElement('p');
  actual.classList.add('font-bold', 'text-6xl');
  actual.innerHTML = `${centigrados} &#8451`;

  const tempMaxima = document.createElement('p')
  tempMaxima.classList.add('text-xl');
  tempMaxima.innerHTML = `Max: ${max} &#8451`;

  const tempMinima = document.createElement('p')
  tempMinima.classList.add('text-xl');
  tempMinima.innerHTML = `Min: ${min} &#8451`;

  const resultadoDiv = document.createElement('div')
  resultadoDiv.classList.add('text-center', 'text-white')
  resultadoDiv.appendChild(ciudadClima);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv)
};

const kelvinAGrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);
  setTimeout(() => {
    divSpinner.remove();
  }, 1000);
}

function cambiarFondo(pais) {
  const documento = document.querySelector('.background')
  documento.classList.add('todos');

  switch (pais) {
    case 'AR':
      documento.classList.remove('colombia', 'costa', 'españa', 'usa', 'mexico', 'peru')
      documento.classList.add('argentina');
      break;
    case 'CO':
      documento.classList.remove('argentina', 'costa', 'españa', 'usa', 'mexico', 'peru')
      documento.classList.add('colombia')
      break;
    case 'CR':
      documento.classList.remove('argentina', 'colombia', 'españa', 'usa', 'mexico', 'peru')
      documento.classList.add('costa')
      break;
    case 'ES':
      documento.classList.remove('argentina', 'colombia', 'costa', 'usa', 'mexico', 'peru')
      documento.classList.add('españa');
      break;
    case 'US':
      documento.classList.remove('argentina', 'colombia', 'costa', 'españa', 'mexico', 'peru')
      documento.classList.add('usa');
      break;
    case 'MX':
      documento.classList.remove('argentina', 'colombia', 'costa', 'españa', 'usa', 'peru')
      documento.classList.add('mexico');
      break;
    case 'PE':
      documento.classList.remove('argentina', 'colombia', 'costa', 'españa', 'usa', 'mexico')
      documento.classList.add('peru');
    default:
      documento.className.remove = 'argentina colombia costa españa usa mexico peru'
      break;
  }


}