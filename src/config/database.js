module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber2020',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
