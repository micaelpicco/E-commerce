

const users = [
    {
        name: "Lucas Macchi",
        username:"lmacchi",
        mail: "lucasmacchi25@gmail.com",
        password: "$2a$08$j8/eAoOFOyPatGDWm6P/b.kYgAKXC8UaXAqK0G84myeHXm4Pm13Ti",// password:"123456"
        phone: "111111111111",
        storeName: "Altas zapatillas",
        banner: "https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?cs=srgb&dl=pexels-william-matt-3768005.jpg&fm=jpg",
        location: "Corrientes",
        profilePicture: "https://t1.pb.ltmcdn.com/es/posts/2/4/2/que_piensa_una_persona_cuando_dejas_de_buscarla_5242_orig.jpg",
        verified:true,
    },
    {
        name: "Marcelo Rodriguez",
        username:"mrodriguez",
        mail: "marcelito@hotmail.com",
        password: "$2a$08$qucaVmg1AfwdUSKMVt/s9eMY7/Oi.LJnU6VUaZQe.YSKyZDmA3zW.",//password:"8524"
        phone: "111111111111",
        storeName: "Buzos baratos",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "Corrientes",
        profilePicture: "https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg",
        verified:true,
    },
    {
        name: "Roberto Hernando",
        username:"rhernando",
        mail: "golo@hotmail.com",
        password: "$2a$08$GIOAnXCnDhsjTaITR05u/e.IuHL99GEnPTy1lqpLkkgz.bhtjZjFm",// password:"8521"
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "torrejas",
        profilePicture: "https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg",
        verified:true,
    },
    {
        name: "Franco Milazzo",
        username:"fmilazzo",
        mail: "francoMil@gmail.com",
        password: "$2a$08$w3lWaaat2TyQSgbvoAuBye4zR.rnn78y2FlO1tnRnZgo4fOqLbczm", // password : "8521"
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "Cordoba",
        profilePicture: "https://static.wikia.nocookie.net/lossimuladores/images/3/3f/Franco_Milazzo.png/revision/latest/scale-to-width-down/250?cb=20150623183355&path-prefix=es",
        verified:true,
    },
    {
        name: "Martina Gonzales",
        username:"mgonzales",
        mail: "martina_43@gmail.com",
        password: "$2a$08$.9NTiO04sBHHvUcS0nirYuJJqWnB2W9YnNn5s2rqYOXg9F2tB05Y.",// password:"8521"
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "Cordoba",
        profilePicture: "https://lamenteesmaravillosa.com/wp-content/uploads/2022/03/mujer-ojos-cerrados-mano-corazon-768x512.jpg",
        verified:true,
    },
    {
        name: "Lucia Buchetti",
        username:"lbuchetti",
        mail: "luci_arg@gmail.com",
        password: "$2a$08$Ozd0Md/aTtl4zVBs/V/8yu0wRtBYcVu2Se6jVSGAgeoACWEfZJ0Ke", // password : 8521
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "Mendoza",
        profilePicture: "https://www.caritas.org.mx/wp-content/uploads/2019/02/cualidades-persona-humanitaria.jpg",
        verified:true,
    },
    {
        name: "Mario Davis",
        username:"mdavis",
        mail: "mario_el10@gmail.com",
        password: "$2a$08$buAjncij/WavoYrnV5.kbekHYlEm9iIsal9m4G7ZogMTig3kdRQfu",// password:"8521"
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "Entre Rios",
        profilePicture: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2022/06/billy-kametz-2728819.jpg?itok=dLNsBLtJ",
        verified:true,
    },
    {
        name: "Maximo Cosseti",
        username:"mcosseti",
        mail: "maximo_coset@gmail.com",
        password: "$2a$08$L1ybjTFoKfG3eOF9v2b3.Oyn8bHMs8Ob97YW3ox3Ct84ODxJXBDpu",//password:"8521"
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "CABA",
        profilePicture: "https://cloudfront-us-east-1.images.arcpublishing.com/radiomitre/Y2B2DJZVBFAFRB4NDORUCUXDUM.jpg",
        verified:true,
    },
    {
        name: "Mario Santos",
        username:"msantos",
        mail: "marioSantito@gmail.com",
        password: "$2a$08$yq1jgaokXrPLdgWR.jWlHuFOM4DRsGMyw2ncntUqU3RwHn95KgeOq", // password:"8521"
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "CABA",
        profilePicture: "https://static.wikia.nocookie.net/lossimuladores/images/3/3d/Mario_Santos.png/revision/latest/scale-to-width-down/250?cb=20150614023808&path-prefix=es",
        verified:true,
    },
    {
        name: "Pablo Lamponne",
        username:"plampone",
        mail: "LamponeATiempo@gmail.com",
        password: "$2a$08$BX8OhJDnizlV/RX4gDHDfef4Od4TzgI4SijgYEuIWcW4.JcfFPQLK",//password:"8521"
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "CABA",
        profilePicture: "https://static.wikia.nocookie.net/lossimuladores/images/b/b8/54216_fiobe-pobtada.jpg/revision/latest/scale-to-width-down/250?cb=20170709032448&path-prefix=es",
        verified:true,
    },
    {
        name: "Gabriel David Medina",
        username:"gmedina",
        mail: "GabrielMedi@gmail.com",
        password: "$2a$08$f/3k5KtoxTT4.Cz712tRf.s6i.8Ycn.tg5lTZEfT/GB.mHiWvJAZO",// password:"8521"
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "CABA",
        profilePicture: "https://static.wikia.nocookie.net/lossimuladores/images/c/ce/Tarjeta_de_Navidad_26.png/revision/latest/scale-to-width-down/180?cb=20160318014107&path-prefix=es",
        verified:true,
    },
    {
        name: "Facundo Ancarani",
        username: "fanca",
        mail: "facundoAnca@gmail.com",
        password: "$2a$08$f/3k5KtoxTT4.Cz712tRf.s6i.8Ycn.tg5lTZEfT/GB.mHiWvJAZO",// password:"8521"
        phone: "111111111111",
        banner: "https://st2.depositphotos.com/1006832/6017/i/950/depositphotos_60178113-stock-photo-clothes-shop-interior.jpg",
        location: "CABA",
        verified:true,
    }
]



module.exports = users