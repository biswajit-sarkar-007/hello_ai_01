import { MailtrapClient } from "mailtrap";

const TOKEN = 'b7cbb375f34b78357c68dd87392221ac'
const SENDER_EMAIL='hell@demomailtrap.co'
const RECIPIENT_EMAIL='bs5245423@gmail.com'

if(!TOKEN){
    throw new Error('MAILTRAP_TOKEN enviornment variable is not set')
}

const client = new MailtrapClient({token: TOKEN})
const sender = {name: 'Mailtrap Test', email: SENDER_EMAIL}

client.send({
    from: sender,
    to: [{email: RECIPIENT_EMAIL}],
    subject:'Hello from mailtrap',
    text:'Welcome to Hello AI...'
}).then(console.log).catch(console.error);