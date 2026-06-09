export default async function handler(req, res) {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    try {
        const { image, prompt } = req.body;
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        
        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-Kontext-dev",
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: base64Data,
                    parameters: { prompt: prompt }
                }),
            }
        );

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const outputBase64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;

        return res.status(200).json({ status: "succeeded", output: [outputBase64] });
    } catch (error) { 
        return res.status(500).json({ error: error.message }); 
    }
}
