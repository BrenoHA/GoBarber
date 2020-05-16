module.exports = {
  up: (queryInterface, Sequelize) => {
    // (nome da tabela, nome da coluna q vai ser criada)
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
