'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(
      "Nilais",
      'dosen_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Dosens'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    )
     await queryInterface.addColumn(
      "Nilais",
      'mahasiswa_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Mahasiswas'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    )
     await queryInterface.addColumn(
      "Nilais",
      'matkul_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Mata_kuliahs'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable('Nilais');
  }
};
