module.exports = fn => {
  return (req, res, next) => {
    // fn(req, res, next) means caaling the function from his argument
    fn(req, res, next).catch(err => next(err));
  };
};
