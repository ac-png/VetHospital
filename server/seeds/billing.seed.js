const { faker } = require('@faker-js/faker');
const Billing = require('../models/billing.model');
const Patient = require('../models/patient.model');
const Appointment = require('../models/appointment.model');

const seedBilling = async (num) => {
    const patients = await Patient.find();
    const appointments = await Appointment.find();
    
    if (patients.length === 0) {
        console.error('No patients found to associate with billings.');
        return;
    }

    const billings = [];
    for (let i = 0; i < num; i++) {
        const patient = patients[Math.floor(Math.random() * patients.length)];
        const appointment = appointments[Math.floor(Math.random() * appointments.length)];

        billings.push({
            patient: patient._id,
            appointment: appointment._id,
            appointment_date: faker.date.anytime(),
            amount: parseFloat(faker.finance.amount()),
            payment_status: faker.word.adjective()
        });
    }

    try {
        await Billing.insertMany(billings);
        console.log(`${num} billing seeded successfully!`);
    } catch (error) {
        console.error('Error seeding billing:', error);
    }
};

module.exports = seedBilling;