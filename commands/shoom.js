let shoomOCount = 2;

module.exports = {
    name: "shoom",
    description: "SHOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM",
    aliases: ['jojo'],
    execute(message, args) {

        if (args[0] == 'reset')
        {
            message.channel.send(`DeSHOOMing complete.\nPrevious O Amount: ${shoomOCount}`);
            shoomOCount = 1;
            return;
        }

        //Redo this to be dynamic shoom at some point
        shoomOCount += 1;
        let shoomBeginning = "**SH";
        for (i = shoomOCount; i > 0; i--)
		{
			shoomBeginning += "O";
        }
        
        shoomBeginning += "M**";
        shoomBeginning += `\nO Amount: ${shoomOCount}`
        
        message.channel.send(shoomBeginning, { split: true });
    }
}