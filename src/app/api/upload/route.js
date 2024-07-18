import { NextResponse } from 'next/server';
import pool from '@/app/libs/pool';

export async function POST(request) {
    try {
        const data = await request.json();

        // Validate the incoming data
        if (!Array.isArray(data) || data.length === 0) {
            return NextResponse.json({ error: "Invalid CSV data" }, { status: 400 });
        }

        const db = await pool.getConnection();

        // Prepare the query to insert data
        const insertProjectTopicQuery = 'INSERT INTO project_topic (past_topics_id, past_fyp_topics, past_fyp_year, sv_id) VALUES (?, ?, ?, ?)';

        for (const row of data) {
            // Skip processing rows that are empty or have missing values
            if (!row || row.length !== 4) {
                console.warn('Skipping invalid row:', row);
                continue;
            }

            const [pastTopicsId, pastFypTopics, pastFypYear, svId] = row.map(value => value !== undefined ? value : null);

            // Ensure pastTopicsId is not empty
            if (!pastTopicsId) {
                db.release();
                return NextResponse.json({ error: "past_topics_id must not be empty" }, { status: 400 });
            }

            // Perform other validations if needed

            await db.execute(insertProjectTopicQuery, [pastTopicsId, pastFypTopics, pastFypYear, svId]);
        }

        db.release();
        return NextResponse.json({ message: "CSV data uploaded successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
