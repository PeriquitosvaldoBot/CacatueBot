require("dotenv").config();

const express = require("express");
const Discord = require("discord.js");
const colors = require("colors");
const config = require("./config.json");

const client = new Discord.Client();
const app = express();
const port = process.env.PORT || 8081;

app.get("/", (request, response) => {
	response.status(200).json({
		message: "Cacatué está Online!"
	});
});

client.on("ready", () => {
	client.user.setPresence({
		activity: {
			name: "💸 • Pagamentos em Dia!", 
			type: "PLAYING"
		}
	});

	console.log(colors.green(`[APP] - A Aplicação ${client.user.tag} foi iniciada com Sucesso!`))
});

client.on("message", message => {
	if (message.channel.type == "dm") return;

	const channel = message.guild.channels.cache.get(config.channel);
	if (message.channel.id != channel.id) { 
		return;
	} else {
		message.react(config.emoji).then(() => {
			console.log(colors.magenta(`[REACTION] - Adicionado uma nova Reação foi adicionada na notificação de Pagamento!`));
		});

		if (message.mentions.members.first()) {
			const member = message.mentions.members.first();

			const role = message.guild.roles.cache.get(config.role);
			member.roles.add(role).then(() => {
				console.log(colors.blue(`[ROLE] - Foi adicionado o cargo de Doador ao usuário ${member.user.tag} com Sucesso!`));
			});
		};
	};
});

app.listen(port, () => {
	return console.log(colors.yellow(`[SERVER] - Servidor Iniciado com Sucesso na Porta ${port}!`));
});

client.login(process.env.TOKEN);
