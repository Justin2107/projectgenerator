'use server'

import { Pool } from 'pg'

const pool = new Pool({
    connectionString: "postgresql://postgres:password@db:5432/projectmanagerdb",
})

export interface Projects{
    number: number,
    name: string,
    type: string,
    stage: string,
    ims_status: boolean,
    swms_status: boolean,
    report_ids: JSON,
    year: number
}

export async function addProject(project: Projects){
    const client = await pool.connect()
    try{
        await client.query('BEGIN')
        const insertProjectQuery = `
            INSERT INTO projects ("number", "name", "type", "stage", "ims_status", "swms_status", "report_ids", "year")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `
        const insertProjectValues = [project.number, project.name, project.type, project.stage, project.ims_status, project.swms_status, project.report_ids, project.year]
        await client.query(insertProjectQuery, insertProjectValues)
        await client.query('COMMIT')
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new Error(`Failed to add project: ${isError(error) ? error.message : String(error)}`)
    }
}

// export async function removeProject(project: Projects, number: number){
//     const client = await pool.connect()
//     try{
//         await client.query('BEGIN')
//         const removeProjectQuery = `
//             DELETE FROM projects
//             WHERE number = $1
//         `
//         // await client.query(removeProjectQuery, number)
//     } catch (error) {
//         await client.query('ROLLBACK');
//         throw new Error(`Failed to remove project: ${isError(error) ? error.message : String(error)}`)
//     }
// }

export async function updateCounter(): Promise<string> {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const findCurrentCountQuery = `
            SELECT number FROM projects
            ORDER BY number DESC
            LIMIT 1
        `
        const result = await client.query(findCurrentCountQuery)
        await client.query('COMMIT')
        
        // If no results, start with 1
        const currentNumber = result.rows.length > 0 ? result.rows[0].number : 0
        const newNumber = currentNumber + 1
        return newNumber.toString().padStart(3, '0')
    } catch (error) {
        await client.query('ROLLBACK')
        throw new Error(`Failed to increment project numbering: ${isError(error) ? error.message : String(error)}`)
    }
    finally {
        client.release()
    }
}

function isError(error: unknown): error is Error {
    return error instanceof Error;
  }