interface GoNoGoReport {
    project_name: string;
    project_address: string;
    job_type: string;
}

interface GoNoGoResponseData {
    project_name: string;
    project_address: string;
    job_type: string;
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export const create_go_no_go = async (reportData: GoNoGoReport, project_title: string): Promise<ApiResponse<GoNoGoResponseData>> => {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/reports/create-go-no-go-report/?project_title=${encodeURIComponent(project_title)}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reportData)
            }
        );

        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                data
            };
        }

        const errorData = await response.json().catch(() => null);
        return {
            success: false,
            error: errorData || 'Failed to create report'
        };

    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred'
        };
    }
}

export const delete_go_no_go = async (reportName: string): Promise<ApiResponse<GoNoGoResponseData>> => {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/reports/delete-go-no-go-report/?name=${encodeURIComponent(reportName)}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                message: data.message
            };
        }

        const errorData = await response.json().catch(() => null);
        return {
            success: false,
            error: errorData || 'Failed to delete report'
        };

    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred'
        };
    }
}