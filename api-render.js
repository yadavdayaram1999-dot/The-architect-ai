export default async function handler(req, res) {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    try {
        const { image, prompt } = req.body;
        const response = await fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                version: "435061a1b5a4a1e267de4b072c4907a73809cb5b7c07bc0a9e79be23cf30f9a2",
                input: { image: image, prompt: prompt, structure_strength: 1.0, guidance_scale: 7.5, num_inference_steps: 20 },
            }),
        });
        const prediction = await response.json();
        return res.status(200).json(prediction);
    } catch (error) { return res.status(500).json({ error: error.message }); }
}
