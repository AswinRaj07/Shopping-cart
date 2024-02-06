import express from 'express'
import { Sequelize,DataTypes } from 'sequelize';
import sequelize from '../dbconnection'


const Product = sequelize.define("products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // count:{
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    // }
  });
  export default Product