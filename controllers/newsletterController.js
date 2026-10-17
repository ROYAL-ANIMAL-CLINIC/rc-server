import Newsletter from "../models/Newsletter.js";

// Subscribe to newsletter
export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({ success: false, message: 'Email is required' });
        }

        // Check if email already exists
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.json({ success: false, message: 'Email already subscribed' });
        }

        // Create new subscriber
        const subscriber = new Newsletter({ email });
        await subscriber.save();

        res.json({ success: true, message: 'Successfully subscribed to newsletter' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};