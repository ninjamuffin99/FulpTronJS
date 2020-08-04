module.exports = {
    name: 'mmscores',
    description: "Checks the top 20 scores of Monster Mashing!",
    execute(message, args) {
        let {MMappID} = require('../index.js');
        const request = require('request');
        const Discord = require('discord.js');

        var inputData = {
			"app_id": MMappID,
			"debug": false,
			"call": {
				"component": "ScoreBoard.getScores",
				"parameters": 
				{
					"id": 8004,
					"limit": 20,
					"period": "A"
				},
			}
		};
	
		request.post(
			'https://www.newgrounds.io/gateway_v3.php',
			{ form: {input: JSON.stringify(inputData)} },
            function (error, response, body) 
            {
				console.log("RESPONSE")
				let parsedResp = JSON.parse(response.body);
				console.log(parsedResp);
				
				let scorePos = 0;

				let embed = new Discord.MessageEmbed()
				.setURL(`https://www.newgrounds.com/portal/view/707498`)
				.setTitle(`Monster Mashing Hall Of Shame`, )
				.setTimestamp()
				.setColor(0xF30DFF)
				.setThumbnail("https://i.imgur.com/PMJb6SI.png");

				let field1 = [];
				let field2 = [];

				let listOfPeople = parsedResp.result.data.scores.map(s => {
					scorePos += 1;
					if (scorePos <= 10)
					{
						field1.push(`${scorePos}. [${s.user.name}](https://${s.user.name}.newgrounds.com) --- ${s.formatted_value}`);
					}
					else
						field2.push(`${scorePos}. [${s.user.name}](https://${s.user.name}.newgrounds.com) --- ${s.formatted_value}`);

					return `${scorePos}. [${s.user.name}](https://${s.user.name}.newgrounds.com) --- ${s.formatted_value}`;
				});

				console.log(listOfPeople.length);

				embed.addField("Distance", field1);
				embed.addField(" - ", field2);

                message.channel.send({embed});
            });
    }            
}