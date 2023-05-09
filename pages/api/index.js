// Use one index file for everything, different behavior based on contents of request

import {createClient} from "@supabase/supabase-js"

export default async function request(req, res) {
    // URL unique to the project
    const supabaseUrl = 'https://tafciqdyjkccyqjyypts.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    
    if(req.method === "GET") {
        // Fetch all rows and columns
        let {data, error } = await supabase.from("gratitudes").select("*");
        res.status(200).json(data);
    } else if(req.method === "POST") {
        // Retrieve gratitude entry from request body and insert as new row in db
        const body = req.body;
        console.log("BODY", body);
        
        const {data, error} = await supabase.from("gratitudes")
            .insert([
                {text: body.gratitude}
            ])
        res.status(200).json(data);
    } else if(req.method === "DELETE") {
        // Delete ALL the things
        // Filter by selecting all rows where ID is NOT 0 (since IDs start at 1)
        const { data, error } = await supabase.from("gratitudes")
            .delete().neq("id", 0);
        res.status(200).json(data);
    }
}