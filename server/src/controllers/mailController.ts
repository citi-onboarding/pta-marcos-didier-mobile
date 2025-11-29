import { Request, Response } from "express";
import { sendMail } from "../utils/mailer";

class MailController {
  async send(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email é obrigatório" });
      }

      const subject = "Comprovante da consulta";
      const html = `
        <h1>Comprovante de Cadastro</h1>
        <p>Seu cadastro foi concluído com sucesso!</p>
      `;

      await sendMail(email, subject, html);

      return res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao enviar email" });
    }
  }
}

export default new MailController();
