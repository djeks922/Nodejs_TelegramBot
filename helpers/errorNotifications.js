export const typeMsgErrNotification = (err,msg) => {
    const from = msg.from 
    const chat = msg.chat 

    return `${JSON.stringify(err, Object.keys(err))}
Message - ${err.message}
Stack - ${err.stack}

[Message ERROR]
ID: ${msg.id}
From: 
    id: ${from.id}
    isBot: ${from.is_bot}
    first_name: ${from.first_name}
    username: ${from.username}
Chat: 
    id: ${chat.id}`
}
export const typeCallbackNotification = (err,cb) => {
    const from = cb.from
    const msg = cb.message
    
    return `${JSON.stringify(err,Object.keys(err))}
Message - ${err.message}
Stack - ${err.stack}

[CallBackQuery ERROR]
ID: ${cb.id}
Data: ${cb.data}
From: 
    id: ${from.id}
    isBot: ${from.is_bot}
    first_name: ${from.first_name}
    username: ${from.username}
Message:
    id: ${msg.message_id}
    From: 
        isBot: ${msg.from.is_bot}
        id: ${msg.from.id}
        first_name: ${msg.from.first_name}
        username: ${msg.from.username}
    Chat: 
        id: ${msg.chat.id}
    Text:
${msg.text}    
Timestamp: ${Date(msg.date)}`    
}