import express from 'express'
import { Sequelize,DataTypes,Model } from "sequelize";
import sequelize from "../dbconnection"
import cors from 'cors'

const CartProduct:any = sequelize.define("cartsnew1", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

  export default CartProduct