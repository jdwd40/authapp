'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add firstName and lastName columns
    await queryInterface.addColumn('users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: true, // Making nullable for existing records
    });
    
    await queryInterface.addColumn('users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: true, // Making nullable for existing records
    });
    
    // Migrate data from name to firstName (if name exists)
    await queryInterface.sequelize.query(`
      UPDATE users 
      SET "firstName" = "name"
      WHERE "name" IS NOT NULL
    `);
    
    // Add isActive column
    await queryInterface.addColumn('users', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    
    // Add role column with ENUM type
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('user', 'admin'),
      defaultValue: 'user',
    });
    
    // Add lastLoginAt column
    await queryInterface.addColumn('users', 'lastLoginAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    
    // After migration is complete, we can make firstName and lastName required
    // for new records, but we'll keep them nullable for now to avoid issues
    // with existing records
  },

  async down(queryInterface, Sequelize) {
    // Remove the added columns
    await queryInterface.removeColumn('users', 'firstName');
    await queryInterface.removeColumn('users', 'lastName');
    await queryInterface.removeColumn('users', 'isActive');
    await queryInterface.removeColumn('users', 'lastLoginAt');
    
    // Remove the ENUM type
    await queryInterface.removeColumn('users', 'role');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
  }
};
