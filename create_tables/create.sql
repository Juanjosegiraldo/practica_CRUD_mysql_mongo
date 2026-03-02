CREATE DATABASE IF NOT EXISTS saludplusplus;

use saludplusplus;

CREATE TABLE IF NOT EXISTS patients(
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(50),
    address VARCHAR(50)
); 

CREATE TABLE IF NOT EXISTS doctors(
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    specialy VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS insurances(
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    coverage_percentage DECIMAL(5,2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS medications(
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    preescribed_medication VARCHAR(50),
    medication_dosage VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS appointments(
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    appointment_id VARCHAR(20) NOT NULL UNIQUE,
    appointment_date DATE NOT NULL,
    patient_id INT(11) NOT NULL,
    doctor_id INT(11) NOT NULL,
    insurance_id INT(11),
    medication_id INT(11),
    treatment_code VARCHAR(50),
    treatment_description VARCHAR(200),
    treatment_cost DECIMAL(10,2) DEFAULT 0.00,
    amount_paid DECIMAL(10,2) DEFAULT 0.00,

    FOREIGN KEY (patient_id)
    REFERENCES patients(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

    FOREIGN KEY (doctor_id)
    REFERENCES doctors(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

    FOREIGN KEY (insurance_id)
    REFERENCES insurances(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,

    FOREIGN KEY (medication_id)
    REFERENCES medications(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
); 