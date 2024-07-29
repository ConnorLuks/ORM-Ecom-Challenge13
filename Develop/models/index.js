const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const Category = require('./Category.js')(sequelize, Sequelize.DataTypes);
const Product = require('./Product.js')(sequelize, Sequelize.DataTypes);
const Tag = require('./Tag.js')(sequelize, Sequelize.DataTypes);
const ProductTag = require('./ProductTag.js')(sequelize, Sequelize.DataTypes);

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' });

module.exports = { Category, Product, Tag, ProductTag, sequelize };