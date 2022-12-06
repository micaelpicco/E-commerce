const { product, Op, variant } = require("../../DataBase/db");
//const paginated = require("./paginado");

const getFilteredProducts = async (
  name,
  size,
  price,
  demographic,
  color,
  page,
  sortBy,
  orderBy
) => {
  if (size && price && demographic && name && color) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
        demographic,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
          size,
        },
      },
    });
    return (data = await filteredProducts);

    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
  } else if (size && price && demographic && name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,

        demographic,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && price && demographic && color) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && price && color && name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        price:{
          [Op.between]:[0,price],
        },
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && color && demographic && name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,

        demographic,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (color && price && demographic && name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,

        demographic,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);

    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
  } else if (size && price && demographic) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && price && name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && price && color) {
    let filteredProducts = await product.findAll({
      where: {
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && demographic && name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,

        demographic,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && demographic && color) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && name && color) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
          size,
        },
      },
    });
    return (data = await filteredProducts);

    //////////////////////////////////////////////
  } else if (color && price && demographic) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (color && price && name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (color && demographic && name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,

        demographic,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);

    /////////////////////////////////////////
  } else if (demographic && price && name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
        demographic,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
      },
    });
    return (data = await filteredProducts);
  } else if (demographic && price && color) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (demographic && name && color) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,

        demographic,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);

    /////////////////////////////////////////
  } else if (name && price && demographic) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
        demographic,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
      },
    });
    return (data = await filteredProducts);
  } else if (name && price && color) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (name && demographic && color) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,

        demographic,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);

    ////////////////////////////////////////
  } else if (price && demographic && color) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);

    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
  } else if (name && price) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
      },
    });
    return (data = await filteredProducts);
  } else if (name && size) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (name && demographic) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,

        demographic,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
      },
    });
    return (data = await filteredProducts);
  } else if (name && color) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && demographic) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && color) {
    let filteredProducts = await product.findAll({
      where: {
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (size && price) {
    let filteredProducts = await product.findAll({
      where: { 
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
       },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (price && demographic) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
      },
    });
    return (data = await filteredProducts);
  } else if (price && color) {
    let filteredProducts = await product.findAll({
      where: {
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (color && demographic) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);

    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
  } else if (size) {
    let filteredProducts = await product.findAll({
      where: {
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          size,
        },
      },
    });
    return (data = await filteredProducts);
  } else if (demographic) {
    let filteredProducts = await product.findAll({
      where: {
        demographic,
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
      },
    });
    return (data = await filteredProducts);
  } else if (price) {
    let filteredProducts = await product.findAll({
      where: {
        isActive: true,
        price:{
          [Op.between]:[0,price],
        }
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
      },
    });
    return (filteredProducts);
  } else if (name) {
    let filteredProducts = await product.findAll({
      where: {
        name: {
          [Op.like]: name.toLowerCase() + "%",
        },

        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
      },
    });
    return (data = await filteredProducts);
  } else if (color) {
    let filteredProducts = await product.findAll({
      where: {
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
        where: {
          color,
        },
      },
    });
    return (data = await filteredProducts);

    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
  } else {
    let filteredProducts = await product.findAll({
      where: {
        isActive: true,
      },
      limit: 10,
      offset: page,
      order: [[sortBy, orderBy]],
      include: {
        model: variant,
      },
    });
    return (data = await filteredProducts);
  }
};

module.exports = getFilteredProducts;
