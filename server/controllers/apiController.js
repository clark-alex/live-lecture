module.exports={
    getCurrentUser: (req,res)=>{
        const db = req.app.get('db')
        db.get_user([req.session.user.user_id])
        .then((user)=>{res.status(200).send(user)})                
    }
}