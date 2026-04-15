const entradasF = document.querySelectorAll('.entrada-f');
const switchD = document.getElementById('switch-d');
const switchC = document.getElementById('switch-c');
const switchB = document.getElementById('switch-b');
const switchA = document.getElementById('switch-a');
const led = document.getElementById('led');

const btnListo = document.getElementById('btn-listo');
const btnReset = document.getElementById('btn-reset');
const mensaje = document.getElementById('mensaje-validacion');

let tablaValida = false;

function obtenerIndiceActual() {
  const d = switchD.checked ? '1' : '0';
  const c = switchC.checked ? '1' : '0';
  const b = switchB.checked ? '1' : '0';
  const a = switchA.checked ? '1' : '0';
  return parseInt(d + c + b + a, 2);
}

function actualizarLed() {
  if (!tablaValida) return;

  const indice = obtenerIndiceActual();
  const valor = entradasF[indice].value;

  if (valor === '1') {
    led.textContent = '1';
    led.classList.add('led-on');
    led.classList.remove('led-off');
  } else {
    led.textContent = '0';
    led.classList.add('led-off');
    led.classList.remove('led-on');
  }
}

entradasF.forEach(input => {
  input.addEventListener('input', () => {
    if (input.value !== '0' && input.value !== '1') {
      input.value = '';
    }
  });
});

btnListo.addEventListener('click', () => {
  let completo = true;

  entradasF.forEach(input => {
    if (input.value !== '0' && input.value !== '1') {
      completo = false;
    }
  });

  if (!completo) {
    mensaje.textContent = 'Debes llenar todos los campos con 0 o 1';
    mensaje.style.color = 'red';
    tablaValida = false;
    return;
  }

  entradasF.forEach(input => {
    input.disabled = true;
  });

  mensaje.textContent = 'Tabla cargada correctamente';
  mensaje.style.color = 'lime';
  tablaValida = true;

  actualizarLed();
});

btnReset.addEventListener('click', () => {
  entradasF.forEach(input => {
    input.disabled = false;
    input.value = '';
  });

  switchD.checked = false;
  switchC.checked = false;
  switchB.checked = false;
  switchA.checked = false;

  tablaValida = false;
  mensaje.textContent = '';
  led.textContent = '0';
  led.classList.add('led-off');
  led.classList.remove('led-on');
});

switchD.addEventListener('change', actualizarLed);
switchC.addEventListener('change', actualizarLed);
switchB.addEventListener('change', actualizarLed);
switchA.addEventListener('change', actualizarLed);

led.classList.add('led-off');