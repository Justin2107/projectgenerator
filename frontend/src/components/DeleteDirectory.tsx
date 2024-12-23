export const deleteDirectory = async (jobTitle: string) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/sharepoint/delete-directory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                job_title: jobTitle
            })
        });
        
        if (!response.ok) {
            console.error('Failed to delete directory during rollback');
        }
    } catch (error) {
        console.error('Error during directory deletion rollback:', error);
    }
}