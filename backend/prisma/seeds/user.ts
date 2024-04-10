import db from "../../src/database/db.config"

const getAdminUser = async () => {
    const users = await db.user.findMany();
    console.log(users);
}
const deleteUser = async () => {
    await db.user.delete({
        where: {
            id:"clutn9d7m00014bjsdu6xcx56"
        }
    })
    
}
// deleteUser()
getAdminUser()