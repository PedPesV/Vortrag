const a4 = document.getElementById("a4");
const a3 = document.getElementById("a3");
const a2 = document.getElementById("a2");
const a1 = document.getElementById("a1");
const a0 = document.getElementById("a0");

const b4 = document.getElementById("b4");
const b3 = document.getElementById("b3");
const b2 = document.getElementById("b2");
const b1 = document.getElementById("b1");
const b0 = document.getElementById("b0");

const ledS4 = document.getElementById("led-s4");
const ledS3 = document.getElementById("led-s3");
const ledS2 = document.getElementById("led-s2");
const ledS1 = document.getElementById("led-s1");
const ledS0 = document.getElementById("led-s0");
const ledSC = document.getElementById("led-sc");

const btnListo = document.getElementById("btn-listo");
const btnReset = document.getElementById("btn-reset");
const mensaje = document.getElementById("mensaje-validacion");

const switches = [a4, a3, a2, a1, a0, b4, b3, b2, b1, b0];

function bit(checkbox) {
  return checkbox.checked ? 1 : 0;
}

function encenderLed(elemento, valor) {
  elemento.textContent = valor;
  if (valor === 1) {
    elemento.classList.add("activo");
  } else {
    elemento.classList.remove("activo");
  }
}

function calcularSuma() {
  const A0 = bit(a0);
  const A1 = bit(a1);
  const A2 = bit(a2);
  const A3 = bit(a3);
  const A4 = bit(a4);

  const B0 = bit(b0);
  const B1 = bit(b1);
  const B2 = bit(b2);
  const B3 = bit(b3);
  const B4 = bit(b4);

  const S0 = A0 ^ B0;
  const C0 = A0 & B0;

  const S1 = A1 ^ B1 ^ C0;
  const C1 = (A1 & B1) | (A1 & C0) | (B1 & C0);

  const S2 = A2 ^ B2 ^ C1;
  const C2 = (A2 & B2) | (A2 & C1) | (B2 & C1);

  const S3 = A3 ^ B3 ^ C2;
  const C3 = (A3 & B3) | (A3 & C2) | (B3 & C2);

  const S4 = A4 ^ B4 ^ C3;
  const C4 = (A4 & B4) | (A4 & C3) | (B4 & C3);

  encenderLed(ledS4, S4);
  encenderLed(ledS3, S3);
  encenderLed(ledS2, S2);
  encenderLed(ledS1, S1);
  encenderLed(ledS0, S0);
  encenderLed(ledSC, C4);

  mensaje.textContent = "Suma realizada correctamente";
  mensaje.classList.remove("error");
  mensaje.classList.add("exito");

  switches.forEach(function (sw) {
    sw.disabled = true;
  });

  btnListo.disabled = true;
}

function resetearSimulador() {
  switches.forEach(function (sw) {
    sw.checked = false;
    sw.disabled = false;
  });

  encenderLed(ledS4, 0);
  encenderLed(ledS3, 0);
  encenderLed(ledS2, 0);
  encenderLed(ledS1, 0);
  encenderLed(ledS0, 0);
  encenderLed(ledSC, 0);

  mensaje.textContent = "";
  mensaje.classList.remove("exito");
  mensaje.classList.remove("error");

  btnListo.disabled = false;
}

btnListo.addEventListener("click", calcularSuma);
btnReset.addEventListener("click", resetearSimulador);

resetearSimulador();