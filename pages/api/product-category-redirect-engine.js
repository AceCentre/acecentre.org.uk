import { inspect } from "util";

export default (req, res) => {
  console.log(inspect(req));

  res.status(200).json({ name: "John Doe" });
};
