import { Router } from "express";
import * as store from "../store/userStore.js";
import {
  validateCreateBody,
  validateUpdateBody,
} from "../validation/userValidation.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await store.findAll();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      const err = new Error("ID inválido");
      err.status = 400;
      throw err;
    }
    const user = await store.findById(id);
    if (!user) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      throw err;
    }
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = validateCreateBody(req.body);
    const created = await store.create(data);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      const err = new Error("ID inválido");
      err.status = 400;
      throw err;
    }
    const existing = await store.findById(id);
    if (!existing) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      throw err;
    }
    const patch = validateUpdateBody(req.body);
    const updated = await store.update(id, patch);
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      const err = new Error("ID inválido");
      err.status = 400;
      throw err;
    }
    const ok = await store.remove(id);
    if (!ok) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (e) {
    next(e);
  }
});

export default router;
