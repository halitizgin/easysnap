module.exports = {
    addSnap: async (parent, { data: { text, userId } }, { Snap, User }) => {
        const user = await User.findById(userId);

        if (!user){
            throw new Error('User does not exists!');
        }

        return await new Snap({
            text,
            userId
        }).save();
    }
};