let userDummyDataArray = [
    {
        id:'3213213-efgfd-435245',
        name:'Mayank Dobriyal',
        phone:'7017935899',
        otp:1234
    },
    {
        id:'132te13-ef65gfd-gffgfgs',
        name:'Neeraj Payal',
        phone:'9876543210',
        otp:1234
    },
    {
        id:'errsae92-5435345-gfgfg',
        name:'Manmohan',
        phone:'9123456780',
        otp:1234
    },
    {
        id:'45486yhgf-gfhgfudf-ykhjgj',
        name:'Nirmal Gaur',
        phone:'8123456780',
        otp:1234
    },
    {
        id:'435324-rtthyfgh-ljkhersf',
        name:'Amit Negi',
        phone:'7123456780',
        otp:1234
    }
]
export const actionToLoginUserAndSendOtpApiCall = (body) => {
    const {phone} = body;
    return new Promise(function(resolve, reject) {
        let found = null;
        let userData = {};
        userDummyDataArray?.forEach((users,key)=>{
            if(users.phone === phone){
                found = key;
            }
        })
        if(found !== null){
            userData = userDummyDataArray[found];
        }
        resolve(userData);

        // const query = loginUserQuery(password);
        // pool.query(query, (error, results) => {
        //     if (error) {
        //         reject(error)
        //     }
        //     resolve(results);
        // })
    })
}

export const actionToVerifyLoginUserOtpApiCall = (body) => {
    const {phone,otp} = body;
    return new Promise(function(resolve, reject) {
        let found = null;
        let userData = {};
        userDummyDataArray?.forEach((users,key)=>{
            if(users.phone === phone && otp === users?.otp){
                found = key;
            }
        })
        if(found !== null){
            userData = userDummyDataArray[found];
        }
        resolve(userData);
    })
}