import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database"

const app = express();

app.use(express.json());

app.use(router);

// Middleware para tratar erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof Error) { //verifica se err é uma instancia de Error
    return response.status(400).json({
      error: err.message
    })
  } 

  return response.status(500).json({ //Se não for nenhum outro erro mostra error 500
    status: "error",
    message: "Internal Server Error"
  })
});

app.listen(3000, () => console.log("Server is running"));