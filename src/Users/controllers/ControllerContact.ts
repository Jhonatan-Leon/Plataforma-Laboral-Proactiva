import { Request, Response } from "express";
import { MailService } from "../../Services/Emails";

const supportPLP = async (req: Request, res: Response) => {
	try{
		const {name, email, commet} = req.body;

		await MailService.sendContactFormEmail(email, name, commet);
		res.status(200).json({msg: 'Mensaje enviado'});
		return;
	}catch(err) {
		console.log(err);
		res.status(500).json({msg: 'No se pudo enviar el mensaje'})
		return;
	}
}

export default supportPLP;