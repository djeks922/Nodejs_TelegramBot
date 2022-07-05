

export const startText = (ctx) =>  `Hello, ${ctx.message.from.first_name}
I will help you to create <b>proposals</b> or register as <b>Influencer</b>

You can use below commands:

/add - To create application(proposal) for your project
/register - Register as Influencer
/myproposals - Review applied proposals`

export const helpText = (ctx) =>  `You can use this bot to create proposals for spesific token(project) 
and promote it with several <b>Crypto Influencers</b>

If you have enough influence in this field, you can <b>Apply</b> as Influencer and receive <b>proposals</b>

Commands: 

/add - To create application(proposal) for your project
/register - Register as Influencer
/myproposals - Review applied proposals`