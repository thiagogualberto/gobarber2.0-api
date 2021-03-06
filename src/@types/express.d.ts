// Sobreescrever uma tipagem de dentro do express
declare namespace Express {
  // Acrescenta os elementos abaixo dentro do Request do express
  export interface Request {
    user: {
      id: string;
    };
  }
}
