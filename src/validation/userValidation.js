const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email.trim());
}

function badRequest(message) {
  const e = new Error(message);
  e.status = 400;
  return e;
}

export function validateCreateBody(body) {
  const { nombre, email, edad, activo } = body ?? {};
  if (nombre === undefined || nombre === null || String(nombre).trim() === "") {
    throw badRequest("El nombre es obligatorio");
  }
  if (!validateEmail(email)) {
    throw badRequest("El email debe ser válido");
  }
  const n = Number(edad);
  if (!Number.isFinite(n) || n <= 0) {
    throw badRequest("La edad debe ser un número mayor a 0");
  }
  if (typeof activo !== "boolean") {
    throw badRequest("El campo activo debe ser booleano");
  }
  return {
    nombre: String(nombre).trim(),
    email: String(email).trim().toLowerCase(),
    edad: n,
    activo,
  };
}

export function validateUpdateBody(body) {
  const patch = {};
  const { nombre, email, edad, activo } = body ?? {};

  if (nombre !== undefined) {
    if (nombre === null || String(nombre).trim() === "") {
      throw badRequest("El nombre no puede estar vacío");
    }
    patch.nombre = String(nombre).trim();
  }
  if (email !== undefined) {
    if (!validateEmail(email)) {
      throw badRequest("El email debe ser válido");
    }
    patch.email = String(email).trim().toLowerCase();
  }
  if (edad !== undefined) {
    const n = Number(edad);
    if (!Number.isFinite(n) || n <= 0) {
      throw badRequest("La edad debe ser un número mayor a 0");
    }
    patch.edad = n;
  }
  if (activo !== undefined) {
    if (typeof activo !== "boolean") {
      throw badRequest("El campo activo debe ser booleano");
    }
    patch.activo = activo;
  }

  if (Object.keys(patch).length === 0) {
    throw badRequest("No hay campos válidos para actualizar");
  }
  return patch;
}
