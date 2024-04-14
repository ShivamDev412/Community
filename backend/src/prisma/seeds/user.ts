import db from "../../database/db.config"

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
const getGroups = async () => {
    const groups = await db.group.findMany();
    console.log(groups);
}
// deleteUser()
const deleteAllGroups = async () => {
    await db.event.deleteMany()
    await db.userEvent.deleteMany()
    await db.userGroup.deleteMany()
    await db.group.deleteMany()

    
}

// deleteAllGroups()
// getGroups()
getAdminUser()