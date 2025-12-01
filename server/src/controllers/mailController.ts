import { Request, Response } from "express";
import { sendMail } from "../utils/mailer";

class MailController {
  async send(req: Request, res: Response) {
    try {
      const { email } = req.body;

      console.log("📧 Mail request received for:", email);

      if (!email) {
        console.log("❌ Email field missing in request");
        return res.status(400).json({ error: "Email é obrigatório" });
      }

      const data_atual = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const subject = "Comprovante da consulta";
      const html = `
        <h1>Comprovante de Cadastro</h1>
        <p>Seu cadastro foi concluído com sucesso!</p>
        <p>Data: ${data_atual}</p>
      `;

      const result = await sendMail(email, subject, html);

      console.log("✅ Email sent successfully to:", email);
      return res.status(200).json({
        message: "Email enviado com sucesso!",
        messageId: result.messageId,
      });
    } catch (error) {
      console.error("❌ Error in mail controller:", error);
      return res.status(500).json({
        error: "Erro ao enviar email",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
export default new MailController();
