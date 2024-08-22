const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll()
  .then(res.status(201).json({
    message: 'Sucesso'}), 
    dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,      
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
    .then(res.status(201).json({
      message: 'Criado com sucesso'}), 
      dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.status(201).json({
      message: 'Deletado com sucesso'}), 
      dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'Nenhum comentário encontrado' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;