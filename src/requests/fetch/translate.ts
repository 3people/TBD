import OpenAI from "openai";
import {config} from "../../config/api-key";

const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY,
});

// export const translate = async () => {
//     const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//             { role: "system", content: "You are a helpful assistant." },
//             {
//                 role: "user",
//                 content: "Write a haiku about recursion in programming.",
//             },
//         ],
//     })
//
//     console.log(completion.choices[0].message);
// }

export const translate = async () => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Write a haiku about recursion in programming."}
            ]
        })
    })

    return response.json()
}
