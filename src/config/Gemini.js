 const runChat= async (prompt) => {
        let API_KEY =import.meta.env.VITE_API_KEY;
        let  API_URL=import.meta.env.VITE_API_URL;
        let url=`${API_URL}?key=${API_KEY}`
        console.log(url);
        const payload = {
            contents: [
                {
                    parts: [
                        {
                            text:prompt,
                        }
                    ]
                }
            ]
        }
        let Response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        let jsonRes = await Response.json();
         return jsonRes.candidates[0].content.parts[0].text;
    }

    export default runChat;
