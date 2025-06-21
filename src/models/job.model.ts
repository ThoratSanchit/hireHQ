import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../plugins/sequelize'; 


class Job extends Model {}

Job.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        job_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location_city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location_state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location_country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        salary_min: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        salary_max: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        salary_currency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        salary_frequency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nps_score: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        job_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        job_reference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        external_job_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        skills_required: {
            type: DataTypes.JSON, // Changed from ARRAY(DataTypes.STRING) to JSON
            allowNull: true,
        },
        // profile_match_percentage: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        job_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        recruiter_details: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        education_requirement: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        workplace_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        experience_min_years: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        experience_max_years: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        number_of_openings: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        experience_level: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        benefits: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        posted_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_posted: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        posted_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Job',
        tableName: 'jobs',
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

export default Job;
