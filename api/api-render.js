export default async function handler(req, res) {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    try {
        const { image, prompt } = req.body;
        
        // Base64 इमेज का फालतू हिस्सा साफ़ करना
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        
        // हगिंग फेस का सुपरफ़ास्ट और हल्का मॉडल (यह तुरंत रिस्पांस देगा)
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: prompt, // यह आपके प्रॉम्प्ट के आधार पर शानदार 3D रेंडर बनाएगा
                }),
            }
        );

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Hugging Face Server Error");
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const outputBase64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;

        return res.status(200).json({ status: "succeeded", output: [outputBase64] });
    } catch (error) { 
        return res.status(500).json({ error: error.message }); 
    }
}
