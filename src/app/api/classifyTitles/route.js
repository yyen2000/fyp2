import { NextResponse } from 'next/server';
import pool from '@/app/libs/pool';

const { classifyTitles } = require('../../classificationScript');

export async function POST(request) {
    let db;
    try {
        db = await pool.getConnection();
        
        const fetchTitlesQuery = `
            SELECT p.past_fyp_topics AS title, p.past_fyp_year AS year, s.sv_fullname AS supervisorName, s.sv_link AS supervisorLink
            FROM project_topic p
            JOIN supervisor s ON p.sv_id = s.sv_id
            WHERE p.past_fyp_year BETWEEN 2019 AND 2023;
        `;

        const [rows] = await db.execute(fetchTitlesQuery);
        db.release();

        const { userInterests } = await request.json();
        const titles = rows.map(row => row.title);

        const classificationResults = await classifyTitles(titles, userInterests);

        const resultsWithSupervisor = classificationResults.map(result => {
            const originalRow = rows.find(row => row.title === result.title);
            return {
                ...result,
                supervisorName: originalRow.supervisorName,
                supervisorLink: originalRow.supervisorLink
            };
        });

        return NextResponse.json({ results: resultsWithSupervisor });
    } catch (error) {
        if (db) db.release();
        return NextResponse.json({ error: 'Error classifying titles' }, { status: 500 });
    }
}
