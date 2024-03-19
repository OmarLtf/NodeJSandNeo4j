class DataGenerator {
    constructor() {
        // These lists can be initialized here or passed as arguments to the generatePeople function
    }

    generateRandomAge() {
        return Math.floor(Math.random() * 7) + 22;
    }

    generatePeople(firstNames, lastNames) {
        if (!Array.isArray(firstNames) || !Array.isArray(lastNames)) {
            throw new Error("Both arguments must be arrays.");
        }

        const numPeople = Math.min(firstNames.length, lastNames.length);
        const people = [];

        for (let i = 0; i < numPeople; i++) {
            const firstName = firstNames[i];
            const lastName = lastNames[i];
            const age = this.generateRandomAge();
            people.push({ firstName, lastName, age });
        }

        return people;
    }

    // Add other data generation methods here

    generateSkills(skills) {
        if (!Array.isArray(skills)) {
            throw new Error("Argument must be array")
        }
        return skills.map(item => ({ skillName: item }))
    }
}

const firstNames = [
    "John", "Alice", "Bob", "Emily", "Michael", "Emma", "James", "Sophia", "William", "Olivia",
    "Daniel", "Mia", "David", "Ava", "Joseph", "Charlotte", "Matthew", "Amelia", "Andrew", "Ella",
    "Ryan", "Grace", "Christopher", "Sophie", "Nicholas", "Lily", "Jonathan", "Chloe", "Benjamin", "Isabella"
]
const lastNames = [
    "Smith", "Johnson", "Brown", "Taylor", "Martinez", "Wilson", "Clark", "Anderson", "Thomas", "Harris",
    "Lee", "Walker", "Perez", "Hall", "Young", "Allen", "Wright", "King", "Green", "Evans", "Diaz",
    "Davis", "Miller", "Moore", "Garcia", "Rodriguez", "Jones", "Williams", "Jackson", "White"
]

const skills = ["Java", "Javascript", "Python", "Project management", "Devops", "R", "Data science", "Solution architect"]
const markers = ["beginner", "apprentice", "junior", "intermediate", "advanced"]
const cities = [
    { cityName: 'Paris' },
    { cityName: 'Marseille' },
    { cityName: 'Lyon' },
    { cityName: 'Toulouse' },
    { cityName: 'Nice' },
    { cityName: 'Berlin' },
    { cityName: 'Hamburg' },
    { cityName: 'Munich' },
    { cityName: 'Frankfurt' },
    { cityName: 'Cologne' },
    { cityName: 'Toronto' },
    { cityName: 'Montreal' },
    { cityName: 'Vancouver' },
    { cityName: 'Calgary' },
    { cityName: 'Ottawa' }
]
const opportunities = [
    { opportunityName: 'Software Engineer' },
    { opportunityName: 'Web Developer' },
    { opportunityName: 'Data Scientist' },
    { opportunityName: 'Network Administrator' },
    { opportunityName: 'Cybersecurity Analyst' },
    { opportunityName: 'Cloud Engineer' },
    { opportunityName: 'UI/UX Designer' },
    { opportunityName: 'Database Administrator' },
    { opportunityName: 'IT Project Manager' },
    { opportunityName: 'Systems Analyst' }
]

const availabilities = [
    { availabilityName: "busy" },
    { availabilityName: "partial" },
    { availabilityName: "immediate" }
]

const employeeAttributes = [
    'First name',
    'Last name',
    'Age',
    'Availability'
]


module.exports = { DataGenerator, firstNames, lastNames, skills, markers, cities, opportunities, availabilities, employeeAttributes }