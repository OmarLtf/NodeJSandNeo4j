import fetch from 'node-fetch';

async function callApi(endpoint) {
    const url = `http://localhost:3000/${endpoint}`; // Replace 'localhost:3000' with your API base URL
    try {
        const response = await fetch(url);
        if (response.ok) {
            console.log(`API '${endpoint}' successfully called.`);
            return await response.json();
        } else {
            console.log(`Failed to call API '${endpoint}'. Status code: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error(`Error calling API '${endpoint}':`, error);
        return null;
    }
}

async function runApis() {
    const endpoints = [
        "delete/all",
        "create/employees",
        "create/skills",
        "create/cities",
        "create/opportunities", 
        "create/availabilities",
        "relations/skill_employee",
        "relations/city_opportunity",
        "relations/opportunity_skill",
        "relations/employee_city",
        "relations/employee_availability"
    ];

    for (const endpoint of endpoints) {
        await callApi(endpoint);
    }
}

runApis();
