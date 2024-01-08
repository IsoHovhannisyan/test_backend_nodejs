const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


/**
 * @route POST api/user/login
 * @desc Логин
 * @access Public
 */

const all = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
  
      res.status(200).json(users);
    } catch {
      res.status(400).json({ message: "Failed to receive" });
    }
  };


/**
 * @route POST api/user/add
 * @desc Регистрация
 * @access Public
 */

const add = async (req, res) => {
    const data = req.body;

    if (!data.name || !data.surname || !data.phone || !data.email || !data.point) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.create({
        data: {
            ...data,
        },
    });

    res.status(201).json(user.id);
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.user.delete({
            where: {
                id,
            },
        });

        res.status(200).json("OK");
    } catch {
        res.status(500).json({ message: "Failed to delete" });
    }
};

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.user.update({
            where: {
                id,
            },
            data,
        });

        res.status(200).json("OK");
    } catch {
        res.status(500).json({ message: "Failed to edit" });
    }
};

const User = async (req, res) => {
    const id = req.params.id;

    try {
        const User = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(User);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


module.exports = {
    all,
    add,
    remove,
    edit,
    User,
};
