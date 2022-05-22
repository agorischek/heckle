module.exports = async function (context, req) {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const difference = a + b;

  context.res = {
    body: difference,
  };
};
