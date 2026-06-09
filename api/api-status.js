export default async function handler(req, res) {
    const { id } = req.query;
    if (!id) { return res.status(400).json({ error: 'Prediction ID is required' }); }
    try {
        const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
            headers: {
                "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        
        // अगर रीप्लिकेट से कोई एरर संदेश आ रहा है तो उसे फ्रंटएंड को भेजें
        if (data.error || data.detail) {
            return res.status(200).json({ status: "failed", error: data.error || data.detail });
        }
        
        return res.status(200).json(data);
    } catch (error) { 
        return res.status(500).json({ error: error.message }); 
    }
}
