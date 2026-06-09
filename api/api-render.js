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
                version: "2b017d3b90290375f4c32b30e4b857ba02db7242ba4e130985de26bfaaa60913",
                input: {
                    image: image,
                    prompt: prompt,
                    structure_strength: 1.0,
                    guidance_scale: 7.5,
                    num_inference_steps: 20
                },
            }),
        });
        const prediction = await response.json();
        return res.status(200).json(prediction);
    } catch (error) { return res.status(500).json({ error: error.message }); }
}
