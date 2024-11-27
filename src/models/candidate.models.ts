import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../plugins/sequelize";

export class CandidateModel extends Model {}

CandidateModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidate_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    candidate_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    candidate_job_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidate_status: {
      type: DataTypes.ENUM,
      values: ["Active", "Looking", "Inactive", "Employed", "Freelance"],
      defaultValue: "Active",
    },
    candidate_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidate_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidate_state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidate_country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidate_zip_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    candidate_nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candiate_dateofBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    candidate_militery_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidate_wage_expectations: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    candidate_ethinicity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidate_gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hourly_rate: {
      type: DataTypes.FLOAT, // Candidate's expected hourly rate
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING, // Candidate's phone number
      allowNull: true,
    },
    workplace: {
      type: DataTypes.STRING, // Workplace type (e.g., "Onsite", "Remote")
      allowNull: true,
    },
    work_type: {
      type: DataTypes.STRING, // Work type (e.g., "Full Time", "Part Time")
      allowNull: true,
    },
    resume_link: {
      type: DataTypes.JSON, // Use JSON to store array-like data
      allowNull: true,
    },
    overall_experience: {
      type: DataTypes.INTEGER, // Total years of experience
      defaultValue: 0, // Default to 0 if not provided
    },
    pay_rate: {
      type: DataTypes.FLOAT, // Pay rate (e.g., USD per hour)
      allowNull: true,
    },
    shift_preference: {
      type: DataTypes.STRING, // Preferred shift (e.g., "02:00 PM - 10:00 PM EST")
      allowNull: true,
    },
    candidate_summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    work_experience: {
      type: DataTypes.JSON, //  (title, employer, dates, etc.)
      allowNull: true,
    },
    education_details: {
      type: DataTypes.JSON, //  (level, university, degree, etc.)
      allowNull: true,
    },
    certification_details: {
      type: DataTypes.JSON, //(name, organization, dates, etc.)
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "candidates",
  }
);

