module.exports = async function (context, req) {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const product = a * b;

  context.res = {
    body: product,
  };
};
