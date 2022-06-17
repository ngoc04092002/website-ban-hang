module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Orders', {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount:{
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        namePerson:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        size:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalMoney:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
    //xóa mềm
    // ,{
    //     paranoid: true
    // }
    );

    return Orders;
};