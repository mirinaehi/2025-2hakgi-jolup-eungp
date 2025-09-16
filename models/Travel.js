const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Travel = sequelize.define('Travel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // ✅ 작성자(계정) 저장
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'travelList', // 실제 테이블 이름
  timestamps: false,       // createdAt, updatedAt 컬럼 사용 안 함
});

// ✅ 작성자 관계 (Travel N:1 User)
Travel.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = Travel;
