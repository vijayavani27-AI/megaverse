/**
 * seed.js - Run once to populate MongoDB with initial data
 * Usage: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Patient = require('./models/Patient');
const Record = require('./models/Record');
const Message = require('./models/Message');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healthsync';

const patients = [
  { patientId: 'PT-1102', name: 'Arun Kumar', age: 54, bed: 'ICU-01', blood: 'O+', status: 'Critical', diagnosis: 'Cardiac Arrhythmia', doctor: 'Dr. Vani', color: '#ee5d50', vitals: { hr: 141, spo2: 88, sys: 150, dia: 95, temp: 100.4, rr: 22 } },
  { patientId: 'PT-1105', name: 'Sowmya R', age: 32, bed: 'ICU-02', blood: 'A+', status: 'Stable', diagnosis: 'Post-Op Recovery', doctor: 'Dr. Sundar', color: '#05cd99', vitals: { hr: 72, spo2: 99, sys: 120, dia: 80, temp: 98.6, rr: 16 } },
  { patientId: 'PT-1121', name: 'Dinesh K', age: 41, bed: 'ICU-03', blood: 'B-', status: 'Observation', diagnosis: 'Hypertensive Crisis', doctor: 'Dr. Vani', color: '#ffb547', vitals: { hr: 95, spo2: 94, sys: 135, dia: 88, temp: 99.2, rr: 18 } },
  { patientId: 'PT-1133', name: 'Meena S', age: 28, bed: 'ICU-04', blood: 'AB+', status: 'Stable', diagnosis: 'Severe Asthma', doctor: 'Dr. Ramesh', color: '#05cd99', vitals: { hr: 78, spo2: 96, sys: 118, dia: 76, temp: 99.0, rr: 20 } },
  { patientId: 'PT-1140', name: 'Rajan P', age: 67, bed: 'ICU-05', blood: 'O-', status: 'Critical', diagnosis: 'Stroke (Hemorrhagic)', doctor: 'Dr. Vani', color: '#ee5d50', vitals: { hr: 55, spo2: 85, sys: 190, dia: 110, temp: 101.2, rr: 25 } },
];

const records = [
  { patientId: 'PT-1088', name: 'Karthik M', age: 48, admitted: 'Oct 12, 2024', discharged: 'Oct 19, 2024', diagnosis: 'Hypertension', doctor: 'Dr. Ramesh', status: 'Discharged' },
  { patientId: 'PT-1092', name: 'Priya S', age: 35, admitted: 'Nov 05, 2024', discharged: 'Nov 12, 2024', diagnosis: 'Type 2 Diabetes', doctor: 'Dr. Vani', status: 'Discharged' },
  { patientId: 'PT-1099', name: 'Manoj Prabhakar', age: 52, admitted: 'Jan 24, 2025', discharged: 'Feb 02, 2025', diagnosis: 'Cardiac Arrhythmia', doctor: 'Dr. Sundar', status: 'Follow-up' },
  { patientId: 'PT-1102', name: 'Arun Kumar', age: 54, admitted: 'Mar 20, 2025', discharged: '—', diagnosis: 'Acute MI', doctor: 'Dr. Vani', status: 'Admitted' },
  { patientId: 'PT-1105', name: 'Sowmya R', age: 32, admitted: 'Mar 22, 2025', discharged: '—', diagnosis: 'Post-Op Recovery', doctor: 'Dr. Sundar', status: 'Admitted' },
  { patientId: 'PT-1121', name: 'Dinesh K', age: 41, admitted: 'Mar 23, 2025', discharged: '—', diagnosis: 'Hypertensive Crisis', doctor: 'Dr. Vani', status: 'Admitted' },
];

const messages = [
  { from: 'Dr. Ramesh', dept: 'Neurology', avatar: 'DR', color: '#4318ff', subject: 'EEG Anomaly — Bed 4', body: 'Hi Vani, can you check bed 4\'s chart? There\'s a sharp spike in the latest EEG scan that might indicate focal seizures.', unread: true },
  { from: 'Nurse Geetha', dept: 'Ward 3', avatar: 'NG', color: '#05cd99', subject: 'ICU-02 Vitals Stable', body: 'Patient Sowmya in ICU-02 is stable. Vitals have normalized after morning meds. SpO2 back to 99%.', unread: true },
  { from: 'Lab — Hematology', dept: 'Pathology', avatar: 'LH', color: '#ffb547', subject: 'CBC Report Ready — PT-1099', body: 'Complete blood count for Manoj Prabhakar (PT-1099) is ready. Platelet count slightly low at 95k. Please review.', unread: false },
  { from: 'Admin Office', dept: 'Administration', avatar: 'AO', color: '#a3aed1', subject: 'NABH Audit — March 28', body: 'Reminder: The NABH re-accreditation audit is scheduled for March 28. All electronic records must be up to date.', unread: false },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB:', MONGO_URI);

    // Clear existing data
    await Patient.deleteMany({});
    await Record.deleteMany({});
    await Message.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert fresh seed data
    await Patient.insertMany(patients);
    await Record.insertMany(records);
    await Message.insertMany(messages);

    console.log('🌱 Seed complete!');
    console.log(`   ✔ ${patients.length} Patients inserted`);
    console.log(`   ✔ ${records.length} Records inserted`);
    console.log(`   ✔ ${messages.length} Messages inserted`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
