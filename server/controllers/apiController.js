module.exports={
    getCurrentUser: (req,res)=>{
        const db = req.app.get('db')
        db.get_user([req.session.user.user_id])
        .then((user)=>{res.status(200).send(user)})     
        .catch(res.status(500))           
    },
    getUserLectures:(req,res)=>{
        const db = req.app.get('db')
        console.log(req.session.user.user_id)
        db.get_user_lectures([req.session.user.user_id])
        .then((lectures)=>{res.status(200).send(lectures)})
        .catch(res.status(500))
    }
}