'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        username: 'admin',
        email: 'admin@example.com',
        password: '$2a$10$rQnpe.2rvpTaAYP.OCQZ8.RPIpwh2dAr1HgABGgBmMjLf7yRwj2Aq', // hashed 'password123'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: '$2a$10$rQnpe.2rvpTaAYP.OCQZ8.RPIpwh2dAr1HgABGgBmMjLf7yRwj2Aq', // hashed 'password123'
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
