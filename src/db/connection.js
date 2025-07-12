// This file is deprecated - using Sequelize instead
// Keeping this file for backward compatibility but redirecting to Sequelize

const { sequelize } = require('../models');

// For backward compatibility with code that expects the pg Pool interface
const mockPool = {
  query: async (text, params) => {
    try {
      // Execute raw query using Sequelize
      const [results] = await sequelize.query(text, {
        replacements: params,
        raw: true
      });
      return { rows: results };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  },
  // Add other Pool methods as needed for compatibility
  on: (event, callback) => {
    // No-op for compatibility
    return;
  }
};

module.exports = mockPool;

// Export sequelize instance for direct access if needed
module.exports.sequelize = sequelize;
